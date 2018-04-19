"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var env_1 = require("./.config/env");
var Server = /** @class */ (function () {
    function Server() {
        this.port = 3000;
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        mongoose_1.default.connect(env_1.dev.mongoURL)
            .then(function () { console.log('Database Connected'); })
            .catch(function (err) { console.log('Database Connection Error: ' + err); });
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
