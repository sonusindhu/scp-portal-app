/**
 * @openapi
 * /api/quote:
 *   get:
 *     tags: [Quote]
 *     summary: Get all quotes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quote list fetched successfully
 *   post:
 *     tags: [Quote]
 *     summary: Create a quote
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quoteNumber:
 *                 type: string
 *               name:
 *                 type: string
 *               service:
 *                 type: string
 *               transportMode:
 *                 type: string
 *               status:
 *                 type: string
 *               totalCost:
 *                 type: number
 *               totalProfit:
 *                 type: number
 *               expiryDate:
 *                 type: string
 *                 format: date-time
 *               totalMiles:
 *                 type: number
 *               companyId:
 *                 type: integer
 *               contactId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Quote created successfully
 */

/**
 * @openapi
 * /api/quote/list:
 *   post:
 *     tags: [Quote]
 *     summary: Get paginated quote list
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skip:
 *                 type: integer
 *                 minimum: 0
 *               take:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 100
 *               orderBy:
 *                 type: string
 *               sortDirection:
 *                 type: string
 *                 enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Quote list fetched successfully
 */

/**
 * @openapi
 * /api/quote/{id}:
 *   get:
 *     tags: [Quote]
 *     summary: Get quote by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quote fetched successfully
 *   put:
 *     tags: [Quote]
 *     summary: Update quote
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quoteNumber:
 *                 type: string
 *               name:
 *                 type: string
 *               service:
 *                 type: string
 *               transportMode:
 *                 type: string
 *               status:
 *                 type: string
 *               totalCost:
 *                 type: number
 *               totalProfit:
 *                 type: number
 *               expiryDate:
 *                 type: string
 *                 format: date-time
 *               totalMiles:
 *                 type: number
 *               companyId:
 *                 type: integer
 *               contactId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Quote updated successfully
 *   delete:
 *     tags: [Quote]
 *     summary: Delete quote
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quote deleted successfully
 */

/**
 * @openapi
 * /api/quote/getCompanies:
 *   get:
 *     tags: [Quote]
 *     summary: Legacy quote lookup for company options
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company lookup successful
 */

/**
 * @openapi
 * /api/quote/getContactsByCompany/{id}:
 *   get:
 *     tags: [Quote]
 *     summary: Legacy quote lookup for contacts by company id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contacts lookup successful
 */

/**
 * @openapi
 * /api/quote/getQuoteDetails/{id}:
 *   get:
 *     tags: [Quote]
 *     summary: Legacy quote details lookup
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quote detail lookup successful
 */

/**
 * @openapi
 * /api/quote/delete-range:
 *   post:
 *     tags: [Quote]
 *     summary: Legacy bulk delete alias for quote records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quote records deleted successfully
 */
