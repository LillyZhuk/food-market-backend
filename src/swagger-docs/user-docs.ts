/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get current authenticated user
 *     tags:
 *       - User
 *     description: |
 *       Returns the currently authenticated user's profile.
 *       Requires a valid Bearer token in the Authorization header.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved current user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   example: Alice
 *                 lastName:
 *                   type: string
 *                   example: Wu-Gulliver
 *                 username:
 *                   type: string
 *                   example: alice_Wu
 *                 email:
 *                   type: string
 *                   example: user@gmail.com
 *                 phoneNumber:
 *                   type: string
 *                   example: "1234567891234"
 *                 role:
 *                   type: string
 *                   example: user
 *                 newsletterConsent:
 *                   type: boolean
 *                   example: false
 *                 id:
 *                   type: string
 *                   example: 67337a8a7ec8440c968b1cbd
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthorized – user is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 */

/**
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Update current user's profile
 *     tags:
 *       - User
 *     description: |
 *       Allows an authenticated user to update their profile information.
 *       Only the logged-in user can update their own data.
 *       Admins cannot update any users' data (even their own).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - firstName
 *               - lastName
 *               - username
 *               - email
 *               - phoneNumber
 *             properties:
 *               id:
 *                 type: string
 *                 example: 67337a8a7ec8440c968b1cbd
 *               firstName:
 *                 type: string
 *                 example: Alice
 *               lastName:
 *                 type: string
 *                 example: Wu-Gulliver
 *               username:
 *                 type: string
 *                 example: alice_Wu
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@gmail.com
 *               phoneNumber:
 *                 type: string
 *                 example: "1234567891234"
 *               newsletterConsent:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *       400:
 *         description: Duplicate field value or validation error.
 *         content:
 *           application/json:
 *             examples:
 *               DuplicateUsername:
 *                 summary: Username already exists
 *                 value: { "error": "username already in use" }
 *               DuplicateEmail:
 *                 summary: Email already exists
 *                 value: { "error": "email already in use" }
 *       401:
 *         description: Unauthorized – user is not logged in or is not the owner of the profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error or validation failure
 *         content:
 *           application/json:
 *             examples:
 *               ValidationError:
 *                 summary: Mongoose validation error
 *                 value: { "error": "First name is required" }
 *               UnknownError:
 *                 summary: Generic error
 *                 value: { "error": "Something went wrong" }
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - User
 *     description: |
 *       Returns a user by ID. Requires authentication.
 *       Admin users can only retrieve their own data, but not other admins.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User found and returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   example: Alice
 *                 lastName:
 *                   type: string
 *                   example: Wu-Gulliver
 *                 username:
 *                   type: string
 *                   example: alice_Wu
 *                 email:
 *                   type: string
 *                   example: user@gmail.com
 *                 phoneNumber:
 *                   type: string
 *                   example: "1234567891234"
 *                 role:
 *                   type: string
 *                   example: user
 *                 newsletterConsent:
 *                   type: boolean
 *                   example: false
 *                 id:
 *                   type: string
 *                   example: 67337b2292aeec0c7b2fb8a9
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       403:
 *         description: Access denied – trying to access another admin's profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access denied
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Something went wrong
 */

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Delete current authenticated user (not finished yet)
 *     tags:
 *       - User
 *     description: |
 *       Deletes the currently authenticated user from the system.
 *       Requires a valid Bearer token. The user is determined based on the token payload.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       401:
 *         description: Unauthorized – missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error during deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Something went wrong
 */
