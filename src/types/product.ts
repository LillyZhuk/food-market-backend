import { Document } from 'mongoose';

export interface Product {
  name: string;
  image: string[];
  price: number;
  SKU: number;
  category: Category; // enum
  subcategory: SubCategory;
  farm: string;
  stoke: Stoke; // enum
  freshness: number; // days
  buyBy: string[];
  deliveryDays: number; // days
  deliveryCoast: number;
  deliveryAria: string;
  maxKgs: number;
  description: string;
  detailDescription: string;
  rate: number;
  tax: number;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  favorites: string[];
}

export interface ProductDocument extends Product, Document {}

export enum Stoke {
  INSTOCK = "INSTOCK",
  OUTOFSTOCK = "OUTOFSTOCK",
  EXPECTEDSOON = "EXPECTEDSOON",
}

export enum Category {
  BAKERY = "BAKERY",
  FRUITANDVEGETABLES = "FRUITANDVEGETABLES",
  MEATANDFISH = "MEATANDFISH",
  DRINKS = "DRINKS",
  KITCHEN = "KITCHEN",
  SPECIALNUTRITION = "SPECIALNUTRITION",
  BABY = "BABY",
  PHARMACY = "PHARMACY",
}

export enum SubCategory {
  VEGETABLES = "VEGETABLES",
  FRUIT = "FRUIT",
  MEAT = "MEAT",
  FISH = "FISH",
  BAKERY = 'BAKERY',
  SPECIALNUTRITION = 'SPECIALNUTRITION',
  DRINKS = 'DRINKS',
  KITCHEN = 'KITCHEN',
}
