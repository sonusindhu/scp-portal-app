/**
 * @openapi
 * /api/company/list-of-names:
 *   get:
 *     tags: [Company]
 *     summary: Get company names list
 *     responses:
 *       200:
 *         description: Company names fetched successfully
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
 * /api/company:
 *   get:
 *     tags: [Company]
 *     summary: Get all companies
 *     responses:
 *       200:
 *         description: Company list fetched successfully
 *   post:
 *     tags: [Company]
 *     summary: Create a company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               type:
 *                 type: string
 *               status:
 *                 type: string
 *               phone:
 *                 type: string
 *               extension:
 *                 type: string
 *               address1:
 *                 type: string
 *               address2:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipcode:
 *                 type: string
 *               country:
 *                 type: string
 *               employeesCount:
 *                 type: integer
 *               revenue:
 *                 type: integer
 *               mainContactId:
 *                 type: integer
 *               createdBy:
 *                 type: integer
 *               updatedBy:
 *                 type: integer
 *               isDeleted:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Company created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @openapi
 * /api/company/list:
 *   post:
 *     tags: [Company]
 *     summary: Get paginated company list
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
 *         description: Company list fetched successfully
 */

/**
 * @openapi
 * /api/company/{id}:
 *   get:
 *     tags: [Company]
 *     summary: Get company by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company fetched successfully
 *       404:
 *         description: Company not found
 *   put:
 *     tags: [Company]
 *     summary: Update company
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               type:
 *                 type: string
 *               status:
 *                 type: string
 *               phone:
 *                 type: string
 *               extension:
 *                 type: string
 *               address1:
 *                 type: string
 *               address2:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipcode:
 *                 type: string
 *               country:
 *                 type: string
 *               employeesCount:
 *                 type: integer
 *               revenue:
 *                 type: integer
 *               mainContactId:
 *                 type: integer
 *               createdBy:
 *                 type: integer
 *               updatedBy:
 *                 type: integer
 *               isDeleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       404:
 *         description: Company not found
 *   delete:
 *     tags: [Company]
 *     summary: Delete company
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company deleted successfully
 *       404:
 *         description: Company not found
 */
