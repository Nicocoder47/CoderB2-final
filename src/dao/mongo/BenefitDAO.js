import { BenefitModel } from '../../models/Benefit.js';

export class BenefitDAO {
  async getAll(filter = {}) {
    return BenefitModel.find(filter).lean();
  }

  async getById(id) {
    return BenefitModel.findById(id);
  }

  async create(benefitData) {
    return BenefitModel.create(benefitData);
  }

  async updateById(id, update) {
    return BenefitModel.findByIdAndUpdate(id, update, { new: true });
  }

  async deleteById(id) {
    return BenefitModel.findByIdAndDelete(id);
  }

  async decrementStockIfAvailable(id, quantity) {
    return BenefitModel.findOneAndUpdate(
      {
        _id: id,
        stockOrQuota: { $gte: quantity },
        isActive: true
      },
      {
        $inc: { stockOrQuota: -quantity }
      },
      { new: true }
    );
  }
}
