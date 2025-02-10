import { Request, Response } from 'express';
import ProductModel from '../models/product';
import { ExpressRequest } from '../types/expressRequest.interface';
import product from '../models/product';

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const category = req.query.category;
    let products;
    if (category) {
      products = await ProductModel.find({category});
    } else {
      products = await ProductModel.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong',
    })
  }
}

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      res.status(404).json({
        error: 'Product not found',
      });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong',
    });
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
  getProductById,
  createProduct
}
