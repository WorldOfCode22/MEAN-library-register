"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const user_1 = __importDefault(require("./models/user"));
const api_1 = __importDefault(require("./router/api"));
const body_parser_1 = __importDefault(require("body-parser"));
const LocalStrategy = passport_local_1.default.Strategy;
const env_1 = require("./.config/env");
class Server {
    constructor() {
        this.port = 3000;
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        mongoose_1.default.connect(env_1.dev.mongoURL)
            .then(() => { console.log('Database Connected'); })
            .catch((err) => { console.log('Database Connection Error: ' + err); });
        // middleware
        this.app.use(cookie_session_1.default({
            name: 'session',
            keys: [env_1.dev.cookieKey]
        }));
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
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
    }
    routes() {
        this.app.use('/api', api_1.default);
    }
}
exports.default = new Server().app;
