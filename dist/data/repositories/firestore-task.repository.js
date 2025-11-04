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
exports.FirestoreTaskRepository = void 0;
const firebase_singleton_1 = __importDefault(require("../../config/firebase.singleton"));
class FirestoreTaskRepository {
    constructor() {
        this.db = firebase_singleton_1.default.getInstance().firestore();
    }
    findAllByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const snap = yield this.db
                .collection("tasks")
                .where("userId", "==", userId)
                .orderBy("createdAt", "desc")
                .get();
            return snap.docs.map(d => (Object.assign({ id: d.id }, d.data())));
        });
    }
    create(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskData = Object.assign({}, task);
            if (taskData.id === undefined)
                delete taskData.id;
            const ref = yield this.db.collection("tasks").add(taskData);
            const doc = yield ref.get();
            return Object.assign({ id: ref.id }, doc.data());
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.collection("tasks").doc(id).update(data);
            const doc = yield this.db.collection("tasks").doc(id).get();
            return Object.assign({ id: doc.id }, doc.data());
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.collection("tasks").doc(id).delete();
        });
    }
}
exports.FirestoreTaskRepository = FirestoreTaskRepository;
