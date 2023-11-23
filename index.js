const express =require("express")
const app =express()
const mongoose =require("mongoose")
const Prod=require("./model/products")
const connectDB =require("./db")
require("dotenv").config()

const port =5500
app.use(express.json())


//rout
app.get ("/api/status",(req,res)=>{
    return res.status(200).json({message:"welcome"})
})

//rout for all
app.get("/api/pord",async(req,res)=>{
          try {
            const products = await Prod.find()
            return res.status(200).json({message:"successful",
              count: products.length,products})

          } catch (err){ return res.status(500).json({msg: err.message})
        }
          
})

//rout for one

app.get("/forone/:id",async(req, res) => {
    try {
      const product = await Prod.findById(req.params.id)

      if(!product) 
        return res.status(404).json({msg: 'This product does not exist.'})

      return res.status(200).json(product)
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  })

  //add one
  app.post("/api/addone",async(req,res)=>{
    try{ 
        const { title, price, description, category, image } = req.body
    const newProduct = new Prod({ title, price, description, category, image })
await newProduct.save()
return res.status(200).json(newProduct)

    }
catch (err) {
  return res.status(500).json({msg: err.message})
}

    
  })


  //put
  app.put("/api/change/:id",async(req,res)=>{
try{
  const id =req.params.id
  const{title, price, description, category, image}=req.body
  const updateproduct = await Prod.findByIdAndUpdate({_id:id},{title, price, description, category, image },{new:true})
return res.status(200).json({message:"updated sucessfully",updateproduct})

}catch (error){
  return res.status(500).json({message:error.message})
}
  })

//delete
app.delete("/api/del/:id",async(req,res)=>{
const id = req.params.id
const deleted = await Prod.findByIdAndDelete(id)

return res .status(200).json({message:"deleted successfully"})
})


app.listen(port,async ()=>{
  try {
   await connectDB()
    console.log("hakuna matata....")
  } catch (error) {
    console.error(error)
  }

})