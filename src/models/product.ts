import { model, Schema, Types } from 'mongoose';
import { Category, ProductDocument, Stoke, SubCategory } from '../types/product';

const productSchema = new Schema<ProductDocument>({
  name: { type: String, required: true },
  image: { type: [String], required: true },
  price: { type: Number, unique: true, required: true },
  category: { type: String, enum:  Object.values(Category), required: true },
  subcategory: { type: String, enum:  Object.values(SubCategory), required: true },
  farm: { type: String, required: false },
  stoke: { type: String, enum:  Object.values(Stoke), required: true, default: Stoke.OUTOFSTOCK },
  freshness: { type: Number, required: false, default: 0 },
  buyBy: { type: [String], required: true },
  deliveryDays: { type: Number, required: false, default: 0 },
  deliveryCoast: { type: Number, required: false, default: 0 },
  deliveryAria: { type: String, required: true },
  maxKgs: { type: Number, required: false, default: 0 },
  description: { type: String, required: true },
  detailDescription: { type: String, required: true },
  rate: { type: Number, required: true, default: 0 },
  tax: { type: Number, required: false, default: 0 },
  createdAt: { type: Date, default: Date.now, required: true },
  createdBy: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
  updatedBy: { type: String, required: true },
  favorites: [{ type: Types.ObjectId, ref: 'User', select: false }],
});

export default model<ProductDocument>('Product', productSchema);
