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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const path = __importStar(require("path"));
const http = __importStar(require("http"));
const dotenv = __importStar(require("dotenv"));
const utils = __importStar(require("./utils"));
const controlUser = __importStar(require("./controllerUser"));
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const notFound = (info, response) => {
    utils.sendJSON(404, { message: `${info} was not found.` }, response);
};
exports.server = http.createServer((request, response) => {
    var _a, _b;
    try {
        if (!request.url)
            return notFound((_a = request.url) !== null && _a !== void 0 ? _a : '', response);
        if (request.url == '/api/users') {
            if (request.method == 'GET')
                return controlUser.getAllUsers(request, response);
            if (request.method == 'POST')
                return controlUser.createUser(request, response);
        }
        console.log(request.url);
        if (request.url.startsWith('/api/users/')) {
            const uuid = request.url.split('/').slice(3).join('/');
            console.log(uuid);
            if (!utils.isUuid(uuid))
                return utils.sendJSON(400, `${uuid} is not a valid uuid`, response);
            if (request.method == 'DELETE')
                return controlUser.deleteUserById(request, response, uuid);
            if (request.method == 'PUT')
                return controlUser.updateUserById(request, response, uuid);
            if (request.method == 'GET')
                return controlUser.getUserById(request, response, uuid);
        }
        return notFound((_b = request.url) !== null && _b !== void 0 ? _b : '', response);
    }
    catch (err) {
        utils.sendJSON(500, { message: 'Server error' }, response);
    }
})
    .on('error', (err) => {
    console.log(`unhandled exception, error: ${JSON.stringify(err)}`);
})
    .on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 500 internal server error\r\n\r\n');
});
const port = (_a = process.env.httpPort) !== null && _a !== void 0 ? _a : 4444;
exports.server.listen(port).on('listening', () => console.log(`listening on HTTP port ${port}`));
