const express = require("express")
const router = express.Router()

const authController = require("../controllers/authController")
const requireAuthentication = require("../middleware/requireAuthentication")

router.post("/logIn", authController.logIn)

router.use(requireAuthentication)
router.post('/createUser', authController.createUser)
router.delete("/deleteUser", authController.deleteUser)

router.get("/getAllAccounts",authController.getAllAccounts)





module.exports = router
