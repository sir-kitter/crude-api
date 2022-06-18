"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteById = exports.updateById = exports.findById = exports.findAll = exports.createUnique = void 0;
const uuid = __importStar(require("uuid"));
const tableUsers = [];
function createUnique(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(res => {
            const uniqueUser = Object.assign(Object.assign({}, user), { id: uuid.v4() });
            tableUsers.push(uniqueUser);
            res(uniqueUser);
        });
    });
}
exports.createUnique = createUnique;
function findAll() {
    return __awaiter(this, void 0, void 0, function* () { return new Promise(res => res(tableUsers)); });
}
exports.findAll = findAll;
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(res => {
            var _a;
            const user = (_a = tableUsers.find(user => id == user.id)) !== null && _a !== void 0 ? _a : null;
            res(user);
        });
    });
}
exports.findById = findById;
function updateById(desiredId, newInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => {
            const index = tableUsers.findIndex(user => desiredId == user.id);
            if (index == -1) {
                rej(null);
            }
            else {
                res(tableUsers[index] = Object.assign(Object.assign({}, newInfo), { id: desiredId }));
            }
        });
    });
}
exports.updateById = updateById;
function deleteById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => {
            const index = tableUsers.findIndex(user => userId == user.id);
            if (index == -1) {
                rej(false);
            }
            else {
                tableUsers.splice(index, 1);
                res(true);
            }
        });
    });
}
exports.deleteById = deleteById;
