"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = __importDefault(require("passport-local"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var user_1 = __importDefault(require("./models/user"));
var LocalStrategy = passport_local_1.default.Strategy;
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
        this.app.use(cookie_session_1.default({
            name: 'session',
            keys: [env_1.dev.cookieKey]
        }));
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        passport_1.default.use(new LocalStrategy(function (username, password, done) {
            user_1.default.findOne({ username: username }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (user.password !== password) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }));
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
