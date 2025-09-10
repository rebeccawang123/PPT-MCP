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
const index_1 = __importDefault(require("./index"));
const modify_background_helper_1 = __importDefault(require("./helper/modify-background-helper"));
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const automizer = new index_1.default({
        templateDir: `${__dirname}/../__tests__/pptx-templates`,
        outputDir: `${__dirname}/../__tests__/pptx-output`,
        autoImportSlideMasters: true,
    });
    let pres = automizer
        .loadRoot(`RootTemplate.pptx`)
        .load(`SlideMasterBackgrounds.pptx`)
        .load('SlideMasterBackgrounds.pptx')
        .loadMedia(`test.png`, `${__dirname}/../__tests__/media`, 'pre_')
        .addMaster(`SlideMasterBackgrounds.pptx`, 2, (master) => __awaiter(void 0, void 0, void 0, function* () {
        modify_background_helper_1.default.setRelationTarget(master, 'pre_test.png');
    }))
        .addSlide(`SlideMasterBackgrounds.pptx`, 1)
        .write(`SlideMasterBackgroundsOutput.pptx`)
        .then((summary) => {
        console.log(summary);
    });
});
run().catch((error) => {
    console.error(error);
});
//# sourceMappingURL=dev.js.map