import router from "@adonisjs/core/services/router";

router.get("/getAllUsers", "#controllers/user/GetAllUsersController");
router.get("/getUserById/:id", "#controllers/user/GetUserByIdController");
router.get("/getUserByEmail", "#controllers/user/GetUserByEmailController");
router.post("/createUser", "#controllers/user/CreateUserController");
router.patch("/updateUser", "#controllers/user/UpdateUserController");
router.delete("/deleteUser/:id", "#controllers/user/DeleteUserController");
