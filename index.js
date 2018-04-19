"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server"));
var http_1 = __importDefault(require("http"));
var server = http_1.default.createServer(server_1.default);
server.listen(3000, function () {
    console.log('app running on port ' + '3000');
});
