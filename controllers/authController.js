const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const authController = {
    createUser: async (req, res) => {
        try {
            const { userName, password, admin } = req.body
            const user = await User.findOne({ userName })
            if (user) {
                throw Error("Username Exists")
            }

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);




            await User.create({ userName, password: hashed, admin })
            res.status(200).json(
                {
                    message: "User Created Successfully"
                }
            )

        } catch (error) {
            res.status(400).json({
                error: error.message

            })
        }


    },
    logIn: async (req, res) => {
        try {
            const { userName, password } = req.body
            const user = await User.findOne({ userName })
            if (!user) {
                throw Error("Username Not Found")
            }

            const match = await bcrypt.compare(password, user.password)

            if (!match) {
                throw Error("Incorrect Password")
            }

            const token = await jwt.sign({ id: user.id }, process.env.JWT_String)
            res.status(200).json({
                user,
                token
            })

        } catch (error) {
            res.status(400).json({
                error: error.message

            })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { userName  } = req.body
            const user = await User.findOne({userName})
            console.log(user)
            if (!user) {
                throw Error("User Not Found")
            }
            if(user.admin){
                throw Error("Cannot Delete Admin")
            }
            await user.deleteOne()
            res.status(200).json(
                {
                    message: "User Deleted Successfully"
                }
            )


        }
        catch (error) {
            res.status(400).json({
                error: error.message

            })

        }
    },

    getAllAccounts: async (req,res) =>{
        try{
            const accounts = await User.find({})

            res.status(200).json({accounts})

        }catch(error){
            res.status(400).json({
                error:error.message
            })
        }
    }
    
}


















module.exports = authController