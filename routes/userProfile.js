const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  recentUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userprofile.js");


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
 *         username: johndoe
 */

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: 9JAPOLL API Documentation V1.0.0
  */

 /**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
// GET request to /users to fetch all users
router.get("/users", getAllUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.get("/users/:id", getSingleUser);

 /**
 * @swagger
 * /api/v1/newusers:
 *   get:
 *     summary: Returns the list of all newly registered users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of new users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
// GET request to /users to fetch all users
router.get("/users/newusers", recentUsers);


/**
 * @swagger
 * /api/v1/users/{id}:
 *  patch:
 *    summary: Update the user by the id
 *    tags: [Users]
  *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *          example:
 *            data:
 *              firstname: Mark
 *              lastname: Essien
 *              email: mark@gmail.com
 *           
 *    responses:
 *      200:
 *        description: The user was updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

// PUT request to /users/:id to update one user
router.patch("/users/:id", updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 * 
 *     responses:
 *       200:
 *         description: The user was deleted successfully
 *       404:
 *         description: The user was not found
 */
// DELETE request to /users/:id to delete a user
router.delete("/users/:id", deleteUser);

module.exports = router;

