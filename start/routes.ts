import router from "@adonisjs/core/services/router";
import AutoSwagger from "adonis-autoswagger";
import swagger from "#config/swagger";
import { middleware } from './kernel.js'

const StlController = () => import("#controllers/stl/stlController");
const CostController = () => import("#controllers/cost/costController");
const AuthController = () => import("#controllers/auth_controller");
const QuoteController = () => import("#controllers/quote/quoteController");
const PrinterController = () => import("#controllers/printer/printerController");
const MaterialController = () => import("#controllers/material/materialController");

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

router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])
  router.get('me', [AuthController, 'me']).use(middleware.auth())
  router.post('logout', [AuthController, 'logout']).use(middleware.auth())
}).prefix('user')

router.post("uploadMany", [StlController, "uploadMany"]).use(middleware.auth());

router.post("costs", [CostController]);
router.post("quotes/generate-quote", [QuoteController, "generateQuote"]);
router.post("quotes/send-quote", [QuoteController, "generateQuoteAndSendMail"]);

router.get("printers", [PrinterController, "getAllPrinters"]);
router.get("printers/:id", [PrinterController, "getPrinterById"]);
router.delete("printers/:id", [PrinterController, "deletePrinter"]);

router.get("materials", [MaterialController, "getAllMaterials"]);
router.get("materials/:id", [MaterialController, "getMaterialById"]);
router.post("materials", [MaterialController, "createMaterial"]);
router.put("materials/:id", [MaterialController, "updateMaterial"]);

router.delete("materials/:id", [MaterialController, "deleteMaterial"]);
