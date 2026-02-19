export class BenefitRepository {
  constructor(benefitDAO) {
    this.benefitDAO = benefitDAO;
  }

  getAll(filter) {
    return this.benefitDAO.getAll(filter);
  }

  getById(id) {
    return this.benefitDAO.getById(id);
  }

  create(benefitData) {
    return this.benefitDAO.create(benefitData);
  }

  updateById(id, update) {
    return this.benefitDAO.updateById(id, update);
  }

  deleteById(id) {
    return this.benefitDAO.deleteById(id);
  }

  decrementStockIfAvailable(id, quantity) {
    return this.benefitDAO.decrementStockIfAvailable(id, quantity);
  }
}
