/**
 * @openapi
 * /api/note:
 *   get:
 *     tags: [Note]
 *     summary: Get all notes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Note list fetched successfully
 *   post:
 *     tags: [Note]
 *     summary: Create a note
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
 *         description: Note created successfully
 */

/**
 * @openapi
 * /api/note/list:
 *   post:
 *     tags: [Note]
 *     summary: Get paginated note list
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
 *         description: Note list fetched successfully
 */

/**
 * @openapi
 * /api/note/{id}:
 *   get:
 *     tags: [Note]
 *     summary: Get note by id
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
 *         description: Note fetched successfully
 *   put:
 *     tags: [Note]
 *     summary: Update note
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
 *         description: Note updated successfully
 *   delete:
 *     tags: [Note]
 *     summary: Delete note
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
 *         description: Note deleted successfully
 */
