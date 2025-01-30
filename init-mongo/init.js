db = db.getSiblingDB("foodmarketdb"); // Назва бази даних

const products =   [
  {
    "name": "Fresh Atlantic Salmon",
    "image": [
      "https://example.com/images/salmon1.jpg",
      "https://example.com/images/salmon2.jpg"
    ],
    "price": 15.99,
    "SKU": 10067890,
    "category": "MEATANDFISH",
    "subcategory": "FISH",
    "farm": "Northern Waters Fisheries",
    "stoke": "INSTOCK",
    "freshness": 5,
    "buyBy": ["Weight", "Piece"],
    "deliveryDays": 3,
    "deliveryCoast": 0,
    "deliveryAria": "USA",
    "maxKgs": 30,
    "description": "Fresh Atlantic salmon fillets, perfect for grilling or baking.",
    "detailDescription": "Our Atlantic salmon is sustainably sourced and rich in Omega-3 fatty acids. Ideal for a healthy diet.",
    "rate": 4.9,
    "tax": 8,
    "createdAt": "2025-01-04T14:00:00.000Z",
    "createdBy": "Admin 2",
    "updatedAt": "2025-01-04T14:00:00.000Z",
    "updatedBy": "Admin2"
  },
  {
    "name": "Organic Bananas",
    "image": ["https://example.com/images/banana1.jpg"],
    "price": 2.99,
    "SKU": 10012345,
    "category": "FRUITANDVEGETABLES",
    "subcategory": "FRUIT",
    "farm": "Green Valley Farm",
    "stoke": "INSTOCK",
    "freshness": 7,
    "buyBy": ["Weight", "Bunch"],
    "deliveryDays": 2,
    "deliveryCoast": 0.02,
    "deliveryAria": "USA and Canada",
    "maxKgs": 50,
    "description": "Fresh organic bananas perfect for smoothies and snacks.",
    "detailDescription": "These organic bananas are sourced from sustainable farms.",
    "rate": 4.8,
    "tax": 5,
    "createdAt": "2025-01-04T14:00:00.000Z",
    "createdBy": "Admin",
    "updatedAt": "2025-01-04T14:00:00.000Z",
    "updatedBy": "Admin"
  },
  {
    "name": "Artisanal Whole Grain Bread",
    "image": [
      "https://example.com/images/bread1.jpg",
      "https://example.com/images/bread2.jpg"
    ],
    "price": 4.50,
    "SKU": 10054321,
    "category": "BAKERY",
    "subcategory": "BAKERY",
    "farm": "Golden Wheat Bakers",
    "stoke": "EXPECTEDSOON",
    "freshness": 3,
    "buyBy": ["Piece"],
    "deliveryDays": 1,
    "deliveryCoast": 0.5,
    "deliveryAria": "Worldwide",
    "maxKgs": 10,
    "description": "Nutritious and delicious artisanal whole grain bread.",
    "detailDescription": "This whole grain bread is baked fresh daily with the finest ingredients. High in fiber and perfect for a balanced diet.",
    "rate": 4.7,
    "tax": 2,
    "createdAt": "2025-01-01T08:00:00.000Z",
    "createdBy": "Admin",
    "updatedAt": "2025-01-07T10:00:00.000Z",
    "updatedBy": "Admin"
  },
  {
    "name": "Organic Baby Spinach",
    "image": [
      "https://example.com/images/spinach1.jpg",
      "https://example.com/images/spinach2.jpg"
    ],
    "price": 3.99,
    "SKU": 10123456,
    "category": "FRUITANDVEGETABLES",
    "subcategory": "VEGETABLES",
    "farm": "Green Leaf Organics",
    "stoke": "INSTOCK",
    "freshness": 7,
    "buyBy": ["Bag", "Weight"],
    "deliveryDays": 2,
    "deliveryCoast": 0.01,
    "deliveryAria": "Local Only",
    "maxKgs": 20,
    "description": "Fresh organic baby spinach perfect for salads and smoothies.",
    "detailDescription": "This organic baby spinach is grown without pesticides and harvested at peak freshness. Packed with vitamins and minerals.",
    "rate": 4.8,
    "tax": 5,
    "createdAt": "2025-01-03T09:00:00.000Z",
    "createdBy": "Admin2",
    "updatedAt": "2025-01-06T15:00:00.000Z",
    "updatedBy": "Admin2"
  },
  {
    "name": "Raw Organic Honey",
    "image": [
      "https://example.com/images/honey1.jpg",
      "https://example.com/images/honey2.jpg"
    ],
    "price": 12.99,
    "SKU": 10134567,
    "category": "SPECIALNUTRITION",
    "subcategory": "SPECIALNUTRITION",
    "farm": "Bee Bliss Farms",
    "stoke": "INSTOCK",
    "freshness": 365,
    "buyBy": ["Jar"],
    "deliveryDays": 5,
    "deliveryCoast": 0.05,
    "deliveryAria": "Worldwide",
    "maxKgs": 10,
    "description": "Pure raw organic honey harvested from sustainable hives.",
    "detailDescription": "Our honey is free from additives and processed using natural methods, ensuring premium quality and taste.",
    "rate": 4.9,
    "tax": 3,
    "createdAt": "2025-01-02T10:00:00.000Z",
    "createdBy": "Admin",
    "updatedAt": "2025-01-07T12:00:00.000Z",
    "updatedBy": "Admin"
  },
  {
    "name": "Fresh Chicken Breast",
    "image": [
      "https://example.com/images/chicken1.jpg"
    ],
    "price": 8.49,
    "SKU": 10145678,
    "category": "MEATANDFISH",
    "subcategory": "MEAT",
    "farm": "Sunny Farm Poultry",
    "stoke": "INSTOCK",
    "freshness": 5,
    "buyBy": ["Weight"],
    "deliveryDays": 2,
    "deliveryCoast": 0,
    "deliveryAria": "Nationwide",
    "maxKgs": 50,
    "description": "Premium quality fresh chicken breast with no added hormones.",
    "detailDescription": "Perfectly trimmed chicken breast, sourced from local farms. Ideal for healthy meals.",
    "rate": 4.6,
    "tax": 7,
    "createdAt": "2025-01-03T08:00:00.000Z",
    "createdBy": "Admin2",
    "updatedAt": "2025-01-06T15:00:00.000Z",
    "updatedBy": "Admin2"
  },
  {
    "name": "Organic Almond Milk",
    "image": [
      "https://example.com/images/almondmilk1.jpg"
    ],
    "price": 4.99,
    "SKU": 10156789,
    "category": "DRINKS",
    "subcategory": "DRINKS",
    "farm": "Nutra Farms",
    "stoke": "INSTOCK",
    "freshness": 14,
    "buyBy": ["Bottle"],
    "deliveryDays": 3,
    "deliveryCoast": 0.03,
    "deliveryAria": "Local Only",
    "maxKgs": 15,
    "description": "Smooth and creamy almond milk made from organic almonds.",
    "detailDescription": "Unsweetened almond milk, dairy-free, and fortified with calcium and vitamin D.",
    "rate": 4.7,
    "tax": 5,
    "createdAt": "2025-01-02T09:30:00.000Z",
    "createdBy": "Admin2",
    "updatedAt": "2025-01-05T14:00:00.000Z",
    "updatedBy": "Admin2"
  },
  {
    "name": "Farm Fresh Organic Eggs",
    "image": [
      "https://example.com/images/eggs1.jpg"
    ],
    "price": 6.50,
    "SKU": 10167890,
    "category": "KITCHEN",
    "subcategory": "KITCHEN",
    "farm": "Happy Hen Farms",
    "stoke": "EXPECTEDSOON",
    "freshness": 14,
    "buyBy": ["Carton"],
    "deliveryDays": 2,
    "deliveryCoast": 0.02,
    "deliveryAria": "Local Only",
    "maxKgs": 30,
    "description": "Freshly laid organic eggs from cage-free hens.",
    "detailDescription": "These eggs come from hens raised on organic feed, ensuring great taste and nutritional value.",
    "rate": 4.8,
    "tax": 2,
    "createdAt": "2025-01-01T11:00:00.000Z",
    "createdBy": "Admin2",
    "updatedAt": "2025-01-06T16:00:00.000Z",
    "updatedBy": "Admin2"
  },
  {
    "name": "Organic Herbal Tea",
    "image": [
      "https://example.com/images/herbaltea1.jpg",
      "https://example.com/images/herbaltea2.jpg"
    ],
    "price": 5.99,
    "SKU": 10189012,
    "category": "DRINKS",
    "subcategory": "DRINKS",
    "farm": "Nature's Cup",
    "stoke": "INSTOCK",
    "freshness": 180,
    "buyBy": ["Box"],
    "deliveryDays": 4,
    "deliveryCoast": 0.01,
    "deliveryAria": "Nationwide",
    "maxKgs": 20,
    "description": "Relaxing herbal tea made from organic ingredients.",
    "detailDescription": "Our herbal tea blend includes chamomile, peppermint, and lavender for a soothing experience.",
    "rate": 4.9,
    "tax": 5,
    "createdAt": "2025-01-03T11:00:00.000Z",
    "createdBy": "Admin2",
    "updatedAt": "2025-01-06T17:00:00.000Z",
    "updatedBy": "Admin2"
  },
  {
    "name": "Premium Grass-Fed Beef Steak",
    "image": [
      "https://example.com/images/beef1.jpg",
      "https://example.com/images/beef2.jpg"
    ],
    "price": 18.99,
    "SKU": 10200123,
    "category": "MEATANDFISH",
    "subcategory": "MEAT",
    "farm": "Grassland Farms",
    "stoke": "INSTOCK",
    "freshness": 4,
    "buyBy": ["Weight"],
    "deliveryDays": 1,
    "deliveryCoast": 1,
    "deliveryAria": "Nationwide",
    "maxKgs": 20,
    "description": "Juicy, tender grass-fed beef steaks for gourmet meals.",
    "detailDescription": "Our premium beef steaks are 100% grass-fed, offering exceptional flavor and quality.",
    "rate": 4.8,
    "tax": 6,
    "createdAt": "2025-01-05T09:00:00.000Z",
    "createdBy": "Admin",
    "updatedAt": "2025-01-07T10:00:00.000Z",
    "updatedBy": "Admin"
  },
  {
    "name": "Organic Chicken Thighs",
    "image": [
      "https://example.com/images/chicken-thighs1.jpg"
    ],
    "price": 7.49,
    "SKU": 10200234,
    "category": "MEATANDFISH",
    "subcategory": "MEAT",
    "farm": "Healthy Choice Poultry",
    "stoke": "INSTOCK",
    "freshness": 6,
    "buyBy": ["Weight", "Piece"],
    "deliveryDays": 2,
    "deliveryCoast": 0.02,
    "deliveryAria": "Local Only",
    "maxKgs": 15,
    "description": "Tender organic chicken thighs with no added hormones.",
    "detailDescription": "Perfect for grilling, roasting, or stewing, our chicken thighs are free-range and organically raised.",
    "rate": 4.7,
    "tax": 5,
    "createdAt": "2025-01-04T11:00:00.000Z",
    "createdBy": "Admin2",
    "updatedAt": "2025-01-07T13:00:00.000Z",
    "updatedBy": "Admin2"
  },
  {
    "name": "Wild-Caught Salmon Fillets",
    "image": [
      "https://example.com/images/salmon-fillets1.jpg"
    ],
    "price": 14.99,
    "SKU": 10200345,
    "category": "MEATANDFISH",
    "subcategory": "FISH",
    "farm": "Pacific Ocean Fisheries",
    "stoke": "INSTOCK",
    "freshness": 5,
    "buyBy": ["Weight"],
    "deliveryDays": 3,
    "deliveryCoast": 0.7,
    "deliveryAria": "Nationwide",
    "maxKgs": 25,
    "description": "Fresh wild-caught salmon fillets, rich in Omega-3.",
    "detailDescription": "Our salmon is sustainably sourced and perfect for baking, grilling, or pan-searing.",
    "rate": 4.9,
    "tax": 7,
    "createdAt": "2025-01-06T10:00:00.000Z",
    "createdBy": "Admin2",
    "updatedAt": "2025-01-07T15:00:00.000Z",
    "updatedBy": "Admin2"
  },
  {
    "name": "Frozen Tilapia Fillets",
    "image": [
      "https://example.com/images/tilapia1.jpg"
    ],
    "price": 5.99,
    "SKU": 10200456,
    "category": "MEATANDFISH",
    "subcategory": "FISH",
    "farm": "Blue Lake Fisheries",
    "stoke": "EXPECTEDSOON",
    "freshness": 30,
    "buyBy": ["Bag"],
    "deliveryDays": 4,
    "deliveryCoast": 0.12,
    "deliveryAria": "Nationwide",
    "maxKgs": 50,
    "description": "High-quality frozen tilapia fillets.",
    "detailDescription": "Convenient and versatile, our frozen tilapia is a great source of lean protein.",
    "rate": 4.6,
    "tax": 4,
    "createdAt": "2025-01-03T12:00:00.000Z",
    "createdBy": "Admin",
    "updatedAt": "2025-01-06T14:00:00.000Z",
    "updatedBy": "Admin"
  },
  {
    "name": "Fresh Broccoli",
    "image": [
      "https://example.com/images/broccoli1.jpg"
    ],
    "price": 2.99,
    "SKU": 10200567,
    "category": "FRUITANDVEGETABLES",
    "subcategory": "VEGETABLES",
    "farm": "Green Valley Farms",
    "stoke": "INSTOCK",
    "freshness": 7,
    "buyBy": ["Weight"],
    "deliveryDays": 2,
    "deliveryCoast": 0,
    "deliveryAria": "Local Only",
    "maxKgs": 20,
    "description": "Fresh, green broccoli rich in vitamins and minerals.",
    "detailDescription": "Sustainably grown, our broccoli is crisp and perfect for steaming or roasting.",
    "rate": 4.8,
    "tax": 2,
    "createdAt": "2025-01-02T09:00:00.000Z",
    "createdBy": "Admin2",
    "updatedAt": "2025-01-06T10:00:00.000Z",
    "updatedBy": "Admin2"
  },
  {
    "name": "Organic Carrots",
    "image": [
      "https://example.com/images/carrots1.jpg"
    ],
    "price": 3.49,
    "SKU": 10200678,
    "category": "FRUITANDVEGETABLES",
    "subcategory": "VEGETABLES",
    "farm": "Fresh Earth Organics",
    "stoke": "INSTOCK",
    "freshness": 10,
    "buyBy": ["Bag"],
    "deliveryDays": 3,
    "deliveryCoast": 0.15,
    "deliveryAria": "Nationwide",
    "maxKgs": 15,
    "description": "Sweet and crunchy organic carrots.",
    "detailDescription": "Ideal for snacking or cooking, our organic carrots are naturally grown and pesticide-free.",
    "rate": 4.7,
    "tax": 3,
    "createdAt": "2025-01-04T10:00:00.000Z",
    "createdBy": "Admin",
    "updatedAt": "2025-01-07T11:00:00.000Z",
    "updatedBy": "Admin"
  },
  {
    "name": "Organic Carrots",
    "image": [
      "https://example.com/images/carrots1.jpg"
    ],
    "price": 3.49,
    "SKU": 10200678,
    "category": "FRUITANDVEGETABLES",
    "subcategory": "VEGETABLES",
    "farm": "Fresh Earth Organics",
    "stoke": "INSTOCK",
    "freshness": 10,
    "buyBy": ["Bag"],
    "deliveryDays": 3,
    "deliveryCoast": 0.07,
    "deliveryAria": "Nationwide",
    "maxKgs": 15,
    "description": "Sweet and crunchy organic carrots.",
    "detailDescription": "Ideal for snacking or cooking, our organic carrots are naturally grown and pesticide-free.",
    "rate": 4.7,
    "tax": 3,
    "createdAt": "2025-01-04T10:00:00.000Z",
    "createdBy": "Admin",
    "updatedAt": "2025-01-07T11:00:00.000Z",
    "updatedBy": "Admin"
  },
  {
    "name": "Tropical Mangoes",
    "image": [
      "https://example.com/images/mangoes1.jpg"
    ],
    "price": 7.99,
    "SKU": 10200890,
    "category": "FRUITANDVEGETABLES",
    "subcategory": "FRUIT",
    "farm": "Sunshine Tropics",
    "stoke": "EXPECTEDSOON",
    "freshness": 6,
    "buyBy": ["Piece"],
    "deliveryDays": 3,
    "deliveryCoast": 1.5,
    "deliveryAria": "Nationwide",
    "maxKgs": 25,
    "description": "Ripe and juicy tropical mangoes.",
    "detailDescription": "Sourced from tropical farms, our mangoes are bursting with sweetness and flavor.",
    "rate": 4.8,
    "tax": 4,
    "createdAt": "2025-01-04T14:00:00.000Z",
    "createdBy": "Admin",
    "updatedAt": "2025-01-07T16:00:00.000Z",
    "updatedBy": "Admin"
  }
];

db.products.insertMany(products);

print("Products inserted successfully!");

// const bcryptjs = require('bcryptjs');
//
// const db = db.getSiblingDB("foodmarketbd");

// const hashedPassword = async (password) => {
//   const salt = await bcryptjs.genSalt(10);
//   return await bcryptjs.hash(password, salt);
// }

// print("Initial data inserting...");

// Дані для ініціалізації
// const users = [
//   {
//     firstName: "Admin",
//     lastName: "First",
//     username: "admin",
//     email: "admin@gmail.com",
//     phoneNumber: "1234567891234",
//     password: "K(75ie%Y",
//     role: "admin",
//     newsletterConsent: false,
//   },
//   {
//     firstName: "Admin",
//     lastName: "Second",
//     username: "admin2",
//     email: "admin2@gmail.com",
//     phoneNumber: "1234567891234",
//     password: "K(75ie%Y",
//     role: "admin",
//     newsletterConsent: false,
//   },
// ];

// db.products.insertMany(products);


// (async () => {
//   try {
//     const db = db.getSiblingDB("foodmarketdb"); // Задайте ім'я бази даних
//
//     const hashedUsers = await Promise.all(
//       users.map(async (user) => ({
//         ...user,
//         password: await hashedPassword(user.password),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       }))
//     );
//
//     // Додаємо користувачів до колекції
//     db.users.insertMany(hashedUsers);
//
//     console.log("Users added successfully with hashed passwords!");
//   } catch (error) {
//     console.log("Error during initialization:", error);
//   }
// })();

print("Initial data inserted successfully!");
