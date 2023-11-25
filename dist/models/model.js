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
exports.UserCollection = exports.CategoryPicturesCollection = exports.PictureCollection = exports.User = exports.CategoryPictures = exports.Picture = void 0;
const mongoose = __importStar(require("mongoose"));
class Picture {
}
exports.Picture = Picture;
class CategoryPictures {
}
exports.CategoryPictures = CategoryPictures;
class User {
}
exports.User = User;
exports.PictureCollection = mongoose.model('pictures', new mongoose.Schema({
    id: Number,
    title: String,
    technique: String,
    gridColumn: String,
    gridrow: String,
    categoryId: Number,
    spec: String,
    date: String,
    url: String,
    size: String
}, { collection: 'pictures' }));
exports.CategoryPicturesCollection = mongoose.model('categoryPictures', new mongoose.Schema({
    id: Number,
    name: String,
    show: Boolean
}, { collection: 'categoryPictures' }));
exports.UserCollection = mongoose.model('users', new mongoose.Schema({
    mail: String,
    password: String
}, { collection: 'users' }));
//# sourceMappingURL=model.js.map