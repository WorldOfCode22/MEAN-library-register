"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var Server = /** @class */ (function () {
    function Server() {
        this.port = 3000;
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        dotenv_1.default.config();
        // middleware
    };
    Server.prototype.routes = function () {
        var router = express_1.default.Router();
        router.get('/ping', function (req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send({ test: 'Server is working' });
        });
        this.app.use('/api', router);
    };
    return Server;
}());
exports.default = new Server().app;
