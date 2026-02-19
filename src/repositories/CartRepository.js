export class CartRepository {
  constructor(cartDAO) {
    this.cartDAO = cartDAO;
  }

  create(cartData) {
    return this.cartDAO.create(cartData);
  }

  getById(id) {
    return this.cartDAO.getById(id);
  }

  getByIdPopulated(id) {
    return this.cartDAO.getByIdPopulated(id);
  }

  getByUserId(userId) {
    return this.cartDAO.getByUserId(userId);
  }

  updateById(id, update) {
    return this.cartDAO.updateById(id, update);
  }
}
