const Ticket = require("../models/ticketModel");
const ActiveTicket = require("../models/activeModel");
const { response } = require("express");
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
  
      const existingName = await Ticket.findOne({ shipperName });
  
      if (existingName) {
        const updatedFields = {
          totalAmount : existingName.totalAmount + totalAmount,
          carton : existingName.carton + carton,
          maskingTape : existingName.maskingTape + maskingTape,
          bags : existingName.bags + bags,
          rolls : existingName.rolls + rolls,
          bundles : existingName.bundles + bundles,
          pallets : existingName.pallets + pallets,
          drums : existingName.drums + drums,
        };
        await existingName.updateOne(updatedFields);
        res.status(200).json({ "message": "Ticket Updated on existing Name" });
      } else {
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
      }
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
      
      // Check for missing fields in the request body
      if (!id || [carton, maskingTape, bags, rolls, bundles, pallets, drums].some(value => value === undefined)) {
        return res.status(400).json({ id, carton, maskingTape, bags, rolls, bundles, pallets, drums });
      }
      
      const ticket = await Ticket.findById(id);
      
      // Check if the ticket exists
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not Found" });
      }
      
      // Function to create an active ticket
      const createActiveTicket = async (ticketDetails) => {
        return await ActiveTicket.create({
          shipperName: ticket.shipperName,
          shipperPhoneNumber: ticket.shipperPhoneNumber,
          shipperContactName: ticket.shipperContactName,
          consigneeName: ticket.consigneeName,
          consigneePhoneNumber: ticket.consigneePhoneNumber,
          consigneeContactName: ticket.consigneeContactName,
          totalAmount: ticket.totalAmount,
          ...ticketDetails,
          other: ticket.other,
          description: ticket.description,
          paymentMethod: ticket.paymentMethod,
        });
      };
  
      let activeTicket;
  
      if (ticket.carton === carton && ticket.maskingTape === maskingTape && ticket.bags === bags && ticket.rolls === rolls && ticket.bundles === bundles && ticket.pallets === pallets && ticket.drums === drums) {
        // Create active ticket and delete the original ticket
        activeTicket = await createActiveTicket({ carton, maskingTape, bags, rolls, bundles, pallets, drums });
        await ticket.deleteOne();
        res.status(200).json({ message: "Ticket deleted and active ticket created successfully", activeTicket });
      } else {
        // Create active ticket and update the original ticket
        activeTicket = await createActiveTicket({ carton, maskingTape, bags, rolls, bundles, pallets, drums });
  
        const updatedFields = {
          carton: ticket.carton - carton,
          maskingTape: ticket.maskingTape - maskingTape,
          bags: ticket.bags - bags,
          rolls: ticket.rolls - rolls,
          bundles: ticket.bundles - bundles,
          pallets: ticket.pallets - pallets,
          drums: ticket.drums - drums,
        };
        
        await ticket.updateOne(updatedFields);
        res.status(200).json({ message: "Ticket updated and active ticket created successfully", activeTicket });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  
};

module.exports = ticketController;
