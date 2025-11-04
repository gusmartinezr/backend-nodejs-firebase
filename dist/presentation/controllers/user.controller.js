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
exports.UserController = void 0;
const firestore_user_repository_1 = require("../../data/repositories/firestore-user.repository");
const find_user_service_1 = require("../../application/users/find-user.service");
const create_user_service_1 = require("../../application/users/create-user.service");
const user_presenter_1 = require("../mappers/user.presenter");
const repo = new firestore_user_repository_1.FirestoreUserRepository();
const findUser = new find_user_service_1.FindUserService(repo);
const createUser = new create_user_service_1.CreateUserService(repo);
class UserController {
    static getByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = String(req.query.email || "");
            const user = yield findUser.execute(email);
            if (!user)
                return res.status(404).json({ found: false });
            res.json((0, user_presenter_1.toUserResponseDTO)(user));
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const user = yield createUser.execute(email);
            res.status(201).json((0, user_presenter_1.toUserResponseDTO)(user));
        });
    }
}
exports.UserController = UserController;
