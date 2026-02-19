import { TicketModel } from '../../models/Ticket.js';

export class TicketDAO {
  async create(ticketData) {
    return TicketModel.create(ticketData);
  }

  async getById(id) {
    return TicketModel.findById(id).lean();
  }
}
