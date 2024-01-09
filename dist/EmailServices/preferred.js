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
exports.sendPreferredEmail = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config_1 = require("../config");
const ejs_1 = __importDefault(require("ejs"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const sendEmail_1 = require("../Helpers/sendEmail");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const sendPreferredEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(config_1.sqlConfig);
    const users = (yield pool.request().execute('GetJoinedData')).recordset;
    console.log(users);
    // looping through and send an email
    for (let user of users) {
        console.log(users);
        ejs_1.default.renderFile('./preferred.ejs', { username: user.userName, question_title: user.question_title }, (err, html) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                return;
            }
            //  send email
            try {
                let messageOptions = {
                    from: 'muchokiesther8@gmail.com',
                    to: user.email,
                    subject: "YAY,YOUR ANSWER WAS PREFFERED!",
                    html
                };
                yield (0, sendEmail_1.sendMail)(messageOptions);
                //update the database email was sent
                yield pool.request().query(`UPDATE ANSWERS SET emailSent=1 WHERE userId='${user.userId}' and answerId='${user.answerId}'`);
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.sendPreferredEmail = sendPreferredEmail;
