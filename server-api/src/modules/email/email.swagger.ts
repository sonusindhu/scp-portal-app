/**
 * @openapi
 * /api/email:
 *   get:
 *     tags: [Email]
 *     summary: Get all emails
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Email list fetched successfully
 *   post:
 *     tags: [Email]
 *     summary: Create an email
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               toEmail:
 *                 type: string
 *                 format: email
 *               fromEmail:
 *                 type: string
 *                 format: email
 *               isCritical:
 *                 type: boolean
 *               quoteId:
 *                 type: integer
 *               contactId:
 *                 type: integer
 *               companyId:
 *                 type: integer
 *               inventoryId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Email created successfully
 */

/**
 * @openapi
 * /api/email/list:
 *   post:
 *     tags: [Email]
 *     summary: Get paginated email list
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
 *         description: Email list fetched successfully
 */

/**
 * @openapi
 * /api/email/{id}:
 *   get:
 *     tags: [Email]
 *     summary: Get email by id
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
 *         description: Email fetched successfully
 *   put:
 *     tags: [Email]
 *     summary: Update email
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
 *               type:
 *                 type: string
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               toEmail:
 *                 type: string
 *                 format: email
 *               fromEmail:
 *                 type: string
 *                 format: email
 *               isCritical:
 *                 type: boolean
 *               quoteId:
 *                 type: integer
 *               contactId:
 *                 type: integer
 *               companyId:
 *                 type: integer
 *               inventoryId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Email updated successfully
 *   delete:
 *     tags: [Email]
 *     summary: Delete email
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
 *         description: Email deleted successfully
 */
