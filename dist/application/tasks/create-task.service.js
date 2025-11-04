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
exports.CreateTaskService = void 0;
const task_entity_1 = require("../../domain/entities/task.entity");
class CreateTaskService {
    constructor(repo) {
        this.repo = repo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const title = (_a = input.title) === null || _a === void 0 ? void 0 : _a.trim();
            const description = ((_b = input.description) !== null && _b !== void 0 ? _b : "").trim();
            const userId = (_c = input.userId) === null || _c === void 0 ? void 0 : _c.trim();
            if (!title)
                throw new Error("title is required");
            if (!userId)
                throw new Error("userId is required");
            const task = new task_entity_1.Task(title, description, userId);
            return this.repo.create(task);
        });
    }
}
exports.CreateTaskService = CreateTaskService;
