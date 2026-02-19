import { BenefitRepository } from '../repositories/BenefitRepository.js';
import { BenefitDAO } from '../dao/mongo/BenefitDAO.js';
import { AppError } from '../utils/errors.js';

const benefitRepository = new BenefitRepository(new BenefitDAO());

export const getBenefits = async () => {
  return benefitRepository.getAll({});
};

export const getBenefitById = async (bid) => {
  const benefit = await benefitRepository.getById(bid);
  if (!benefit) {
    throw new AppError('Beneficio no encontrado', 404);
  }
  return benefit;
};

export const createBenefit = async (benefitData) => {
  return benefitRepository.create(benefitData);
};

export const updateBenefit = async (bid, updateData) => {
  const updated = await benefitRepository.updateById(bid, updateData);
  if (!updated) {
    throw new AppError('Beneficio no encontrado', 404);
  }
  return updated;
};

export const deleteBenefit = async (bid) => {
  const deleted = await benefitRepository.deleteById(bid);
  if (!deleted) {
    throw new AppError('Beneficio no encontrado', 404);
  }
  return deleted;
};
