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
  landingPagePicture_src,
  backbuttonimage_src,
  show_table_of_content,
  show_footer,
  show_paragraph,
  show_title,
  show_undertitle,
  show_landingpagepicture,
  show_backbutton,
} = config;

const renderPage = async (req, res) => {
  const name = req.params.page;
  const section = req.section;
  const mdFile = req.routes[name];
  const userAgent = req.headers["user-agent"] || "";

  if (mdFile) {
    const fullPath = path.join(`${process.cwd()}/content/${section}`, mdFile);

    try {
      const content = await fs.readFile(fullPath, "utf8");

      if (userAgent.toLowerCase().includes("curl")) {
        res.type("text/plain").send(content);
      } else {
        res.render("markdown", {
          content,
          section,
          backbuttonimage_src,
          show_backbutton,
        });
      }
    } catch (err) {
      console.error("Error reading Markdown file:", err);
      res.status(500).sendFile(path.join(__dirname, "/html/500error.html"));
    }
  } else {
    res.status(404).sendFile(path.join(__dirname, "/html/404error.html"));
  }
};

const renderLandingPage = async (_, res) => {
  const path = `${cwd}/content`;
  let content;

  try {
    content = await fs.readdir(path);
  } catch (err) {
    console.error("Error reading directory:", err);
  }

  res.render("index", {
    title,
    undertitle,
    paragraph,
    footer,
    show_table_of_content,
    show_footer,
    show_paragraph,
    show_title,
    show_undertitle,
    content,
    show_landingpagepicture,
    landingPagePicture_src,
  });
};

const renderSection = (req, res) => {
  const routes = Object.keys(req.routes);
  const section = req.section;
  const userAgent = req.headers["user-agent"] || "";

  const offset = req.offset || paginationOffsetConfig;

  if (userAgent.toLowerCase().includes("curl")) {
    res.render("tableofcontent", { routes });
  } else {
    res.render("section", {
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
      section,
      backbuttonimage_src,
      show_backbutton,
    });
  }
};

const prepareContent = async (req, _, next) => {
  const sectionName = req.params.section;

  let routes = {};

  try {
    const files = await fs.readdir(`${cwd}/content/${sectionName}`);

    files.forEach((file) => {
      const [title, extension] = file?.split(".");
      if (extension === "md") {
        routes[title] = `${file}`;
      }
    });
  } catch (err) {
    console.error("Error reading directory:", err);
  }

  req.section = sectionName;
  req.routes = routes;
  req.offset = Number(req.url?.split("=")[1]);
  next();
};

export { renderPage, renderLandingPage, prepareContent, renderSection };
