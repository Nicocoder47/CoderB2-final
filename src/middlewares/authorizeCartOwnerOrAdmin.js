import { CartRepository } from '../repositories/CartRepository.js';
import { CartDAO } from '../dao/mongo/CartDAO.js';

const cartRepository = new CartRepository(new CartDAO());

export const authorizeCartOwnerOrAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      error: { message: 'No autenticado' }
    });
  }

  if (req.user.role === 'admin') {
    return next();
  }

  const { cid } = req.params;
  const cart = await cartRepository.getById(cid);

  if (!cart) {
    return res.status(404).json({
      status: 'error',
      error: { message: 'Carrito no encontrado' }
    });
  }

  if (cart.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      status: 'error',
      error: { message: 'No autorizado para acceder a este carrito' }
    });
  }

  return next();
};
