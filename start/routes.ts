import router from "@adonisjs/core/services/router";

const StlController = () => import("#controllers/stl/stlController");
const UserController = () => import("#controllers/user/userController");

router.get('getAllUsers', [UserController, 'getAll'])
router.get('getUserById/:id', [UserController, 'getUserById'])
router.get('getUserByEmail', [UserController, 'getUserByEmail'])
router.post('createUser', [UserController, 'create'])
router.patch('updateUser', [UserController, 'update'])
router.delete('deleteUser/:id', [UserController, 'delete'])

// STL upload routes
router.post('uploadOne', [StlController, 'uploadOne'])
router.post('uploadMany', [StlController, 'uploadMany'])