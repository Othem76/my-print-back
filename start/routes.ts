import router from "@adonisjs/core/services/router";
import GetAllUsersController from "#controllers/user/getAllUsersController";
import GetUserByIdController from "#controllers/user/getUserByIdController";
import GetUserByEmailController from "#controllers/user/getUserByEmailController";
import CreateUserController from "#controllers/user/createUserController";
import UpdateUserController from "#controllers/user/updateUserController";
import DeleteUserController from "#controllers/user/deleteUserController";

router.get("/getAllUsers", [GetAllUsersController]);
router.get("/getUserById/:id", [GetUserByIdController]);
router.get("/getUserByEmail", [GetUserByEmailController]);
router.post("/createUser", [CreateUserController]);
router.patch("/updateUser", [UpdateUserController]);
router.delete("/deleteUser/:id", [DeleteUserController]);
