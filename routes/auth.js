const express = require("express");
const router = express.Router();

const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - username
 *         - gender
 *         - profileImg
 *         - headerImg
 *         - educationArray
 *         - hobbiesArray
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstname:
 *           type: string
 *           description: The firstname of the user
 *         lastname:
 *           type: String
 *           description: The lastname of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         gender:
 *           type: ENUM
 *           description: Male or female
 *         profileImg:
 *           type: String
 *           description: User profile image
 *         headerImg: 
 *           type: String
 *           description: User header image
 *         education:
 *           type: Array
 *           description: Array list of educations
 *         hobby:
 *          type: hobbiesArray
 *          description: Array List of hobbies
 *       example:
 *         firstname: John
 *         lastname: Doe
 *         email: johndoe@gmail.com
 *         password: 12345678
 */

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: 9JAPOLL API Documentation V1.0.0
  */


// Signup
/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
// POST request to /users to create a new user
router.post("/signup", signUp);


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             data:
 *              email: johndoe@gmail.com
 *              password: 12345678
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *        description:  invalid Username or Password
 *       500:
 *         description: Some server error
 */
router.post("/login", login);

/**
 * @swagger
 * /api/v1/auth/forgotpassword:
 *   post:
 *     summary: Password change request
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             data:
 *              email: johndoe@gmail.com
 *     responses:
 *       200:
 *         description: Password request url sent to your email address
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *        description:  Email address not found
 *       500:
 *         description: Some server error
 */
router.post("/forgotpassword", forgotPassword);

/**
 * @swagger
 * /api/v1/auth/resetpassword:
 *   patch:
 *     summary: Password reset url, newpassword, newpasswordconfirm
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             data:
 *              password: 12345678
 *              passwordConfirm: 12345678
 *     responses:
 *       200:
 *         description: Password request url sent to your email address
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *        description:  Email address not found
 *       500:
 *         description: Some server error
 */
router.patch("/resetPassword/:token", resetPassword);

module.exports = router;

