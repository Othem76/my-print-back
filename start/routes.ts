import router from "@adonisjs/core/services/router";
import AutoSwagger from "adonis-autoswagger";
import swagger from "#config/swagger";
import { middleware } from "./kernel.js";

const UserController = () => import("#controllers/user/userController");
const StlController = () => import("#controllers/stl/stlController");
const CostController = () => import("#controllers/cost/costController");

// To get swagger in YAML
router.get("/swagger", async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger);
});

// Renders Swagger-UI and passes YAML-output of /swagger
router.get("/docs", async () => {
  // Choose your favorite Swagger-UI renderer
  
  return AutoSwagger.default.ui("/swagger", swagger);
  // return AutoSwagger.default.scalar("/swagger");
  // return AutoSwagger.default.rapidoc("/swagger", "view");
});

router.get("users", [UserController, "getAll"]);
router.get("users/:id", [UserController, "getUserById"]);
router.get("users/by-email", [UserController, "getUserByEmail"]);
router.post("users", [UserController, "create"]);
router.put("users", [UserController, "update"]);
router.delete("users/:id", [UserController, "delete"]);

router.post("auth", async ({ auth }) => {
  console.log(auth.user) // User
  console.log(auth.authenticatedViaGuard) // 'api'
  console.log(auth.user!.currentAccessToken) // AccessToken
})
.use(middleware.auth({
  guards: [ 'api' ],
}));

router.post("uploadOne", [StlController, "uploadOne"]);
router.post("uploadMany", [StlController, "uploadMany"]);

router.post("getCosts", [CostController]);
