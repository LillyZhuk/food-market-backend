/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate a user
 *     tags:
 *       - Auth
 *     description: |
 *       Authenticate a user with their email and password.
 *       If the credentials are valid, the endpoint returns the user object (excluding the password) and a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: K(75ie%Y
 *     responses:
 *       201:
 *         description: User successfully authenticated.
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
 *         description: Incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Incorrect password
 *                 message:
 *                   type: string
 *                   example: The password you entered is incorrect
 *       422:
 *         description: Incorrect email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Incorrect email
 *                 message:
 *                   type: string
 *                   example: No account found with the provided email
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
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     description: |
 *       Register a new user in the system. All users are assigned the `user` role by default.
 *       Administrators must be created manually.
 *       On successful registration, the endpoint returns the user’s information (excluding the password) and a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - username
 *               - email
 *               - phoneNumber
 *               - password
 *               - repeatedPassword
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Alice
 *               lastName:
 *                 type: string
 *                 example: Smith
 *               username:
 *                 type: string
 *                 example: alice_Smith
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@gmail.com
 *               phoneNumber:
 *                 type: string
 *                 example: "1234567891234"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: K(75ie%Y
 *               repeatedPassword:
 *                 type: string
 *                 format: password
 *                 example: K(75ie%Y
 *               newsletterConsent:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 12345
 *                 firstName:
 *                   type: string
 *                   example: Alice
 *                 lastName:
 *                   type: string
 *                   example: Smith
 *                 username:
 *                   type: string
 *                   example: alice_Smith
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
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Validation or duplication error
 *         content:
 *           application/json:
 *             examples:
 *               PasswordMismatch:
 *                 summary: Passwords do not match
 *                 value:
 *                   error: Passwords do not match
 *                   message: Password and repeated password do not match
 *               EmailExists:
 *                 summary: Email already in use
 *                 value:
 *                   error: Email already in use
 *                   message: This email is already associated with an existing account
 *               UsernameExists:
 *                 summary: Username already in use
 *                 value:
 *                   error: Username already in use
 *                   message: This username is already taken
 *               DuplicateKey:
 *                 summary: Duplicate key (e.g., email or phoneNumber)
 *                 value:
 *                   error: Duplicate key error
 *                   message: email already in use
 *       500:
 *         description: Internal server or validation error
 *         content:
 *           application/json:
 *             examples:
 *               ValidationError:
 *                 summary: Mongoose validation error
 *                 value:
 *                   error: Validation error
 *                   message: First name is required
 *               ServerError:
 *                 summary: Unknown server error
 *                 value:
 *                   error: Internal server error
 *                   message: Something went wrong. Please try again later.
 */

/**
 * @swagger
 * /api/auth/check-user:
 *   get:
 *     summary: Check if user exists by email
 *     tags:
 *       - Auth
 *     description: |
 *       Checks if a user with the provided email exists in the system.
 *       Used typically before password reset to validate that the account exists.
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: The email of the user to check.
 *     responses:
 *       204:
 *         description: User exists (no content returned).
 *       400:
 *         description: Email not provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email is required
 *                 message:
 *                   type: string
 *                   example: Email is required
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *                 message:
 *                   type: string
 *                   example: No user found with the provided email
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

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags:
 *       - Auth
 *     description: |
 *       Resets the password for the user with the provided email.
 *       Requires `email` and `newPassword` in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@gmail.com
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: ;&4LuubU46
 *     responses:
 *       204:
 *         description: Password reset successfully (no content returned).
 *       400:
 *         description: Missing email or newPassword.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Fields are required
 *                 message:
 *                   type: string
 *                   example: Email and new password are required
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *                 message:
 *                   type: string
 *                   example: No user found with the provided email
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
