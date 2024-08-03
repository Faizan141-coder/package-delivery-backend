const express = require("express")
const router = express.Router()


const ticketController = require("../controllers/ticketController")

const requireAuthentication = require("../middleware/requireAuthentication")

// router.use(requireAuthentication)

router.post("/submitTicket", ticketController.submitTicket)
router.get("/getTicket/:id",ticketController.getTicketById)
// router.get("/searchActiveTickets",ticketController.searchActiveTickets)
// router.get("/searchPendingTickets",ticketController.searchPendingTickets)
router.put("/editTicket",ticketController.editTicket)
router.delete("/deleteTicket",ticketController.deleteTicket)
router.patch("/changeStatus",ticketController.updateStatus)

router.get("/getActiveTickets",ticketController.getActiveTickets)
router.get("/getPendingTickets",ticketController.getPendingTickets)


module.exports = router