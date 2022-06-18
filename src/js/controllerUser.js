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
exports.updateUserById = exports.deleteUserById = exports.getUserById = exports.createUser = exports.getAllUsers = void 0;
const modelUser = __importStar(require("./modelUserInMemory"));
const utils = __importStar(require("./utils"));
const parsePost_1 = require("./parsePost");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield modelUser.findAll();
        utils.sendJSON(200, allUsers, res);
    }
    catch (err) {
        utils.sendJSON(500, { message: "Server error, couldn't get all users." }, res);
    }
});
exports.getAllUsers = getAllUsers;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield (0, parsePost_1.parsePost)(req, res);
        const { username, age, hobbies } = content;
        if (!username || !age || !hobbies)
            return utils.sendJSON(400, { message: 'not all fields are specified' }, res);
        const newUser = yield modelUser.createUnique({ id: '', username, age, hobbies });
        utils.sendJSON(201, newUser, res);
    });
}
exports.createUser = createUser;
function getUserById(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield modelUser.findById(id);
        if (!user)
            return utils.sendJSON(404, { message: "user with such id doesn't exist" }, res);
        utils.sendJSON(200, user, res);
    });
}
exports.getUserById = getUserById;
function deleteUserById(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield modelUser.findById(id);
        if (!user)
            return utils.sendJSON(404, { message: "user with such id doesn't exist" }, res);
        yield modelUser.deleteById(id);
        utils.sendJSON(204, { message: `user ${id} has been removed` }, res);
    });
}
exports.deleteUserById = deleteUserById;
function updateUserById(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield modelUser.findById(id);
        if (!user)
            return utils.sendJSON(404, { message: "user with such id doesn't exist" }, res);
        const { username, age, hobbies } = yield (0, parsePost_1.parsePost)(req, res);
        const newFields = {
            id: '',
            username: username !== null && username !== void 0 ? username : user.username,
            age: age !== null && age !== void 0 ? age : user.age,
            hobbies: hobbies !== null && hobbies !== void 0 ? hobbies : user.hobbies,
        };
        const updatedUser = yield modelUser.updateById(id, newFields);
        utils.sendJSON(200, updatedUser, res);
    });
}
exports.updateUserById = updateUserById;
