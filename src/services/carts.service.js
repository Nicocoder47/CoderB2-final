import { CartRepository } from '../repositories/CartRepository.js';
import { UserRepository } from '../repositories/UserRepository.js';
import { BenefitRepository } from '../repositories/BenefitRepository.js';
import { CartDAO } from '../dao/mongo/CartDAO.js';
import { UserDAO } from '../dao/mongo/UserDAO.js';
import { BenefitDAO } from '../dao/mongo/BenefitDAO.js';
import { AppError } from '../utils/errors.js';

const cartRepository = new CartRepository(new CartDAO());
const userRepository = new UserRepository(new UserDAO());
const benefitRepository = new BenefitRepository(new BenefitDAO());

export const createCartForUser = async (userId) => {
  const user = await userRepository.getById(userId);
  if (!user) {
    throw new AppError('Usuario no encontrado', 404);
  }

  if (user.cart) {
    return cartRepository.getByIdPopulated(user.cart);
  }

  const cart = await cartRepository.create({ user: user._id, items: [] });
  await userRepository.updateById(user._id, { cart: cart._id });

  return cartRepository.getByIdPopulated(cart._id);
};

export const getCartById = async (cid) => {
  const cart = await cartRepository.getByIdPopulated(cid);
  if (!cart) {
    throw new AppError('Carrito no encontrado', 404);
  }
  return cart;
};

export const addBenefitToCart = async ({ cid, bid, user }) => {
  const cart = await cartRepository.getByIdPopulated(cid);
  if (!cart) {
    throw new AppError('Carrito no encontrado', 404);
  }

  if (cart.user._id.toString() !== user._id.toString()) {
    throw new AppError('No autorizado para modificar este carrito', 403);
  }

  const benefit = await benefitRepository.getById(bid);
  if (!benefit || !benefit.isActive) {
    throw new AppError('Beneficio no disponible', 404);
  }

  const items = [...cart.items];
  const index = items.findIndex((item) => item.benefit._id.toString() === bid);

  if (index >= 0) {
    items[index] = {
      benefit: items[index].benefit._id,
      quantity: items[index].quantity + 1
    };
  } else {
    items.push({ benefit: bid, quantity: 1 });
  }

  return cartRepository.updateById(cid, { items });
};

export const removeBenefitFromCart = async ({ cid, bid, user }) => {
  const cart = await cartRepository.getByIdPopulated(cid);
  if (!cart) {
    throw new AppError('Carrito no encontrado', 404);
  }

  if (cart.user._id.toString() !== user._id.toString()) {
    throw new AppError('No autorizado para modificar este carrito', 403);
  }

  const filteredItems = cart.items.filter((item) => item.benefit._id.toString() !== bid);

  return cartRepository.updateById(cid, { items: filteredItems });
};
