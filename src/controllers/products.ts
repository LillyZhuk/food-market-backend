import { Request, Response } from 'express';
import ProductModel from '../models/product';
import { ExpressRequest } from '../types/expressRequest.interface';
import product from '../models/product';

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong',
    })
  }
}

const createProduct = async (req: ExpressRequest, res: Response) => {
  const product = new ProductModel({
    ...req.body,
    created_at: new Date(),
    createdBy: req.user?.username,
    updated_at: new Date(),
    updatedBy: req.user?.username,
  });
  try {
    // console.log(product);
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Something went wrong',
    })
  }
}


export default {
  getAllProducts,
  createProduct
}
