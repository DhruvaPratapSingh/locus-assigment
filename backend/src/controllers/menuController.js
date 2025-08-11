
import MenuItem from "../models/MenuItem.js";

export const getMenu = async (req, res) => {
  const menu = await MenuItem.find();
  res.json(menu);
};

export const createMenuItem = async (req, res) => {
  const item = new MenuItem(req.body);
  await item.save();
  res.json(item);
};
