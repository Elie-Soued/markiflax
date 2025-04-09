import express from "express";
import {
  renderMarkdown,
  renderLandingPage,
  createRoute,
} from "./controllers.mjs";

const router = express.Router();

router.get("/", createRoute, renderLandingPage);
router.get("/:name", createRoute, renderMarkdown);

export default router;
