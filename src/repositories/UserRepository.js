export class UserRepository {
  constructor(userDAO) {
    this.userDAO = userDAO;
  }

  create(userData) {
    return this.userDAO.create(userData);
  }

  getByEmail(email) {
    return this.userDAO.getByEmail(email);
  }

  getById(id) {
    return this.userDAO.getById(id);
  }

  updateById(id, update, options) {
    return this.userDAO.updateById(id, update, options);
  }

  getByResetTokenHash(resetPasswordTokenHash) {
    return this.userDAO.getByResetTokenHash(resetPasswordTokenHash);
  }
}
