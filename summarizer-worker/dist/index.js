"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const generative_ai_1 = require("@google/generative-ai");
const summarize_1 = __importDefault(require("./prompts/summarize"));
const summarizer_common_1 = require("@pahul100/summarizer-common");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const client = (0, redis_1.createClient)();
function summarize(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield model.generateContent((0, summarize_1.default)(text));
        return result.response.text();
    });
}
function worker() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        while (true) {
            const data = JSON.parse((_b = (_a = (yield client.blPop("summarize", 0))) === null || _a === void 0 ? void 0 : _a.element) !== null && _b !== void 0 ? _b : "{}");
            console.log("Received data", summarizer_common_1.rawTranscript.safeParse(data));
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to Redis");
            yield worker();
        }
        catch (err) {
            console.error(err);
        }
    });
}
main();
