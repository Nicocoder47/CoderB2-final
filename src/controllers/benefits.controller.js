import {
  getBenefits,
  getBenefitById,
  createBenefit,
  updateBenefit,
  deleteBenefit
} from '../services/benefits.service.js';

export const getAllBenefitsController = async (_req, res) => {
  const payload = await getBenefits();
  return res.status(200).json({ status: 'success', payload });
};

export const getBenefitByIdController = async (req, res) => {
  const payload = await getBenefitById(req.params.bid);
  return res.status(200).json({ status: 'success', payload });
};

export const createBenefitController = async (req, res) => {
  const payload = await createBenefit(req.body);
  return res.status(201).json({ status: 'success', payload });
};

export const updateBenefitController = async (req, res) => {
  const payload = await updateBenefit(req.params.bid, req.body);
  return res.status(200).json({ status: 'success', payload });
};

export const deleteBenefitController = async (req, res) => {
  const payload = await deleteBenefit(req.params.bid);
  return res.status(200).json({ status: 'success', payload });
};
