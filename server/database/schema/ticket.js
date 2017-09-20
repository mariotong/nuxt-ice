const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TicketSchema = new mongoose.Schema({
  name: String,
  ticket: String,
  expires_in: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

TicketSchema.pre('save', function(next) {
  //如果是新增的数据
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }

  next()
})

TicketSchema.statics = {
  async getTicket() {
    const ticket = await this.findOne({
      name: 'ticket'
    }).exec()

    if (ticket && ticket.ticket) {
      ticket.ticket = ticket.ticket
    }

    return ticket
  },

  async saveTicket(data) {
    let ticket = await this.findOne({
      name: 'ticket'
    }).exec()

    if (ticket) {
      ticket.ticket = data.ticket
      ticket.expires_in = data.expires_in
    } else {
      ticket = new ticket({
        name: 'ticket',
        ticket: data.ticket,
        expires_in: data.expires_in
      })
    }

    await ticket.save()

    return data
  }
}

const ticket = mongoose.model('Ticket', TicketSchema)
