import router from "@adonisjs/core/services/router";
import AutoSwagger from "adonis-autoswagger";
import swagger from "#config/swagger";

const UserController = () => import("#controllers/user/userController");
const StlController = () => import("#controllers/stl/stlController");
const CostController = () => import("#controllers/cost/costController");
const QuoteController = () => import("#controllers/quote/quoteController");

// To get swagger in YAML
router.get("/swagger", async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger);
});

// Renders Swagger-UI and passes YAML-output of /swagger
router.get("/", async () => {
  // Choose your favorite Swagger-UI renderer

  return AutoSwagger.default.ui("/swagger");
  //return AutoSwagger.default.scalar("/swagger");
  //return AutoSwagger.default.rapidoc("/swagger", "view");
});

router.get("users", [UserController, "getAll"]);
router.get("users/:id", [UserController, "getUserById"]);
router.get("users/by-email", [UserController, "getUserByEmail"]);
router.post("users", [UserController, "create"]);
router.put("users", [UserController, "update"]);
router.delete("users/:id", [UserController, "delete"]);

router.post("uploadOne", [StlController, "uploadOne"]);
router.post("uploadMany", [StlController, "uploadMany"]);

router.post("costs", [CostController]);
router.post("quotes/generate-pdf", [QuoteController, "generatePdf"]);
