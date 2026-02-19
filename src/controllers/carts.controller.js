import {
  createCartForUser,
  getCartById,
  addBenefitToCart,
  removeBenefitFromCart
} from '../services/carts.service.js';
import { purchaseCart } from '../services/purchase.service.js';

export const createCartController = async (req, res) => {
  const payload = await createCartForUser(req.user._id);
  return res.status(201).json({ status: 'success', payload });
};

export const getCartByIdController = async (req, res) => {
  const payload = await getCartById(req.params.cid);
  return res.status(200).json({ status: 'success', payload });
};

export const addBenefitToCartController = async (req, res) => {
  const payload = await addBenefitToCart({
    cid: req.params.cid,
    bid: req.params.bid,
    user: req.user
  });
  return res.status(200).json({ status: 'success', payload });
};

export const removeBenefitFromCartController = async (req, res) => {
  const payload = await removeBenefitFromCart({
    cid: req.params.cid,
    bid: req.params.bid,
    user: req.user
  });
  return res.status(200).json({ status: 'success', payload });
};

export const purchaseCartController = async (req, res) => {
  const payload = await purchaseCart({ cid: req.params.cid, user: req.user });
  return res.status(200).json({ status: 'success', payload });
};
