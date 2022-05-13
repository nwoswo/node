"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
// import { express } from "express";
var Server = /** @class */ (function () {
    function Server(puerto) {
        this.port = puerto;
        this.app = express();
    }
    Server.init = function (puerto) {
        return new Server(puerto);
    };
    Server.prototype.publicFolder = function () {
        var publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    };
    Server.prototype.start = function (callback) {
        this.app.listen(this.port, callback);
        this.publicFolder();
    };
    return Server;
}());
exports.default = Server;
