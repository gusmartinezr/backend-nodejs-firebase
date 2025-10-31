import path from "path";
import admin, { credential } from 'firebase-admin';

interface Options {
    serviceAccountPath: string;
}

export class FirestoreDatabase {
    static async connect(options: Options) {
        try {

            const serviceAccountPath = path.resolve(options.serviceAccountPath);
            const serviceAccount = require(serviceAccountPath);

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });

            console.log("Firestore connected successfully");
            return admin.firestore();
        } catch (error) {
            console.error("Error connecting to Firestore:", error);
            throw error;
        }
    }
}
