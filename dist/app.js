"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
if (((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.trim()) === 'development') {
    dotenv.config();
}
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const http = __importStar(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const categoryPicturesRouter_1 = __importDefault(require("./routes/categoryPicturesRouter"));
const contactRouter_1 = __importDefault(require("./routes/contactRouter"));
const loginRouter_1 = __importDefault(require("./routes/loginRouter"));
const picturesRouter_1 = __importDefault(require("./routes/picturesRouter"));
mongoose_1.default.connect(process.env.DATABASE_URL, { authSource: "admin" });
const db = mongoose_1.default.connection;
db.on('error', () => console.log('Error during the database connection'));
db.once('connected', () => console.log("Connected to database"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, express_rate_limit_1.default)({ windowMs: 1 * 60 * 1000, max: 300 }));
app.use((0, express_fileupload_1.default)());
let port;
if (process.env.NODE_ENV === "production") {
    console.log('Production environnement');
    app.use((0, cors_1.default)({
        origin: [`https://${process.env.FRONT_URL}`],
        optionsSuccessStatus: 200
    }));
    port = 80;
}
else {
    console.log('Development environnement');
    app.use((0, cors_1.default)());
    port = 3000;
}
const httpServer = http.createServer(app);
httpServer.listen(port, () => {
    console.log(`HTTP Server is listening on port ${port}`);
});
app.use('/login', loginRouter_1.default);
app.use('/pictures', picturesRouter_1.default);
app.use('/categoryPictures', categoryPicturesRouter_1.default);
app.use('/contact', contactRouter_1.default);
app.get('/ping', (req, res) => {
    res.send('pong');
});
//# sourceMappingURL=app.js.map