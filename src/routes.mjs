import express from "express";
import {
  renderPage,
  renderLandingPage,
  prepareContent,
  renderSection,
} from "./controllers.mjs";

const router = express.Router();

router.get("/", renderLandingPage);
router.get("/favicon.ico", (_, res) => res.status(204).end());
router.get("/:section", prepareContent, renderSection);
router.get("/:section/:page", prepareContent, renderPage);

export default router;
