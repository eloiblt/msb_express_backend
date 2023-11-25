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
const model_1 = require("../models/model");
const authenticate_1 = require("../middlewares/authenticate");
const fs = __importStar(require("fs"));
const child_process_1 = require("child_process");
const express_validator_1 = require("express-validator");
const router = express.Router();
router.get('/', (req, res) => {
    model_1.PictureCollection.find().sort('categoryId').lean()
        .then(docs => {
        const pictures = docs.map(d => {
            const { _id } = d, picture = __rest(d, ["_id"]);
            return picture;
        });
        res.status(200).send(pictures);
    })
        .catch(err => res.status(500).send());
});
router.get('/getBySpec', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, express_validator_1.check)("spec").isString().trim().escape().run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    model_1.PictureCollection.find({ spec: req.query.spec }).lean()
        .then(docs => {
        const pictures = docs.map(d => {
            const { _id } = d, picture = __rest(d, ["_id"]);
            return picture;
        });
        res.status(200).send(pictures);
    })
        .catch(err => res.status(500).send());
}));
router.get('/getByCategory', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, express_validator_1.check)("categoryId").isInt().run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    model_1.PictureCollection.find({ categoryId: req.query.categoryId }).lean()
        .then(docs => {
        const pictures = docs.map(d => {
            const { _id } = d, picture = __rest(d, ["_id"]);
            return picture;
        });
        res.status(200).send(pictures);
    })
        .catch(err => res.status(500).send());
}));
router.post('/', authenticate_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, express_validator_1.check)("categoryId").isInt().run(req);
    yield (0, express_validator_1.check)("date").isString().trim().run(req);
    yield (0, express_validator_1.check)("gridColumn").isString().trim().run(req);
    yield (0, express_validator_1.check)("gridrow").isString().trim().run(req);
    yield (0, express_validator_1.check)("id").isInt().trim().run(req);
    yield (0, express_validator_1.check)("size").isString().trim().run(req);
    yield (0, express_validator_1.check)("technique").isString().trim().run(req);
    yield (0, express_validator_1.check)("title").isString().trim().run(req);
    yield (0, express_validator_1.check)("url").isString().trim().run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    model_1.PictureCollection.create(req.body)
        .then(docs => res.status(200).send(req.body))
        .catch(err => res.status(500).send());
}));
router.put('/:id', authenticate_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, express_validator_1.check)("categoryId").isInt().run(req);
    yield (0, express_validator_1.check)("date").isString().trim().run(req);
    yield (0, express_validator_1.check)("gridColumn").isString().trim().run(req);
    yield (0, express_validator_1.check)("gridrow").isString().trim().run(req);
    yield (0, express_validator_1.check)("id").isInt().trim().run(req);
    yield (0, express_validator_1.check)("size").isString().trim().run(req);
    yield (0, express_validator_1.check)("technique").isString().trim().run(req);
    yield (0, express_validator_1.check)("title").isString().trim().run(req);
    yield (0, express_validator_1.check)("url").isString().trim().run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    model_1.PictureCollection.updateOne({ id: req.body.id }, req.body)
        .then(docs => res.status(200).send(Object.assign({ id: req.params.id }, req.body)))
        .catch(err => res.status(500).send());
}));
router.delete('/:id', authenticate_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, express_validator_1.check)("id").isInt().run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    model_1.PictureCollection.findOne({ id: req.params.id }).lean()
        .then(doc => {
        const { _id } = doc, picture = __rest(doc, ["_id"]);
        fs.unlink('/usr/share/nginx/html/' + picture.url, function (err) {
            model_1.PictureCollection.deleteOne({ id: req.params.id })
                .then(docs => res.status(200).send())
                .catch(err => res.status(500).send());
        });
    })
        .catch(err => res.status(500).send());
}));
router.post('/postFile', authenticate_1.authenticateJWT, (req, res) => {
    if (process.env.NODE_ENV === "development") {
        res.status(500).send("Opération non permise en développement");
    }
    else {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        let sampleFile = req.files.peinture;
        sampleFile.mv('/pictures/' + sampleFile.name, err => {
            if (err)
                throw err;
            (0, child_process_1.exec)('jpegoptim --max=50 --strip-all /pictures/' + sampleFile.name, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                }
                res.status(200).send('File uploaded!');
            });
        });
    }
});
exports.default = router;
//# sourceMappingURL=picturesRouter.js.map