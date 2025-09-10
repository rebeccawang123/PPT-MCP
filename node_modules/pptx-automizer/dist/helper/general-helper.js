"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = exports.vd = exports.GeneralHelper = void 0;
class GeneralHelper {
    static arrayify(input) {
        if (Array.isArray(input)) {
            return input;
        }
        else if (input !== undefined) {
            return [input];
        }
        else {
            return [];
        }
    }
    static propertyExists(object, property) {
        if (!object || typeof object !== 'object')
            return false;
        return !!Object.getOwnPropertyDescriptor(object, property);
    }
}
exports.GeneralHelper = GeneralHelper;
const vd = (v, keys) => {
    if (keys && typeof v === 'object') {
        v = Object.keys(v);
    }
    console.log('--------- [pptx-automizer] ---------');
    // @ts-ignore
    console.log(new Error().stack.split('\n')[2].trim());
    console.dir(v, { depth: 10 });
};
exports.vd = vd;
const last = (arr) => arr[arr.length - 1];
exports.last = last;
//# sourceMappingURL=general-helper.js.map