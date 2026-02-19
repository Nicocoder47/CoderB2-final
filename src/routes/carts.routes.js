import { Router } from 'express';
import {
  createCartController,
  getCartByIdController,
  addBenefitToCartController,
  removeBenefitFromCartController,
  purchaseCartController
} from '../controllers/carts.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authenticateCurrent } from '../middlewares/authenticateCurrent.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
import { authorizeCartOwnerOrAdmin } from '../middlewares/authorizeCartOwnerOrAdmin.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';

const router = Router();

router.post('/', authenticateCurrent, asyncHandler(createCartController));

router.get(
  '/:cid',
  authenticateCurrent,
  validateObjectId('cid'),
  asyncHandler(authorizeCartOwnerOrAdmin),
  asyncHandler(getCartByIdController)
);

router.post(
  '/:cid/benefits/:bid',
  authenticateCurrent,
  authorizeRoles(['user']),
  validateObjectId('cid'),
  validateObjectId('bid'),
  asyncHandler(addBenefitToCartController)
);

router.delete(
  '/:cid/benefits/:bid',
  authenticateCurrent,
  authorizeRoles(['user']),
  validateObjectId('cid'),
  validateObjectId('bid'),
  asyncHandler(removeBenefitFromCartController)
);

router.post(
  '/:cid/purchase',
  authenticateCurrent,
  authorizeRoles(['user']),
  validateObjectId('cid'),
  asyncHandler(purchaseCartController)
);

export default router;
