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
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const express_validator_1 = require("express-validator");
const nodeMailer = __importStar(require("nodemailer"));
const router = express.Router();
router.post('/', [
    (0, express_validator_1.body)('name').not().isEmpty().trim().escape().isLength({ min: 3 }),
    (0, express_validator_1.body)('mail').not().isEmpty().isEmail().normalizeEmail().escape(),
    (0, express_validator_1.body)('message').not().isEmpty().trim().escape()
], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    req.body.message = req.body.message.replace(/&#x27;/g, '\'').replace(/&quot;/g, '\"');
    let transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_TLS === 'true' ? true : false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    const mailOptions = {
        from: 'marieservanebellet.site@gmail.com',
        to: process.env.MAIL_TO,
        bcc: process.env.MAIL_BCC,
        subject: 'Nouveau mail reçu de ' + req.body.name + ', <' + req.body.mail + '>',
        text: req.body.message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send();
        }
        res.status(200).send();
    });
});
exports.default = router;
//# sourceMappingURL=contactRouter.js.map