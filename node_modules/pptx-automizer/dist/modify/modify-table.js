"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyTable = void 0;
const xml_helper_1 = require("../helper/xml-helper");
const modify_xml_helper_1 = __importDefault(require("../helper/modify-xml-helper"));
const modify_text_helper_1 = __importDefault(require("../helper/modify-text-helper"));
const index_1 = require("../index");
const general_helper_1 = require("../helper/general-helper");
class ModifyTable {
    constructor(table, data) {
        this.row = (index, children) => {
            return {
                'a:tr': {
                    index: index,
                    children: children,
                },
            };
        };
        this.column = (index, children) => {
            return {
                'a:tc': {
                    index: index,
                    children: children,
                },
            };
        };
        this.cell = (value, style) => {
            return {
                'a:t': {
                    modify: modify_text_helper_1.default.content(value),
                },
                'a:rPr': {
                    modify: modify_text_helper_1.default.style(style),
                },
                'a:tcPr': Object.assign({}, this.setCellStyle(style)),
            };
        };
        this.data = data;
        this.table = new modify_xml_helper_1.default(table);
        this.xml = table;
    }
    modify() {
        this.setRows();
        this.setGridCols();
        this.sliceRows();
        this.sliceCols();
        return this;
    }
    setRows() {
        this.data.body.forEach((row, r) => {
            row.values.forEach((cell, c) => {
                const rowStyles = row.styles && row.styles[c] ? row.styles[c] : {};
                this.table.modify(this.row(r, this.column(c, this.cell(cell, rowStyles))));
                this.table.modify({
                    'a16:rowId': {
                        index: r,
                        modify: modify_xml_helper_1.default.attribute('val', r),
                    },
                });
            });
        });
    }
    setGridCols() {
        var _a;
        (_a = this.data.body[0]) === null || _a === void 0 ? void 0 : _a.values.forEach((cell, c) => {
            this.table.modify({
                'a:gridCol': {
                    index: c,
                },
                'a16:colId': {
                    index: c,
                    modify: modify_xml_helper_1.default.attribute('val', c),
                },
            });
        });
    }
    sliceRows() {
        this.table.modify({
            'a:tbl': this.slice('a:tr', this.data.body.length),
        });
    }
    sliceCols() {
        var _a;
        this.table.modify({
            'a:tblGrid': this.slice('a:gridCol', (_a = this.data.body[0]) === null || _a === void 0 ? void 0 : _a.values.length),
        });
    }
    setCellStyle(style) {
        const cellProps = {
            modify: [],
            children: {},
        };
        if (style.background) {
            cellProps.modify.push(index_1.ModifyColorHelper.solidFill(style.background, 'last'));
        }
        if (style.border) {
            cellProps.children = this.setCellBorder(style);
        }
        return cellProps;
    }
    setCellBorder(style) {
        const borders = general_helper_1.GeneralHelper.arrayify(style.border);
        const sortBorderTags = ['lnB', 'lnT', 'lnR', 'lnL'];
        const modifications = {};
        borders
            .sort((b1, b2) => sortBorderTags.indexOf(b1.tag) < sortBorderTags.indexOf(b2.tag)
            ? -1
            : 1)
            .forEach((border) => {
            const tag = 'a:' + border.tag;
            const modifyCell = [];
            if (border.color) {
                modifyCell.push(index_1.ModifyColorHelper.solidFill(border.color));
            }
            if (border.weight) {
                modifyCell.push(modify_xml_helper_1.default.attribute('w', border.weight));
            }
            modifications[tag] = {
                modify: modifyCell,
            };
            if (border.type) {
                modifications[tag].children = {
                    'a:prstDash': {
                        modify: modify_xml_helper_1.default.attribute('val', border.type),
                    },
                };
            }
        });
        return modifications;
    }
    slice(tag, length) {
        return {
            children: {
                [tag]: {
                    collection: (collection) => {
                        xml_helper_1.XmlHelper.sliceCollection(collection, length);
                    },
                },
            },
        };
    }
    adjustHeight() {
        const tableHeight = this.getTableSize('cy');
        const rowHeight = tableHeight / this.data.body.length;
        this.data.body.forEach((row, r) => {
            this.table.modify({
                'a:tr': {
                    index: r,
                    modify: modify_xml_helper_1.default.attribute('h', Math.round(rowHeight)),
                },
            });
        });
        return this;
    }
    adjustWidth() {
        var _a, _b, _c;
        const tableWidth = this.getTableSize('cx');
        const rowWidth = tableWidth / ((_b = (_a = this.data.body[0]) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.length) || 1;
        (_c = this.data.body[0]) === null || _c === void 0 ? void 0 : _c.values.forEach((cell, c) => {
            this.table.modify({
                'a:gridCol': {
                    index: c,
                    modify: modify_xml_helper_1.default.attribute('w', Math.round(rowWidth)),
                },
            });
        });
        return this;
    }
    setSize(orientation, size) {
        const sizeElement = this.xml
            .getElementsByTagName('p:xfrm')[0]
            .getElementsByTagName('a:ext')[0];
        sizeElement.setAttribute(orientation, String(size));
    }
    getTableSize(orientation) {
        return Number(this.xml
            .getElementsByTagName('p:xfrm')[0]
            .getElementsByTagName('a:ext')[0]
            .getAttribute(orientation));
    }
}
exports.ModifyTable = ModifyTable;
//# sourceMappingURL=modify-table.js.map