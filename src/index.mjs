#!/usr/bin/env node

import express from "express";
import routes from "./routes.mjs";
import path from "path";
import { readFileSync } from "fs";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const cwd = process.cwd();
const config = JSON.parse(readFileSync(`${cwd}/config.json`, "utf-8"));

const { port } = config;

const app = new express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use("/", routes);

app.get("/", (_, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Markiflax is running on port ${port}`));
