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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreUserRepository = void 0;
const firebase_singleton_1 = __importDefault(require("../../config/firebase.singleton"));
class FirestoreUserRepository {
    constructor() {
        this.db = firebase_singleton_1.default.getInstance().firestore();
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = yield this.db
                .collection("users")
                .where("email", "==", email)
                .limit(1)
                .get();
            if (q.empty)
                return null;
            const d = q.docs[0];
            return Object.assign({ id: d.id }, d.data());
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.findByEmail(user.email);
            if (exists)
                return exists;
            const userData = Object.assign({}, user);
            if (userData.id === undefined)
                delete userData.id;
            const ref = yield this.db.collection("users").add(userData);
            yield ref.update({ id: ref.id });
            const doc = yield ref.get();
            return Object.assign({ id: ref.id }, doc.data());
        });
    }
}
exports.FirestoreUserRepository = FirestoreUserRepository;
