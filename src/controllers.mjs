import fs from "fs/promises";
import { readFileSync } from "fs";
import path from "path";

const cwd = process.cwd();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const config = JSON.parse(readFileSync(`${cwd}/config.json`, "utf-8"));

const {
  title,
  undertitle,
  paragraph,
  paginationOffsetConfig,
  paginationlimitConfig,
  footer,
  show_table_of_content,
  show_footer,
  show_paragraph,
  show_title,
  show_undertitle,
} = config;

const renderMarkdown = async (req, res) => {
  const name = req.params.name;
  const mdFile = req.routes[name];
  const userAgent = req.headers["user-agent"] || "";

  if (mdFile) {
    const fullPath = path.join(process.cwd(), mdFile);

    try {
      const content = await fs.readFile(fullPath, "utf8");

      if (userAgent.toLowerCase().includes("curl")) {
        res.type("text/plain").send(content);
      } else {
        res.render("markdown", { content });
      }
    } catch (err) {
      console.error("Error reading Markdown file:", err);
      res.status(500).sendFile(path.join(__dirname, "/html/500error.html"));
    }
  } else {
    res.status(404).sendFile(path.join(__dirname, "/html/404error.html"));
  }
};

const renderLandingPage = (req, res) => {
  const routes = Object.keys(req.routes);
  const userAgent = req.headers["user-agent"] || "";

  const offset = req.offset || paginationOffsetConfig;

  if (userAgent.toLowerCase().includes("curl")) {
    res.render("tableofcontent", { routes });
  } else {
    res.render("index", {
      routes,
      offset,
      limit: paginationlimitConfig,
      title,
      undertitle,
      paragraph,
      footer,
      show_table_of_content,
      show_footer,
      show_paragraph,
      show_title,
      show_undertitle,
    });
  }
};

const createRoute = async (req, _, next) => {
  let routes = {};

  try {
    const files = await fs.readdir(cwd);

    files.forEach((file) => {
      const [name, extension] = file.split(".");
      if (extension === "md" && name !== "readme") {
        routes[name] = `${file}`;
      }
    });
  } catch (err) {
    console.error("Error reading directory:", err);
  }

  req.routes = routes;
  req.offset = Number(req.url?.split("=")[1]);
  next();
};

export { renderMarkdown, renderLandingPage, createRoute };
