import router from "@adonisjs/core/services/router";
import AutoSwagger from "adonis-autoswagger";
import swagger from "#config/swagger";
import { middleware } from './kernel.js'

const StlController = () => import("#controllers/stl/stlController");
const CostController = () => import("#controllers/cost/costController");
const AuthController = () => import("#controllers/auth_controller");

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

router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])
  // router.get('me', async ({ auth, response }) => {
  //   try {
  //     const user = auth.getUserOrFail()
  //     return response.ok(user)
  //   } catch (error) {
  //     return response.unauthorized({ error: 'User not found' })
  //   }
  // })
  // .use(middleware.auth())
  router.get('me', [AuthController, 'me']).use(middleware.auth())
  router.post('logout', [AuthController, 'logout']).use(middleware.auth())
}).prefix('user')

router.post("uploadOne", [StlController, "uploadOne"]);
router.post("uploadMany", [StlController, "uploadMany"]);

router.post("getCosts", [CostController]).use(middleware.auth());
