"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreDatabase = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
class FirestoreDatabase {
    static connect(_a) {
        return __awaiter(this, arguments, void 0, function* ({ serviceAccountPath }) {
            console.log("Entrando a FirestoreDatabase.connect", serviceAccountPath);
            if (this.db)
                return this.db;
            const abs = (0, path_1.resolve)(process.cwd(), serviceAccountPath);
            const raw = (0, fs_1.readFileSync)(abs, "utf8");
            const sa = JSON.parse(raw);
            const app = (0, app_1.getApps)().length ? (0, app_1.getApp)() : (0, app_1.initializeApp)({ credential: (0, app_1.cert)(sa) });
            this.app = app;
            this.db = (0, firestore_1.getFirestore)(app);
            console.log("Firestore connected successfully");
            return this.db;
        });
    }
    static dbInstance() {
        if (!this.db)
            throw new Error("Firestore not initialized. Call connect() first.");
        return this.db;
    }
}
exports.FirestoreDatabase = FirestoreDatabase;
FirestoreDatabase.app = null;
FirestoreDatabase.db = null;
