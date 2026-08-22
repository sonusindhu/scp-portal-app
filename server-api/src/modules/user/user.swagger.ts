/**
 * @openapi
 * /api/user/detail:
 *   get:
 *     tags: [User]
 *     summary: Get current user details
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User detail fetched successfully
 */

/**
 * @openapi
 * /api/user/update:
 *   post:
 *     tags: [User]
 *     summary: Update current user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               fullName:
 *                 type: string
 *               jobTitle:
 *                 type: string
 *               department:
 *                 type: string
 *               location:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               extension:
 *                 type: string
 *               userImage:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 */

/**
 * @openapi
 * /api/user/updatePassword:
 *   post:
 *     tags: [User]
 *     summary: Update current user password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currentPassword, password, confirmPassword]
 *             properties:
 *               currentPassword:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 */

/**
 * @openapi
 * /api/user/uploadProfileImage:
 *   post:
 *     tags: [User]
 *     summary: Upload current user profile image
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [preview]
 *             properties:
 *               preview:
 *                 type: string
 *                 description: Base64 image data URL
 *     responses:
 *       200:
 *         description: User profile image uploaded successfully
 */
