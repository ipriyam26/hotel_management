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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const db_1 = require("./api/v1/db");
const constants_1 = __importDefault(require("./config/constants"));
const routes_1 = require("./api/v1/routes");
const room_1 = require("./api/v1/services/room");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 15, // limit each IP to 100 requests per windowMs
//   })
// );
// app.use(helmet());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, express_mongo_sanitize_1.default)({
    replaceWith: '_'
}));
app.use("/api/v1/bookings", routes_1.bookingsRouter);
app.use("/api/v1/rooms", routes_1.roomRouter);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(process.env.MONGO_URL)
        yield (0, db_1.connectDB)("mongodb+srv://ipriyam26a:kfnprHGpnvmkDGKa@cluster0.ppda2e2.mongodb.net/?retryWrites=true&w=majority");
        (0, room_1.getRoomsAndTypes)();
        app.listen(constants_1.default.port, () => {
            console.log(`Listening on port ${constants_1.default.port}!`);
        });
    }
    catch (e) {
        console.error(e);
    }
});
start();
//# sourceMappingURL=index.js.map