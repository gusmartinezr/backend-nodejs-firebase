"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./presentation/routes");
const firebase_database_1 = require("./data/firebase/firebase-database");
const envs_1 = require("./config/envs");
// Inicializa Firestore (sin await, Cloud Functions permite sync)
firebase_database_1.FirestoreDatabase.connect({
    serviceAccountPath: envs_1.envs.FIREBASE_SERVICE_ACCOUNT_PATH,
});
const app = (0, express_1.default)();
app.use(routes_1.AppRoutes.routes);
exports.default = app;
