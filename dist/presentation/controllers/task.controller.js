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
exports.TaskController = void 0;
const firestore_task_repository_1 = require("../../data/repositories/firestore-task.repository");
const create_task_service_1 = require("../../application/tasks/create-task.service");
const update_task_service_1 = require("../../application/tasks/update-task.service");
const delete_task_service_1 = require("../../application/tasks/delete-task.service");
const list_tasks_service_1 = require("../../application/tasks/list-tasks.service");
const task_presenter_1 = require("../mappers/task.presenter");
const repo = new firestore_task_repository_1.FirestoreTaskRepository();
const createTask = new create_task_service_1.CreateTaskService(repo);
const updateTask = new update_task_service_1.UpdateTaskService(repo);
const deleteTask = new delete_task_service_1.DeleteTaskService(repo);
const listTasks = new list_tasks_service_1.ListTasksService(repo);
class TaskController {
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = String(req.query.userId || "");
            const tasks = yield listTasks.execute(userId);
            res.json(tasks.map(task_presenter_1.toTaskResponseDTO));
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, userId } = req.body;
            const created = yield createTask.execute({ title, description, userId });
            res.status(201).json((0, task_presenter_1.toTaskResponseDTO)(created));
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const updated = yield updateTask.execute({ id, data: req.body });
            res.json((0, task_presenter_1.toTaskResponseDTO)(updated));
        });
    }
    static remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield deleteTask.execute(req.params.id);
            res.status(204).send();
        });
    }
}
exports.TaskController = TaskController;
