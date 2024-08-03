const Ticket = require("../models/ticketModel");
const ticketController = {
  submitTicket: async (req, res) => {
    try {
      const {
        shipperName,
        shipperPhoneNumber,
        shipperContactName,

        consigneeName,
        consigneePhoneNumber,
        consigneeContactName,

        totalAmount,

        carton,
        maskingTape,
        bags,
        rolls,
        bundles,
        pallets,
        drums,

        other,

        description,

        paymentMethod,
      } = req.body;

      const ticket = await Ticket.create({
        shipperName,
        shipperPhoneNumber,
        shipperContactName,

        consigneeName,
        consigneePhoneNumber,
        consigneeContactName,

        totalAmount,

        carton,
        maskingTape,
        bags,
        rolls,
        bundles,
        pallets,
        drums,

        other,

        description,

        paymentMethod,
      });
      res.status(200).json({
        message: "Ticket Created",
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  getTicketById: async (req, res) => {
    try {
      const { id } = req.params;
      const ticket = await Ticket.findById(id);
      if (!ticket) {
        throw Error("Ticket Not Found");
      }
      res.status(200).json(ticket);
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  // searchActiveTickets : async(req,res)=>{
  //     try{
  //         const{search,pageNo,perPage} = req.body
  //         const tickets = await Ticket.find({
  //             $or: [
  //                 {shipperName:{$regex:search,$options:"i"}},
  //                 {shipperPhoneNumber:{$regex:search,$options:"i"}},
  //                 {shipperContactName:{$regex:search,$options:"i"}},

  //                 {consigneeName:{$regex:search,$options:"i"}},
  //                 {consigneePhoneNumber:{$regex:search,$options:"i"}},
  //                 {consigneeContactName:{$regex:search,$options:"i"}},

  //                 {description:{$regex:search,$options:"i"}},
  //                 {paymentMethod:{$regex:search,$options:"i"}},
  //             ],
  //             pending:false

  //         }).skip((pageNo-1)*perPage).limit(perPage)
  //         res.status(200).json(tickets)

  //     }catch(error){
  //         res.status(400).json(
  //             {
  //                 error : error.message
  //             }
  //         )

  //     }
  // },
  // searchPendingTickets : async(req,res)=>{
  //     try{
  //         const{search,pageNo,perPage} = req.body
  //         const tickets = await Ticket.find({
  //             $or: [
  //                 {shipperName:{$regex:search,$options:"i"}},
  //                 {shipperPhoneNumber:{$regex:search,$options:"i"}},
  //                 {shipperContactName:{$regex:search,$options:"i"}},

  //                 {consigneeName:{$regex:search,$options:"i"}},
  //                 {consigneePhoneNumber:{$regex:search,$options:"i"}},
  //                 {consigneeContactName:{$regex:search,$options:"i"}},

  //                 {description:{$regex:search,$options:"i"}},
  //                 {paymentMethod:{$regex:search,$options:"i"}},
  //             ],

  //             pending:true

  //         }).skip((pageNo-1)*perPage).limit(perPage)
  //         res.status(200).json(tickets)

  //     }catch(error){
  //         res.status(400).json(
  //             {
  //                 error : error.message
  //             }
  //         )

  //     }
  // },
  getActiveTickets: async (req, res) => {
    try {
      const tickets = await Ticket.find({
        pending: false,
      });
      res.status(200).json(tickets);
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  getPendingTickets: async (req, res) => {
    try {
      const tickets = await Ticket.find({
        pending: true,
      });
      res.status(200).json(tickets);
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  editTicket: async (req, res) => {
    try {
      const { id, ...update } = req.body;

      const ticket = await Ticket.findById(id);

      if (!ticket) {
        throw Error("Ticket Not Found");
      }

      await ticket.updateOne(update);

      res.status(200).json({
        message: "Ticket Updated",
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  deleteTicket: async (req, res) => {
    try {
      const { id } = req.body;
      const ticket = await Ticket.findById(id);
      if (!ticket) {
        throw Error("Ticket not Found");
      }
      await ticket.deleteOne();
      res.status(200).json({
        message: "Ticket Deleted",
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { id, pending } = req.body;

      const ticket = await Ticket.findById(id);
      if (!ticket) {
        throw Error("Ticket not Found");
      }
      await ticket.updateOne({
        pending,
      });
      res.status(200).json({
        message: "Status Updated",
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
};

module.exports = ticketController;
