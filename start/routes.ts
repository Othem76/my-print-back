import router from "@adonisjs/core/services/router";

const UserController = () => import("#controllers/user/userController");
const StlController = () => import("#controllers/stl/stlController");
const CostController = () => import("#controllers/cost/costController");

router.get("users", [UserController, "getAll"]);
router.get("users/:id", [UserController, "getUserById"]);
router.get("users/by-email", [UserController, "getUserByEmail"]);
router.post("users", [UserController, "create"]);
router.put("users", [UserController, "update"]);
router.delete("users/:id", [UserController, "delete"]);

router.post("uploadOne", [StlController, "uploadOne"]);
router.post("uploadMany", [StlController, "uploadMany"]);

router.post("getCosts", [CostController]);
