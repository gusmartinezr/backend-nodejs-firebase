import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import express from "express";

initializeApp();

import { AppRoutes } from "./presentation/routes/index";

const app = express();
app.use(AppRoutes.routes);

export const api = onRequest({ region: "us-central1" }, app);
