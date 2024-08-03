const jwt = require("jsonwebtoken");
const User = require("../models/user")

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization Token Required" });
  }

  //get the token out of the header
  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_String);

    req.userid = await User.findOne({ _id: id }).select("_id");

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};


const requireAuthentication = async(req,res,next) =>{
  try{
    const {authorization} = req.headers

    if(!authorization){
      throw Error("Auth Token Required")
    }

    const token = authorization.split(" ")[1]

    const {id} = jwt.verify(token,process.env.JWT_String)
    
    const user = await User.findById(id)

    req.user = user

    next()
  }catch(error){
    res.status(400).json({
      error:error.message
    })
  }
}

module.exports = requireAuthentication;
