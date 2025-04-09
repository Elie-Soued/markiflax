#!/usr/bin/env node

import express from "express";
import routes from "./routes.mjs";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = new express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use("/", routes);

app.get("/", (_, res) => res.send("Hello World"));

app.listen(3000, () => console.log("Markiflex is running on port 3000"));
