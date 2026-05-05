import MenuItem from "../Models/MenuItem.js";

const normalizeMenuPayload = (payload = {}) => {
  const normalized = { ...payload };

  if (Object.prototype.hasOwnProperty.call(normalized, "unit")) {
    const rawUnit = normalized.unit;
    if (
      rawUnit === "" ||
      rawUnit === "none" ||
      rawUnit === null ||
      rawUnit === undefined
    ) {
      normalized.unit = undefined;
    }
  }

  return normalized;
};

export const getAll = async (req, res) => {
  try {
    const items = await MenuItem.find()
      .populate("category", "name")
      .populate("unit", "name abbreviation")
      .sort({ name: 1 });
    res.json(items);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id)
      .populate("category", "name")
      .populate("unit", "name abbreviation");
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    res.json(item);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const create = async (req, res) => {
  try {
    const body = normalizeMenuPayload(req.body);
    if (body.unit === undefined) delete body.unit;
    const item = await MenuItem.create(body);
    res.status(201).json(item);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

export const update = async (req, res) => {
  try {
    const body = normalizeMenuPayload(req.body);
    const updateDoc = body.unit === undefined ? { ...body, $unset: { unit: 1 } } : body;
    if (body.unit === undefined) delete updateDoc.unit;

    const item = await MenuItem.findByIdAndUpdate(req.params.id, updateDoc, { new: true });
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    res.json(item);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

export const remove = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
