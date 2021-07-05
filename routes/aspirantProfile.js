const express = require("express");
const router = express.Router();

const {
  createAspirant,
  getAllAspirants,
  getSingleAspirant,
  recentAspirants,
  updateAspirant,
  deleteAspirant,
} = require("../controllers/aspirantProfile");

/**
 * @swagger
 * components:
 *   schemas:
 *     Aspirant:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - sex
 *         - profileImg
 *         - headerImg
 *         - hobbies
 *         - bio
 *         - manifesto
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the aspirant
 *         age:
 *           type: Integer
 *           description: The age of the aspirant
 *         sex:
 *           type: string
 *           description: The sex of the aspirant
 *         profileImg:
 *           type: String
 *           description: Aspirant profile image
 *         headerImg: 
 *           type: String
 *           description: Aspirant header image
 *         hobbies:
 *          type: String
 *          description: Aspirant hobbies
 *       example:
 *         name: John Doe
 *         age: 50
 *         sex: male
 *         profileImg: url
 *         headerImg: url
 *         hobbies: soccer
 *         bio: A politician
 *         manifesto: I promise to privide stable electricity
 */

 /**
  * @swagger
  * tags:
  *   name: Aspirants
  *   description: 9JAPOLL API Documentation V1.0.0
  */


 /**
 * @swagger
 * /api/v1/aspirant:
 *   post:
 *     summary: Create a new aspirant
 *     tags: [Aspirants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aspirant'
 *     responses:
 *       200:
 *         description: The aspirant was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aspirant'
 *       500:
 *         description: Some server error
 */
// Create article
router.post("/aspirant", createAspirant);


/**
 * @swagger
 * /api/v1/aspirants:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Aspirants]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aspirant'
 */
// Get all articles
router.get("/aspirants", getAllAspirants);

/**
 * @swagger
 * /api/v1/aspitant/{id}:
 *   get:
 *     summary: Get the aspirant by id
 *     tags: [Aspirants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The aspirant id
 *     responses:
 *       200:
 *         description: The aspirant description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aspirant'
 *       404:
 *         description: The user was not found
 */
// Get single article
router.get("/aspirant/:id", getSingleAspirant);

/**
 * @swagger
 * /api/v1/recentAspirants:
 *   get:
 *     summary: Returns the list of all newly registered aspirants
 *     tags: [Aspirants]
 *     responses:
 *       200:
 *         description: The list of new users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aspirant'
 */
// Get recent articles
router.get("/recentAspirants", recentAspirants);

/**
 * @swagger
 * /api/v1/aspirant/{id}:
 *  put:
 *    summary: Update the aspirant by the id
 *    tags: [Aspirants]
  *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The aspirant id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Aspirant'
 *          example:
 *            data:
 *              name: Mark Essien
 *              email: mark@gmail.com
 *           
 *    responses:
 *      200:
 *        description: The user was updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Aspirant'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */
// Update article
router.put("/aspirant/:id", updateAspirant);

/**
 * @swagger
 * /api/v1/aspirant/{id}:
 *   delete:
 *     summary: Delete a aspirant by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The aspirant id
 * 
 *     responses:
 *       200:
 *         description: The aspirant was deleted successfully
 *       404:
 *         description: The aspirant was not found
 */
// Delete article
router.delete("/aspirant/:id", deleteAspirant);

module.exports = router;
