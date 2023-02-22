"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserScheme = new mongoose_1.Schema({
    nameUser: { type: String, required: true, unique: true },
    emailUser: { type: String, required: true, unique: true, lowercase: true },
    passwordUser: { type: String, required: true },
    typeUser: { type: Number, enum: [1, 2], default: 1 },
}, { versionKey: false });
exports.default = (0, mongoose_1.model)("User", UserScheme, "User");
