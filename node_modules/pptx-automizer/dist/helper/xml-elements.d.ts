import { Color } from '../types/modify-types';
import { XmlDocument, XmlElement } from '../types/xml-types';
export type XmlElementParams = {
    color?: Color;
};
export default class XmlElements {
    element: XmlDocument | XmlElement;
    document: XmlDocument;
    params: XmlElementParams;
    constructor(element: XmlDocument | XmlElement, params?: XmlElementParams);
    text(): this;
    textRangeProps(): HTMLElement;
    textContent(): XmlElement;
    effectLst(): XmlElement;
    lineTexture(): XmlElement;
    fillTexture(): XmlElement;
    line(): XmlElement;
    solidFill(): XmlElement;
    colorType(): XmlElement;
    colorValue(colorType: XmlElement): void;
    dataPoint(): this;
    spPr(): XmlElement;
    idx(): XmlElement;
    cellBorder(tag: 'lnL' | 'lnR' | 'lnT' | 'lnB'): this;
    prstDash(): HTMLElement;
    round(): HTMLElement;
    lineEnd(type: 'headEnd' | 'tailEnd'): HTMLElement;
    shapeProperties(): void;
    dataPointLabel(): void;
    tableCellBorder(tag: 'a:lnL' | 'a:lnR' | 'a:lnT' | 'a:lnB'): void;
}
