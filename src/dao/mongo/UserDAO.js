import { UserModel } from '../../models/User.js';

export class UserDAO {
  async create(userData) {
    return UserModel.create(userData);
  }

  async getByEmail(email) {
    return UserModel.findOne({ email: email.toLowerCase() });
  }

  async getById(id) {
    return UserModel.findById(id);
  }

  async updateById(id, update, options = {}) {
    return UserModel.findByIdAndUpdate(id, update, { new: true, ...options });
  }

  async getByResetTokenHash(resetPasswordTokenHash) {
    return UserModel.findOne({ resetPasswordTokenHash });
  }
}
