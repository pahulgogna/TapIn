"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawTranscript = exports.loginUser = exports.registerUser = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerUser = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().min(3).optional()
});
exports.loginUser = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
exports.rawTranscript = zod_1.default.object({
    text: zod_1.default.string(),
    userId: zod_1.default.string()
});
