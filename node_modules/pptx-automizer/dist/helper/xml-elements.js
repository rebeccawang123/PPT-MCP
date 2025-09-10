"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_helper_1 = require("./xml-helper");
const xmldom_1 = require("@xmldom/xmldom");
const dLbl_1 = require("./xml/dLbl");
const lnLRTB_1 = require("./xml/lnLRTB");
class XmlElements {
    constructor(element, params) {
        this.element = element;
        this.document = element.ownerDocument;
        this.params = params;
    }
    text() {
        const r = this.document.createElement('a:r');
        r.appendChild(this.textRangeProps());
        r.appendChild(this.textContent());
        const previousSibling = this.element.getElementsByTagName('a:pPr')[0];
        xml_helper_1.XmlHelper.insertAfter(r, previousSibling);
        return this;
    }
    textRangeProps() {
        const rPr = this.document.createElement('a:rPr');
        const endParaRPr = this.element.getElementsByTagName('a:endParaRPr')[0];
        rPr.setAttribute('lang', endParaRPr.getAttribute('lang'));
        rPr.setAttribute('sz', endParaRPr.getAttribute('sz'));
        rPr.appendChild(this.line());
        rPr.appendChild(this.effectLst());
        rPr.appendChild(this.lineTexture());
        rPr.appendChild(this.fillTexture());
        return rPr;
    }
    textContent() {
        const t = this.document.createElement('a:t');
        t.textContent = ' ';
        return t;
    }
    effectLst() {
        return this.document.createElement('a:effectLst');
    }
    lineTexture() {
        return this.document.createElement('a:uLnTx');
    }
    fillTexture() {
        return this.document.createElement('a:uFillTx');
    }
    line() {
        const ln = this.document.createElement('a:ln');
        const noFill = this.document.createElement('a:noFill');
        ln.appendChild(noFill);
        return ln;
    }
    solidFill() {
        const solidFill = this.document.createElement('a:solidFill');
        const colorType = this.colorType();
        solidFill.appendChild(colorType);
        return solidFill;
    }
    colorType() {
        var _a, _b;
        const tag = 'a:' + (((_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.color) === null || _b === void 0 ? void 0 : _b.type) || 'srgbClr');
        const colorType = this.document.createElement(tag);
        this.colorValue(colorType);
        return colorType;
    }
    colorValue(colorType) {
        var _a, _b;
        colorType.setAttribute('val', ((_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.color) === null || _b === void 0 ? void 0 : _b.value) || 'cccccc');
    }
    dataPoint() {
        const dPt = this.document.createElement('c:dPt');
        dPt.appendChild(this.idx());
        dPt.appendChild(this.spPr());
        const nextSibling = this.element.getElementsByTagName('c:cat')[0];
        if (nextSibling) {
            nextSibling.parentNode.insertBefore(dPt, nextSibling);
        }
        return this;
    }
    spPr() {
        const spPr = this.document.createElement('c:spPr');
        spPr.appendChild(this.solidFill());
        spPr.appendChild(this.line());
        spPr.appendChild(this.effectLst());
        return spPr;
    }
    idx() {
        const idx = this.document.createElement('c:idx');
        idx.setAttribute('val', String(0));
        return idx;
    }
    cellBorder(tag) {
        const border = this.document.createElement(tag);
        border.appendChild(this.solidFill());
        border.appendChild(this.prstDash());
        border.appendChild(this.round());
        border.appendChild(this.lineEnd('headEnd'));
        border.appendChild(this.lineEnd('tailEnd'));
        return this;
    }
    prstDash() {
        const prstDash = this.document.createElement('a:prstDash');
        prstDash.setAttribute('val', 'solid');
        return prstDash;
    }
    round() {
        const round = this.document.createElement('a:round');
        return round;
    }
    lineEnd(type) {
        const lineEnd = this.document.createElement(type);
        lineEnd.setAttribute('type', 'none');
        lineEnd.setAttribute('w', 'med');
        lineEnd.setAttribute('len', 'med');
        return lineEnd;
    }
    shapeProperties() {
        const spPr = this.spPr();
        this.element.appendChild(spPr);
    }
    dataPointLabel() {
        const doc = new xmldom_1.DOMParser().parseFromString(dLbl_1.dLblXml);
        const ele = doc.getElementsByTagName('c:dLbl')[0];
        const firstChild = this.element.firstChild;
        this.element.insertBefore(ele.cloneNode(true), firstChild);
    }
    tableCellBorder(tag) {
        const doc = new xmldom_1.DOMParser().parseFromString(lnLRTB_1.lnLRTB);
        const ele = doc.getElementsByTagName(tag)[0];
        const firstChild = this.element.firstChild;
        this.element.insertBefore(ele.cloneNode(true), firstChild);
    }
}
exports.default = XmlElements;
//# sourceMappingURL=xml-elements.js.map