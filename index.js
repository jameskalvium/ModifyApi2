const express = require('express');
const { resolve } = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const menu = require('./Schema.js')


const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json());

const DB_URL=process.env.DB_URL;

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


mongoose.connect(DB_URL,{
  useNewParser:true,
  useUnifiedTopology:true,
}).then(()=>console.log("Connected to the database successfully"))
.catch((err)=>{
  console.log("Error occured")
})

app.put('/menu/:id',(req,res)=>{
  const id=req.params.id
  const updatedData=req.body
  menu.findByIdAndUpdate(id,updatedData)
  .then((updatedItem)=>{
    if (!updatedItem){
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item updated successfully", updatedItem })
  })
  .catch((err)=>{
    res.status(500).json({message:"Error occured",error:err.message})
  })
})
app.delete('/menu/:id',(req,res)=>{
  const id=req.params.id
  menu.findByIdAndDelete(id)
  .then((deletedItem)=>{
    if(!deletedItem){
        return res.status(404).json({ message: "Item not found" });
      }
      return res.status(200).json({ message: "Item deleted successfully", deletedItem });
  })
  .catch((err)=>{
    res.status(500).json({ message: "Error occurred", error: error.message });
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
