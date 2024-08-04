const mongoose = require("mongoose")

const ActiveTicketSchema = new mongoose.Schema(
    {
        shipperName: {type:String,default:""},
        shipperPhoneNumber: {type:String,default:""},
        shipperContactName: {type:String,default:""},
        
        consigneeName : {type:String,default:""},
        consigneePhoneNumber: {type:String,default:""},
        consigneeContactName : {type:String,default:""},

        totalAmount: {type:Number,default:0},

        carton : {type:Number,default:0},
        maskingTape : {type:Number,default:0},
        bags : {type:Number,default:0},
        rolls : {type:Number,default:0},
        bundles : {type:Number,default:0},
        pallets : {type:Number,default:0},
        drums : {type:Number,default:0},

        other: {type:String,default:""},

        description : {type:String,default:""},

        paymentMethod : {type:String,enum:["COD","Cash","Shipper's A/C","Consignee's A/C"]},

      //  pending:{type:Boolean, default:true}
        
    }
)

module.exports = mongoose.model("ActiveTicket", ActiveTicketSchema)