"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_helpers_1 = __importDefault(require("../lib/helpers/database-helpers"));
let apiRouter = express_1.default.Router();
apiRouter.post('/user', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let username = req.body.username;
        let password = req.body.password;
        let createdUser;
        let user = yield database_helpers_1.default.findUserByUsername(username);
        if (user)
            res.json({ error: 'Username already taken' });
        else
            createdUser = yield database_helpers_1.default.createNewUser(username, password);
        res.json({ message: 'User Registered' });
    }
    catch (e) {
        res.json({ error: e });
    }
}));
exports.default = apiRouter;
