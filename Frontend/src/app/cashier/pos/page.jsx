import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Package, Truck, Users, DollarSign, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function POSPage() {
  const navigate = useNavigate();
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showOpenSessionDialog, setShowOpenSessionDialog] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [transferToTable, setTransferToTable] = useState("");
  const [openingCash, setOpeningCash] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: authSession, isPending: isAuthPending } = authClient.useSession();
  const cashierId = authSession?.user?.id;
  
  // Redirect if no auth session after loading
  useEffect(() => {
    if (!isAuthPending && !authSession?.user?.id) {
      navigate("/login");
    }
  }, [isAuthPending, authSession, navigate]);
  
  const activeCashierSession = useQuery(api.cashierSessions.getActive, { cashierId: cashierId || "", refreshKey });
  const openSession = useMutation(api.cashierSessions.open);
  const transferTable = useMutation(api.orders.transferTable);

  const roomsData = useQuery(api.rooms.getAll, { refreshKey }) || [];
  const openOrders = useQuery(api.orders.listOpen, { refreshKey }) || [];

  // Flatten all tables across rooms
  const allTables = useMemo(() =>
    roomsData.flatMap((room) =>
      room.tables.map((t) => ({ ...t, roomName: room.name, roomId: room._id }))
    ), [roomsData]);

  const runningTables = useMemo(() =>
    allTables
      .filter((t) => t.status === "occupied")
      .map((t) => ({
        ...t,
          orderTotal: openOrders.find((o) => o.tableId === t._id)?.totalAmount || 0,
        })), [allTables, openOrders]);

  const availableTables = useMemo(() =>
    allTables.filter((t) => t.status === "open"), [allTables]);

  const todayRevenue = openOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const handleTableClick = (tableId, status, roomId) => {
    if (!activeCashierSession) {
      toast.error("Open cashier session first.");
      setShowOpenSessionDialog(true);
      return;
    }
    if (status === "open") navigate(`/cashier/pos/table/${tableId}?roomId=${roomId}&type=new`);
    else navigate(`/cashier/pos/table/${tableId}?roomId=${roomId}&type=existing`);
  };

  const handleTransfer = async () => {
    if (!activeCashierSession) {
      toast.error("Open cashier session first.");
      setShowOpenSessionDialog(true);
      return;
    }
    if (!selectedTable || !transferToTable) return toast.error("Please select both tables");
    try {
      const updated = await transferTable({ fromTableId: selectedTable, toTableId: transferToTable });
      if (!updated) {
        toast.error("Unable to transfer table");
        return;
      }
      toast.success("Table transferred successfully");
      setShowTransferDialog(false);
      setSelectedTable(null);
      setTransferToTable("");
      setRefreshKey((k) => k + 1);
    } catch (error) {
      toast.error("Failed to transfer table");
    }
  };

  const handleOpenSession = async () => {
    // Check if auth is still loading
    if (isAuthPending) {
      toast.error("Authenticating... Please wait");
      return;
    }
    
    // Check if cashier ID is available
    if (!cashierId) {
      toast.error("Authentication failed. Please login again.");
      navigate("/login");
      return;
    }
    
    const openingCashNumber = Number(openingCash);
    if (!Number.isFinite(openingCashNumber) || openingCashNumber < 0) {
      toast.error("Enter valid opening cash amount");
      return;
    }

    try {
      await openSession({ cashierId, openingCash: openingCashNumber });
      toast.success("Cashier session opened");
      setShowOpenSessionDialog(false);
      setOpeningCash("");
      setRefreshKey((k) => k + 1);
    } catch (error) {
      toast.error("Failed to open cashier session");
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden p-6">
      <div className="flex-1 flex gap-6 overflow-hidden">

        {/* Left — Tables */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">

          {/* Running Tables */}
          <section className="bg-card border border-border rounded-2xl p-5 flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold">Running Tables</h2>
              <span className="text-sm text-muted-foreground">({runningTables.length})</span>
            </div>
            <div className="flex-1 overflow-auto">
              {runningTables.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground"><p>No active orders</p></div>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {runningTables.map((table) => (
                    <button key={table._id} onClick={() => handleTableClick(table._id, "occupied", table.roomId)}
                      className="bg-secondary/10 border-2 border-secondary rounded-xl p-4 hover:bg-secondary/20 transition-all text-left">
                      <p className="text-xl font-bold">{table.tableNumber}</p>
                      <p className="text-xs text-muted-foreground mt-1">{table.roomName}</p>
                      <p className="text-sm font-semibold text-secondary mt-2">Rs. {table.orderTotal.toLocaleString()}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Available Tables */}
          <section className="bg-card border border-border rounded-2xl p-5 flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold">Available Tables</h2>
              <span className="text-sm text-muted-foreground">({availableTables.length})</span>
            </div>
            <div className="flex-1 overflow-auto">
              {availableTables.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground"><p>No available tables</p></div>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {availableTables.map((table) => (
                    <button key={table._id} onClick={() => handleTableClick(table._id, "open", table.roomId)}
                      className="bg-background border-2 border-border rounded-xl p-4 hover:border-primary hover:bg-primary/5 transition-all text-left">
                      <p className="text-xl font-bold">{table.tableNumber}</p>
                      <p className="text-xs text-muted-foreground mt-1">{table.roomName}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right — Summary & Actions */}
        <div className="w-80 flex flex-col gap-6">

          {/* Today's Summary */}
          <section className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-4">Today's Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Open Orders</p>
                  <p className="text-xl font-bold">{openOrders.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Open Revenue</p>
                  <p className="text-xl font-bold">Rs. {todayRevenue.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Tables</p>
                  <p className="text-xl font-bold">{runningTables.length}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Transfer Table */}
          <section className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {activeCashierSession ? (
                <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                  Session Active
                </div>
              ) : (
                <Button variant="default" className="w-full justify-start gap-3 h-12" onClick={() => setShowOpenSessionDialog(true)}>
                  <span>Open Cashier Session</span>
                </Button>
              )}
              <Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={() => setShowTransferDialog(true)}>
                <ArrowRightLeft className="w-5 h-5" />
                <span>Transfer Table</span>
              </Button>
            </div>
          </section>

          {/* Delivery / Takeaway */}
          <section className="bg-card border border-border rounded-2xl p-5 flex-1">
            <Tabs defaultValue="delivery" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="delivery">Home Delivery</TabsTrigger>
                <TabsTrigger value="takeaway">Take Away</TabsTrigger>
              </TabsList>
              <TabsContent value="delivery">
                <Button variant="outline" className="w-full h-16 justify-start gap-3" onClick={() => {
                  if (!activeCashierSession) {
                    toast.error("Open cashier session first.");
                    setShowOpenSessionDialog(true);
                    return;
                  }
                  navigate("/cashier/pos/table/delivery?type=new");
                }}>
                  <Truck className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold">New Delivery</p>
                    <p className="text-xs text-muted-foreground">Create new delivery order</p>
                  </div>
                </Button>
              </TabsContent>
              <TabsContent value="takeaway">
                <Button variant="outline" className="w-full h-16 justify-start gap-3" onClick={() => {
                  if (!activeCashierSession) {
                    toast.error("Open cashier session first.");
                    setShowOpenSessionDialog(true);
                    return;
                  }
                  navigate("/cashier/pos/table/takeaway?type=new");
                }}>
                  <Package className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold">New Takeaway</p>
                    <p className="text-xs text-muted-foreground">Create new takeaway order</p>
                  </div>
                </Button>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>

      {/* Transfer Dialog */}
      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Table</DialogTitle>
            <DialogDescription>Move an order from one table to another.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>From Table</Label>
              <Select value={selectedTable || ""} onValueChange={setSelectedTable}>
                <SelectTrigger><SelectValue placeholder="Select occupied table" /></SelectTrigger>
                <SelectContent>
                  {runningTables.map((t) => <SelectItem key={t._id} value={t._id}>{t.roomName} - {t.tableNumber}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center"><ArrowRightLeft className="w-5 h-5 text-muted-foreground" /></div>
            <div className="space-y-2">
              <Label>To Table</Label>
              <Select value={transferToTable} onValueChange={setTransferToTable}>
                <SelectTrigger><SelectValue placeholder="Select available table" /></SelectTrigger>
                <SelectContent>
                  {availableTables.map((t) => <SelectItem key={t._id} value={t._id}>{t.roomName} - {t.tableNumber}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransferDialog(false)}>Cancel</Button>
            <Button onClick={handleTransfer} disabled={!selectedTable || !transferToTable}>Transfer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Open Session Dialog */}
      <Dialog open={showOpenSessionDialog} onOpenChange={setShowOpenSessionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Open Cashier Session</DialogTitle>
            <DialogDescription>Start your shift by entering opening cash.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label htmlFor="opening-cash">Opening Cash</Label>
            <Input
              id="opening-cash"
              type="number"
              min="0"
              value={openingCash}
              onChange={(e) => setOpeningCash(e.target.value)}
              placeholder="Enter opening cash"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOpenSessionDialog(false)}>Cancel</Button>
            <Button onClick={handleOpenSession}>Open Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
