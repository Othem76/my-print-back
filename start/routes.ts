import router from "@adonisjs/core/services/router";

router.get("users", [UserController, "getAll"]);
router.get("users/:id", [UserController, "getUserById"]);
router.get("users/by-email", [UserController, "getUserByEmail"]);
router.post("users", [UserController, "create"]);
router.put("users", [UserController, "update"]);
router.delete("users/:id", [UserController, "delete"]);

const StlController = () => import("#controllers/stl/stlController");
const UserController = () => import("#controllers/user/userController");

router.post("uploadOne", [StlController, "uploadOne"]);
router.post("uploadMany", [StlController, "uploadMany"]);

const CostController = () => import("#controllers/cost/costController");
router.post("getCosts", [CostController]);
