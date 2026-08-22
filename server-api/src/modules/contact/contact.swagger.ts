/**
 * @openapi
 * /api/contact:
 *   get:
 *     tags: [Contact]
 *     summary: Get all contacts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contact list fetched successfully
 *   post:
 *     tags: [Contact]
 *     summary: Create a contact
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, companyId]
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               companyId:
 *                 type: integer
 *               status:
 *                 type: string
 *               department:
 *                 type: string
 *               jobTitle:
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
 *               birthDate:
 *                 type: string
 *               isDeleted:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @openapi
 * /api/contact/list:
 *   post:
 *     tags: [Contact]
 *     summary: Get paginated contact list
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
 *         description: Contact list fetched successfully
 */

/**
 * @openapi
 * /api/contact/{id}:
 *   get:
 *     tags: [Contact]
 *     summary: Get contact by id
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
 *         description: Contact fetched successfully
 *       404:
 *         description: Contact not found
 *   put:
 *     tags: [Contact]
 *     summary: Update contact
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               companyId:
 *                 type: integer
 *               status:
 *                 type: string
 *               department:
 *                 type: string
 *               jobTitle:
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
 *               birthDate:
 *                 type: string
 *               isDeleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       404:
 *         description: Contact not found
 *   delete:
 *     tags: [Contact]
 *     summary: Delete contact
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
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 */
