import Product from "../model/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req,res)=>{
    try {
        const products=await Product.find({});
        res.status(200).json({success:true, data:products});
    } catch (error) {
        res.status(404).json({success:false, message:"Products not found!"})
    }
}

export const createProducts=async (req,res)=>{
    const product=req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message:'Please fill in all fields'});
    }

    const newProduct=new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success:true, data:newProduct}); 
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const putProducts=async (req,res)=>{
    const {id}=req.params;
    const product=req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false, message:"Invalid Id"})
    }
    try {
        const updatedProduct=await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success:true, data:updatedProduct});
    } catch (error) {
        res.status(500).json({success:false, message:"Server error"}); 
    }
}

export const deleteProducts=async (req,res)=>{
   const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false, message:"Invalid Id"})
    }
   try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({success:true,message:"Successfully Deleted"});
   } catch (error) {
        res.status(500).json({success:false,message:"Server Error"});
   }
    
}