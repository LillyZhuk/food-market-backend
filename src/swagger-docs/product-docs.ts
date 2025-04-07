/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     tags:
 *       - Product
 *     description: Retrieves a list of products with optional filters.
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [BAKERY, FRUITANDVEGETABLES, MEATANDFISH, DRINKS, KITCHEN, SPECIALNUTRITION, BABY, PHARMACY]
 *         description: Filters products by category.
 *       - in: query
 *         name: subcategory
 *         schema:
 *           type: string
 *           enum: [VEGETABLES, FRUIT, MEAT, FISH, BAKERY, SPECIALNUTRITION, DRINKS, KITCHEN]
 *         description: Filters products by subcategory.
 *       - in: query
 *         name: priceMin
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Minimum price filter.
 *       - in: query
 *         name: priceMax
 *         schema:
 *           type: number
 *         description: Maximum price filter.
 *       - in: query
 *         name: rate
 *         schema:
 *           type: array
 *           items:
 *             type: number
 *             minimum: 0
 *             maximum: 5
 *         style: form
 *         explode: false
 *         description: Comma-separated list of ratings (e.g., `?rate=2,4,5`)
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number for pagination.
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *         description: Number of items per page.
 *     responses:
 *       200:
 *         description: Successful response with a list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: string
 *                   subcategory:
 *                     type: string
 *                   rating:
 *                     type: number
 *       400:
 *         description: Invalid request parameters.
 *         content:
 *           application/json:
 *             examples:
 *               UnavailableParams:
 *                 value: { "error": "Unavailable params" }
 *               InvalidPriceMin:
 *                 value: { "error": "Invalid parameters", "message": "priceMin must be at least 0" }
 *               InvalidSubcategory:
 *                 value: { "error": "Invalid subcategory", "message": "SubCategory must be one of the following: VEGETABLES, FRUIT, MEAT, FISH, BAKERY, SPECIALNUTRITION, DRINKS, KITCHEN" }
 *               InvalidCategory:
 *                 value: { "error": "Invalid category", "message": "Category must be one of the following: BAKERY, FRUITANDVEGETABLES, MEATANDFISH, DRINKS, KITCHEN, SPECIALNUTRITION, BABY, PHARMACY" }
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new products
 *     tags:
 *     - Product
 *     description: Adds a new product to the database.
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags:
 *       - Product
 *     description: Retrieves a single product by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the product.
 *     responses:
 *       200:
 *         description: Product found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Fresh Atlantic Salmon
 *                 image:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - https://allfreshseafood.com/cdn/shop/files/2salmonfilletscanadian_1.jpg?v=1698852411
 *                     - https://www.samuelsseafood.com/wp-content/uploads/2016/11/Wild-Isle-whole-and-side-fillet-1.jpg
 *                     - https://m.media-amazon.com/images/I/817y+lN3ohL.jpg
 *                 price:
 *                   type: number
 *                   example: 15.99
 *                 SKU:
 *                   type: number
 *                   example: 10067890
 *                 category:
 *                   type: string
 *                   example: MEATANDFISH
 *                 subcategory:
 *                   type: string
 *                   example: FISH
 *                 farm:
 *                   type: string
 *                   example: Northern Waters Fisheries
 *                 stoke:
 *                   type: string
 *                   example: INSTOCK
 *                 freshness:
 *                   type: number
 *                   example: 5
 *                 buyBy:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - Weight
 *                     - Piece
 *                 deliveryDays:
 *                   type: number
 *                   example: 3
 *                 deliveryCoast:
 *                   type: number
 *                   example: 0
 *                 deliveryAria:
 *                   type: string
 *                   example: USA
 *                 maxKgs:
 *                   type: number
 *                   example: 30
 *                 description:
 *                   type: string
 *                   example: Fresh Atlantic salmon fillets, perfect for grilling or baking.
 *                 detailDescription:
 *                   type: string
 *                   example: Our Atlantic salmon is sustainably sourced and rich in Omega-3 fatty acids. Ideal for a healthy diet.
 *                 rate:
 *                   type: number
 *                   example: 4.9
 *                 tax:
 *                   type: number
 *                   example: 8
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-01-04T14:00:00.000Z
 *                 createdBy:
 *                   type: string
 *                   example: Admin 2
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-01-04T14:00:00.000Z
 *                 updatedBy:
 *                   type: string
 *                   example: Admin2
 *                 id:
 *                   type: string
 *                   example: 67c56dfb652b8273b059139e
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found
 *                 message:
 *                   type: string
 *                   example: No product found with the specified ID. Please make sure the ID is correct.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 *                 message:
 *                   type: string
 *                   example: Something went wrong. Please try again later.
 */

/**
 * @swagger
 * /api/products/favorites:
 *   post:
 *     summary: Add product to favorites
 *     tags:
 *       - Product
 *     description: |
 *       Adds a product to the authenticated user's list of favorites.
 *       Requires a valid Bearer token.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 67c56dfb652b8273b059139e
 *     responses:
 *       200:
 *         description: Product successfully added to favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Added to favorites
 *       400:
 *         description: Product is already in favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product is in favorites
 *                 message:
 *                   type: string
 *                   example: This product is already in your favorites.
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found
 *                 message:
 *                   type: string
 *                   example: No product found with the specified ID.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 *                 message:
 *                   type: string
 *                   example: Something went wrong. Please try again later.
 */

/**
 * @swagger
 * /api/products/favorites:
 *   get:
 *     summary: Get user's favorite products
 *     tags:
 *       - Product
 *     description: |
 *       Returns a paginated list of products that the authenticated user has marked as favorites.
 *       Requires a valid Bearer token.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (default is 1)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page (default is 10)
 *     responses:
 *       200:
 *         description: Successfully retrieved list of favorite products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                   example: 42
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 pageSize:
 *                   type: integer
 *                   example: 10
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 *                 message:
 *                   type: string
 *                   example: Something went wrong. Please try again later.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Fresh Atlantic Salmon
 *         image:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - https://allfreshseafood.com/cdn/shop/files/2salmonfilletscanadian_1.jpg?v=1698852411
 *             - https://www.samuelsseafood.com/wp-content/uploads/2016/11/Wild-Isle-whole-and-side-fillet-1.jpg
 *             - https://m.media-amazon.com/images/I/817y+lN3ohL.jpg
 *         price:
 *           type: number
 *           example: 15.99
 *         SKU:
 *           type: number
 *           example: 10067890
 *         category:
 *           type: string
 *           example: MEATANDFISH
 *         subcategory:
 *           type: string
 *           example: FISH
 *         farm:
 *           type: string
 *           example: Northern Waters Fisheries
 *         stoke:
 *           type: string
 *           example: INSTOCK
 *         freshness:
 *           type: number
 *           example: 5
 *         buyBy:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - Weight
 *             - Piece
 *         deliveryDays:
 *           type: number
 *           example: 3
 *         deliveryCoast:
 *           type: number
 *           example: 0
 *         deliveryAria:
 *           type: string
 *           example: USA
 *         maxKgs:
 *           type: number
 *           example: 30
 *         description:
 *           type: string
 *           example: Fresh Atlantic salmon fillets, perfect for grilling or baking.
 *         detailDescription:
 *           type: string
 *           example: Our Atlantic salmon is sustainably sourced and rich in Omega-3 fatty acids. Ideal for a healthy diet.
 *         rate:
 *           type: number
 *           example: 4.9
 *         tax:
 *           type: number
 *           example: 8
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-01-04T14:00:00.000Z
 *         createdBy:
 *           type: string
 *           example: Admin 2
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-01-04T14:00:00.000Z
 *         updatedBy:
 *           type: string
 *           example: Admin2
 *         id:
 *           type: string
 *           example: 67c56dfb652b8273b059139e
 */

/**
 * @swagger
 * /api/products/favorites:
 *   delete:
 *     summary: Remove product from favorites
 *     tags:
 *       - Product
 *     description: |
 *       Removes a product from the authenticated user's favorites list.
 *       Requires a valid Bearer token and `productId` provided as a query parameter.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to remove from favorites.
 *     responses:
 *       200:
 *         description: Product successfully removed from favorites.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Removed from favorites
 *       400:
 *         description: Product is not in favorites.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product is not in favorites
 *                 message:
 *                   type: string
 *                   example: This product is not in your favorites.
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found
 *                 message:
 *                   type: string
 *                   example: No product found with the specified ID. Please make sure the ID is correct.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 *                 message:
 *                   type: string
 *                   example: Something went wrong. Please try again later.
 */
