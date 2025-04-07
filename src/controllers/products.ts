import { Request, Response } from 'express';
import ProductModel from '../models/product';
import { ExpressRequest } from '../types/expressRequest.interface';
import { handleErrors } from '../config/handle-error';
import { Category, SubCategory } from '../types/product';

const getAllProducts = async (req: Request, res: Response) => {
  // pagination
  const pageSize = Number(req.query.pageSize) || null;
  const currentPage = Number(req.query.page) || null;

  // filtering
  const category = req.query.category;
  const subcategory = req.query.subcategory;
  const priceMin = req.query.priceMin ? Number(req.query.priceMin) : null;
  const priceMax = req.query.priceMax ? Number(req.query.priceMax) : null;
  const rate = req.query.rate;

  try {
    let filter: any = {};

    if (category) {
      if (!Object.values(Category).includes(category as Category)) {
        res.status(400).json({
            error: 'Invalid category',
            message: 'Category must be one of the following: ' + Object.values(Category).join(', '),
          });
        return;
      }

      filter.category = category;
    }

    if (subcategory) {
      if (!Object.values(SubCategory).includes(subcategory as SubCategory)) {
        res.status(400).json({
          error: 'Invalid subcategory',
          message: 'SubCategory must be one of the following: ' + Object.values(SubCategory).join(', '),
        });
        return;
      }

      filter.subcategory = subcategory;
    }

    if (priceMin !== null || priceMax !== null) {
      if (priceMin && priceMin < 0) {
        res.status(400).json({
          error: 'Invalid price params',
          message: 'priceMin must be at least 0',
        });
        return;
      }

      filter.price = {};
      if (priceMin !== null) filter.price.$gte = priceMin; // price >= priceMin
      if (priceMax !== null) filter.price.$lte = priceMax; // price <= priceMax
    }

    if (rate) {
      const rateArray = (rate as string).split(',').map((r: string) => Number(r)).sort((a, b) => a - b);
      if (rateArray.length > 0) {
        if (rateArray[0] < 0 || rateArray[rateArray.length - 1] > 5) {
          res.status(400).json({
            error: 'Invalid rate params',
            message: 'Rate must be at least 0 and rate cannot exceed 5',
          });
          return;
        }
      }
      filter.$expr = {
        $in: [{ $floor: { $add: ['$rate', 0.5] } }, rateArray]
      };
    }

    let products;
    if (pageSize && currentPage) {
      if (pageSize && pageSize < 1) {
        res.status(400).json({
          error: 'Invalid pageSize params',
          message: 'pageSize must be at least 1',
        });
        return;
      }

      if (currentPage && currentPage < 1) {
        res.status(400).json({
          error: 'Invalid currentPage params',
          message: 'currentPage must be at least 1',
        });
        return;
      }

      if (currentPage > pageSize) {
        res.status(400).json({
          error: 'Invalid pagination params',
          message: 'currentPage must be less than or equal to pageSize',
        });
      }

      products = await ProductModel.find(filter)
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize);
    } else {
      if (pageSize && !currentPage) {
        res.status(400).json({
          error: 'Invalid pagination params',
          message: 'pageSize must be used with page. If you want to get all products, do not use pageSize and page.',
        });
        return;
      }

      if (currentPage && !pageSize) {
        res.status(400).json({
          error: 'Invalid pagination params',
          message: 'page must be used with pageSize. If you want to get all products, do not use pageSize and page.',
        });
        return;
      }
      products = await ProductModel.find(filter);
    }

    const count = await ProductModel.countDocuments(filter);

    res.status(200).json({
      totalItems: count,
      totalPages: pageSize ? Math.ceil(count / pageSize) : null,
      currentPage,
      pageSize,
      results: products,
    });
  } catch (error) {
    handleErrors(error, res);
  }
}

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      res.status(404).json({
        error: 'Product not found',
        message: 'No product found with the specified ID. Please make sure the ID is correct.'
      });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    handleErrors(error, res);
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
    handleErrors(error, res);
  }
}

const addToFavorites = async (req: ExpressRequest, res: Response) => {
  try {
    const { productId } = req.body;
    const userId = req.user?.id;

    const product = await ProductModel.findById(productId);

    if (!product) {
      res.status(404).json({
        error: 'Product not found',
        message: 'No product found with the specified ID.',
      });
      return;
    }

    if (product.favorites.includes(userId)) {
      res.status(400).json({
        error: 'Product is in favorites',
        message: 'This product is already in your favorites.'
      });
      return;
    }

    await ProductModel.updateOne(
      { _id: productId },
      { $addToSet: { favorites: userId } }
    );

    res.status(200).json({ message: 'Added to favorites' });
  } catch (error) {
    handleErrors(error, res);
  }
};

const getFavoriteProductsByUser = async (req: ExpressRequest, res: Response) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const currentPage = Number(req.query.page) || 1;
  try {
    const filter = { favorites: req.user?.id };

    const products = await ProductModel.find(filter)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    const count = await ProductModel.countDocuments(filter);

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage,
      pageSize,
      results: products
    });
  } catch (error) {
    handleErrors(error, res);
  }
};

const removeProductFromFavorites = async (req: ExpressRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const productId = req.query.productId as string;

    const product = await ProductModel.findById(productId);

    if (!product) {
      res.status(404).json({
        error: 'Product not found',
        message: 'No product found with the specified ID. Please make sure the ID is correct.'
      });
      return;
    }

    if (!product.favorites.includes(userId)) {
      res.status(400).json({
        error: 'Product is not in favorites',
        message: 'This product is not in your favorites.'
      });
      return;
    }

    await ProductModel.updateOne(
      { _id: productId },
      { $pull: { favorites: userId } }
    );

    res.status(200).json({ message: 'Removed from favorites'});
  } catch (error) {
    handleErrors(error, res);
  }
}

export default {
  getAllProducts,
  getProductById,
  createProduct,
  addToFavorites,
  getFavoriteProductsByUser,
  removeProductFromFavorites
}
