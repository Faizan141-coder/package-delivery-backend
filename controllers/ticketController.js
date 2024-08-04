const Ticket = require("../models/ticketModel");
const ActiveTicket = require("../models/activeModel");
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
        message: `Ticket Created ${ticket._id}`,
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
    const activeTickets = await ActiveTicket.find();
    res.status(200).json(activeTickets);
    } catch (error) {
      res.status(400).json({
        error: error.message
      });
    }
  },
  
  getPendingTickets: async (req, res) => {
    try {
      const tickets = await Ticket.find();
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
      const { id, carton, maskingTape, bags, rolls, bundles, pallets, drums } = req.body;
      if (!id || carton === undefined || maskingTape === undefined || bags === undefined || rolls === undefined || bundles === undefined || pallets === undefined || drums === undefined) {
        return res.status(400).json({ "id:":id, carton, maskingTape, bags, rolls, bundles, pallets, drums});
      }
      
      const ticket = await Ticket.findById(id);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not Found" });
      }
      if (ticket.carton === carton && ticket.maskingTape === maskingTape && ticket.bags === bags && ticket.rolls === rolls && ticket.bundles === bundles && ticket.pallets === pallets && ticket.drums === drums) {
        await ticket.deleteOne();
      } else {
        const activeTicket = await ActiveTicket.create({
        shipperName: ticket.shipperName,
        shipperPhoneNumber: ticket.shipperPhoneNumber,
        shipperContactName: ticket.shipperContactName,
        consigneeName: ticket.consigneeName,
        consigneePhoneNumber: ticket.consigneePhoneNumber,
        consigneeContactName: ticket.consigneeContactName,
        totalAmount: ticket.totalAmount,
        carton,
        maskingTape,
        bags,
        rolls,
        bundles,
        pallets,
        drums,
        other: ticket.other,
        description: ticket.description,
        paymentMethod: ticket.paymentMethod,
      });
      console.log(activeTicket);
      updatedCarton = ticket.carton - carton;
      updatedMaskingTape = ticket.maskingTape - maskingTape;
      updatedBags = ticket.bags - bags;
      updatedRolls = ticket.rolls - rolls;
      updatedBundles = ticket.bundles - bundles;
      updatedPallets = ticket.pallets - pallets;
      updatedDrums = ticket.drums - drums;
      await ticket.updateOne({ carton: updatedCarton, maskingTape: updatedMaskingTape, bags: updatedBags, rolls: updatedRolls, bundles: updatedBundles, pallets: updatedPallets, drums: updatedDrums });
      activeTicket.save();
      res.status(200).json({ message: "Ticket updated and active ticket created successfully", activeTicket });
    }  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
};

module.exports = ticketController;
