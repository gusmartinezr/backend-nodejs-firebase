import express from "express";
import { AppRoutes } from "./presentation/routes";
import { FirestoreDatabase } from "./data/firebase/firebase-database";
import { envs } from "./config/envs";
import "dotenv/config"; 

// Inicializa Firestore (sin await, Cloud Functions permite sync)
FirestoreDatabase.connect({
  serviceAccountPath: envs.FIREBASE_SERVICE_ACCOUNT_PATH,
});

const app = express();
app.use(AppRoutes.routes);

export default app;