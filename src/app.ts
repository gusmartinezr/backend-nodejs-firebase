import { envs } from "./config/envs";
import { FirestoreDatabase } from "./data/firebase/firebase-database";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
    main();
})();

async function main() {
    await FirestoreDatabase.connect({ serviceAccountPath: envs.FIREBASE_SERVICE_ACCOUNT_PATH });
    // await FirestoreDatabase.connect({ serviceAccountPath: "serviceAccountKey.json" });
    const server = new Server({ port: envs.PORT, routes: AppRoutes.routes });

    server.start();
}