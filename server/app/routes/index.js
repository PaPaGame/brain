import Router from "koa-router";

const router = Router();
const loginRouter = require("../routes/user");
router.use("/api", loginRouter.routes(), loginRouter.allowedMethods());

export default router;