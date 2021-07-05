const express = require("express");
const router = express.Router();

const {
  createArticle,
  getAllArticles,
  getSingleArticle,
  recentArticles,
  updateArticle,
  deleteArticle,
} = require("../controllers/article");

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - headerImg
 *         - description
 *         - body
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the article
 *         title:
 *           type: string
 *           description: The title of the article
 *         author:
 *           type: String
 *           description: The author of the article
 *         headerImg: 
 *           type: String
 *           description: Article header image
 *         description:
 *          type: String
 *          description: Description of the article
 *         body:
 *          type: String
 *          description: The body of the article        
 *       example:
 *         title: Local Politics
 *         author: Donald Duke
 *         headerImg: url
 *         description: How local politics plays out
 *         body: A dirty politics
 */

 /**
  * @swagger
  * tags:
  *   name: Article
  *   description: 9JAPOLL API Documentation V1.0.0
  */


  /**
 * @swagger
 * /api/v1/articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Article]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: The article is successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       500:
 *         description: Some server error
 */
// Create article
router.post("/articles", createArticle);


/**
 * @swagger
 * /api/v1/articles:
 *   get:
 *     summary: Returns the list of all the articles
 *     tags: [Article]
 *     responses:
 *       200:
 *         description: The list of the articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aspirant'
 */
// Get all articles
router.get("/articles", getAllArticles);


/**
 * @swagger
 * /api/v1/article/{id}:
 *   get:
 *     summary: Get the article by id
 *     tags: [Article]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The article id
 *     responses:
 *       200:
 *         description: The article description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: The article was not found
 */
// Get single article
router.get("/article/:id", getSingleArticle);


/**
 * @swagger
 * /api/v1/recentArticles:
 *   get:
 *     summary: Returns the list of all newly created articles
 *     tags: [Article]
 *     responses:
 *       200:
 *         description: The list of new articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
// Get recent articles
router.get("/recentArticles", recentArticles);


/**
 * @swagger
 * /api/v1/article/{id}:
 *  put:
 *    summary: Update the article by the id
 *    tags: [Article]
  *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The article id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Article'
 *          example:
 *            data:
 *              title: The legacies of Tinubu
 *           
 *    responses:
 *      200:
 *        description: The article was updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Article'
 *      404:
 *        description: The artical was not found
 *      500:
 *        description: Some error happened
 */
// Update article
router.put("/article/:id", updateArticle);

/**
 * @swagger
 * /api/v1/article/{id}:
 *   delete:
 *     summary: Delete an article by id
 *     tags: [Article]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The article id
 * 
 *     responses:
 *       200:
 *         description: The article was deleted successfully
 *       404:
 *         description: The article was not found
 */
// Delete article
router.delete("/article/:id", deleteArticle);

module.exports = router;
