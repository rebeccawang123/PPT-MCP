"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modify_table_1 = require("../modify/modify-table");
class ModifyTableHelper {
}
exports.default = ModifyTableHelper;
ModifyTableHelper.setTable = (data, params) => (element) => {
    const modTable = new modify_table_1.ModifyTable(element, data);
    modTable.modify();
    if (params === null || params === void 0 ? void 0 : params.setHeight) {
        modTable.setSize('cy', params.setHeight);
    }
    if (params === null || params === void 0 ? void 0 : params.setWidth) {
        modTable.setSize('cx', params.setWidth);
    }
    if (!params || (params === null || params === void 0 ? void 0 : params.adjustHeight)) {
        modTable.adjustHeight();
    }
    if (!params || (params === null || params === void 0 ? void 0 : params.adjustWidth)) {
        modTable.adjustWidth();
    }
};
ModifyTableHelper.setTableData = (data) => (element) => {
    const modTable = new modify_table_1.ModifyTable(element, data);
    modTable.modify();
};
ModifyTableHelper.adjustHeight = (data) => (element) => {
    const modTable = new modify_table_1.ModifyTable(element, data);
    modTable.adjustHeight();
};
ModifyTableHelper.adjustWidth = (data) => (element) => {
    const modTable = new modify_table_1.ModifyTable(element, data);
    modTable.adjustWidth();
};
//# sourceMappingURL=modify-table-helper.js.map