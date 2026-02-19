import { Router } from 'express';
import {
  getAllBenefitsController,
  getBenefitByIdController,
  createBenefitController,
  updateBenefitController,
  deleteBenefitController
} from '../controllers/benefits.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authenticateCurrent } from '../middlewares/authenticateCurrent.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';

const router = Router();

router.get('/', asyncHandler(getAllBenefitsController));
router.get('/:bid', validateObjectId('bid'), asyncHandler(getBenefitByIdController));

router.post(
  '/',
  authenticateCurrent,
  authorizeRoles(['admin']),
  asyncHandler(createBenefitController)
);

router.put(
  '/:bid',
  authenticateCurrent,
  authorizeRoles(['admin']),
  validateObjectId('bid'),
  asyncHandler(updateBenefitController)
);

router.delete(
  '/:bid',
  authenticateCurrent,
  authorizeRoles(['admin']),
  validateObjectId('bid'),
  asyncHandler(deleteBenefitController)
);

export default router;
