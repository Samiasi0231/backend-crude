const  mongoose = require("mongoose")





const prodschema = new mongoose.Schema({
    title:{type:String, require:true},
    price:{type:String, require:true},  
    description:{type:String, require:true}, 
    category:{type:String, require:true},
    image:{type:String,}
})


//const staffschema = new mongoose.Schema ({
   // name:{type:String,require:true},
  //  email:{type:String,require:true},
  //  dept:{type:String,require:true},
  //  location:{type:String}
//},{timestamps:true})

//modal
const Prod= mongoose.model("Prod", prodschema)
module.exports = Prod