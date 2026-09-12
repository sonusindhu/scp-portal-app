/**
 * @openapi
 * /api/inventory:
 *   get:
 *     tags: [Inventory]
 *     summary: List all inventory items
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventory items retrieved
 */

/**
 * @openapi
 * /api/inventory:
 *   post:
 *     tags: [Inventory]
 *     summary: Create an inventory item
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [trackingNumber, companyId]
 *             properties:
 *               trackingNumber:
 *                 type: string
 *               companyId:
 *                 type: integer
 *               type:
 *                 type: string
 *               deviceType:
 *                 type: string
 *               status:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Inventory created successfully
 */

/**
 * @openapi
 * /api/inventory/get:
 *   get:
 *     tags: [Inventory]
 *     summary: Legacy alias for listing inventory
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventory items retrieved
 */

/**
 * @openapi
 * /api/inventory/create:
 *   post:
 *     tags: [Inventory]
 *     summary: Legacy alias for creating an inventory item
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Inventory created successfully
 */

/**
 * @openapi
 * /api/inventory/delete-range:
 *   post:
 *     tags: [Inventory]
 *     summary: Legacy bulk delete alias for inventory records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventory records deleted successfully
 */
