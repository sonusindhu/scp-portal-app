/**
 * @openapi
 * /api/task:
 *   get:
 *     tags: [Task]
 *     summary: Get all tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task list fetched successfully
 *   post:
 *     tags: [Task]
 *     summary: Create a task
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
 *               subject:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               dueDateTime:
 *                 type: string
 *                 format: date-time
 *               reminderDateTime:
 *                 type: string
 *                 format: date-time
 *               category:
 *                 type: string
 *               status:
 *                 type: string
 *               assignedTo:
 *                 type: integer
 *               pointOfContact:
 *                 type: integer
 *               quoteId:
 *                 type: integer
 *               companyId:
 *                 type: integer
 *               inventoryId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Task created successfully
 */

/**
 * @openapi
 * /api/task/list:
 *   post:
 *     tags: [Task]
 *     summary: Get paginated task list
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
 *         description: Task list fetched successfully
 */

/**
 * @openapi
 * /api/task/{id}:
 *   get:
 *     tags: [Task]
 *     summary: Get task by id
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
 *         description: Task fetched successfully
 *   put:
 *     tags: [Task]
 *     summary: Update task
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
 *               subject:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               dueDateTime:
 *                 type: string
 *                 format: date-time
 *               reminderDateTime:
 *                 type: string
 *                 format: date-time
 *               category:
 *                 type: string
 *               status:
 *                 type: string
 *               assignedTo:
 *                 type: integer
 *               pointOfContact:
 *                 type: integer
 *               quoteId:
 *                 type: integer
 *               companyId:
 *                 type: integer
 *               inventoryId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Task updated successfully
 *   delete:
 *     tags: [Task]
 *     summary: Delete task
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
 *         description: Task deleted successfully
 */
