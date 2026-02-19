import { CartModel } from '../../models/Cart.js';

export class CartDAO {
  async create(cartData) {
    return CartModel.create(cartData);
  }

  async getById(id) {
    return CartModel.findById(id);
  }

  async getByIdPopulated(id) {
    return CartModel.findById(id)
      .populate('user', 'email role')
      .populate('items.benefit');
  }

  async getByUserId(userId) {
    return CartModel.findOne({ user: userId });
  }

  async updateById(id, update) {
    return CartModel.findByIdAndUpdate(id, update, { new: true })
      .populate('user', 'email role')
      .populate('items.benefit');
  }
}
