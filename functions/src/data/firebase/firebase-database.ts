import { readFileSync } from "fs";
import { resolve } from "path";
import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

type Opts = { serviceAccountPath: string };

export class FirestoreDatabase {
  private static db: Firestore | null = null;

  static async connect({ serviceAccountPath }: Opts): Promise<Firestore> {
    console.log("Entrando a FirestoreDatabase.connect", serviceAccountPath);

    if (this.db) return this.db;

    const abs = resolve(process.cwd(), serviceAccountPath);
    const raw = readFileSync(abs, "utf8");
    const sa = JSON.parse(raw);

    const app = getApps().length ? getApp() : initializeApp({ credential: cert(sa) });

    this.db = getFirestore(app);

    console.log("Firestore connected successfully");
    return this.db;
  }

  static dbInstance(): Firestore {
    if (!this.db) throw new Error("Firestore not initialized. Call connect() first.");
    return this.db;
  }
}