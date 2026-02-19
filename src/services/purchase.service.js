import { CartRepository } from '../repositories/CartRepository.js';
import { BenefitRepository } from '../repositories/BenefitRepository.js';
import { TicketRepository } from '../repositories/TicketRepository.js';
import { CartDAO } from '../dao/mongo/CartDAO.js';
import { BenefitDAO } from '../dao/mongo/BenefitDAO.js';
import { TicketDAO } from '../dao/mongo/TicketDAO.js';
import { AppError } from '../utils/errors.js';
import { generateTicketCode } from '../utils/code.js';

const cartRepository = new CartRepository(new CartDAO());
const benefitRepository = new BenefitRepository(new BenefitDAO());
const ticketRepository = new TicketRepository(new TicketDAO());

export const purchaseCart = async ({ cid, user }) => {
  const cart = await cartRepository.getByIdPopulated(cid);

  if (!cart) {
    throw new AppError('Carrito no encontrado', 404);
  }

  if (cart.user._id.toString() !== user._id.toString()) {
    throw new AppError('No autorizado para comprar este carrito', 403);
  }

  if (!cart.items.length) {
    throw new AppError('El carrito está vacío', 400);
  }

  let amount = 0;
  const purchasedItems = [];
  const notProcessed = [];

  for (const item of cart.items) {
    const benefit = item.benefit;

    if (!benefit || !benefit.isActive) {
      notProcessed.push({
        benefit: benefit?._id || item.benefit,
        title: benefit?.title || 'Beneficio no disponible',
        reason: 'Beneficio inactivo o inexistente'
      });
      continue;
    }

    const updatedBenefit = await benefitRepository.decrementStockIfAvailable(
      benefit._id,
      item.quantity
    );

    if (!updatedBenefit) {
      notProcessed.push({
        benefit: benefit._id,
        title: benefit.title,
        reason: 'Sin cupo/stock'
      });
      continue;
    }

    const unitAmount = Number.isFinite(benefit.amount) ? benefit.amount : null;
    const subtotal = unitAmount !== null ? unitAmount * item.quantity : null;

    if (subtotal !== null) {
      amount += subtotal;
    }

    purchasedItems.push({
      benefit: benefit._id,
      title: benefit.title,
      quantity: item.quantity,
      unitAmount,
      subtotal
    });
  }

  const status = notProcessed.length === 0 ? 'complete' : 'partial';

  const ticket = await ticketRepository.create({
    code: generateTicketCode(),
    purchase_datetime: new Date(),
    amount,
    purchaser: user.email,
    items: purchasedItems,
    notProcessed,
    status
  });

  if (status === 'complete') {
    await cartRepository.updateById(cart._id, { items: [] });
  } else {
    const remaining = [];

    for (const item of cart.items) {
      const stillPending = notProcessed.find(
        (np) => np.benefit.toString() === item.benefit._id.toString()
      );

      if (stillPending) {
        remaining.push({ benefit: item.benefit._id, quantity: item.quantity });
      }
    }

    await cartRepository.updateById(cart._id, { items: remaining });
  }

  return ticket;
};
