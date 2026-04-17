import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { items, totalAmount } = req.body;
  if (!items?.length) return res.status(400).json({ message: "Order items required" });

  const order = await Order.create({
    user: req.user._id,
    items,
    totalAmount
  });
  res.status(201).json(order);
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

export const getAllOrders = async (_req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};
