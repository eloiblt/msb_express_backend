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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const model_1 = require("../models/model");
const express_validator_1 = require("express-validator");
const router = express.Router();
router.post('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, express_validator_1.check)("mail").isString().trim().escape().isEmail().run(req);
    yield (0, express_validator_1.check)("password").isString().trim().run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    model_1.UserCollection.find({ mail: req.body.mail }).lean()
        .then(docs => {
        const users = docs.map(d => {
            const { _id } = d, user = __rest(d, ["_id"]);
            return user;
        });
        if (docs.length === 1) {
            const currentUser = users[0];
            bcrypt.compare(req.body.password, currentUser.password)
                .then(rt => {
                if (rt) {
                    const newToken = jwt.sign({ mail: currentUser.mail, password: currentUser.password }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.status(200).send({ user: currentUser, token: newToken });
                }
                else {
                    res.status(401).send();
                }
            })
                .catch(err => {
                console.log(err);
                res.status(401).send();
            });
        }
        else {
            res.status(401).send();
        }
    })
        .catch(err => {
        console.log(err);
        res.status(401).send();
    });
}));
exports.default = router;
//# sourceMappingURL=loginRouter.js.map