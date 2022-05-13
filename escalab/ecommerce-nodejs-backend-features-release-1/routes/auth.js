const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

/**
 * @swagger
 * schemes:
 *    - "https"
 *    - "http"
 * /create-or-update-user:
 *  post:
 *     tags:
 *       - Auth
 *     security:
 *       - firebase: []
 *         description: Create or Update User
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - name: authtoken
 *         in: header
 *         description: an authorization token JWT
 *     responses:
 *      "200":
 *         description: User Information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                       type: string
 *                       example: "mchamorro"
 *                   email:
 *                       type: string
 *                       example: "mchamorro@laescala.cl"
 *                   role:
 *                       type: string
 *                       example: "subscriber"
 *                   cart:
 *                       type: array
 *                       example: []
 *                   address:
 *                       type: string
 *                       example: "The Vulcans #123, Chillán"
 *                   wishlist:
 *                       type: array
 *                       example: []
 *      "401":
 *         description: Invalid or expired token
 *              
 */
router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
