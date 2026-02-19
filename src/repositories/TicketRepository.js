export class TicketRepository {
  constructor(ticketDAO) {
    this.ticketDAO = ticketDAO;
  }

  create(ticketData) {
    return this.ticketDAO.create(ticketData);
  }

  getById(id) {
    return this.ticketDAO.getById(id);
  }
}
