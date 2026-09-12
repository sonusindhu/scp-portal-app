/**
 * @openapi
 * /api/common/equipments:
 *   get:
 *     tags: [Common]
 *     summary: Get equipment options
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Equipment list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 */

/**
 * @openapi
 * /api/common/cargos:
 *   get:
 *     tags: [Common]
 *     summary: Get cargo type options
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cargo type list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 */

/**
 * @openapi
 * /api/common/commodities:
 *   get:
 *     tags: [Common]
 *     summary: Get commodity options
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Commodity list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 */
