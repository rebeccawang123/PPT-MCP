import ModifyXmlHelper from '../helper/modify-xml-helper';
import { TableData, TableRowStyle } from '../types/table-types';
import { Modification, ModificationTags } from '../types/modify-types';
import { XmlDocument, XmlElement } from '../types/xml-types';
export declare class ModifyTable {
    data: TableData;
    table: ModifyXmlHelper;
    xml: XmlDocument | XmlElement;
    constructor(table: XmlDocument | XmlElement, data?: TableData);
    modify(): ModifyTable;
    setRows(): void;
    setGridCols(): void;
    sliceRows(): void;
    sliceCols(): void;
    row: (index: number, children: ModificationTags) => ModificationTags;
    column: (index: number, children: ModificationTags) => ModificationTags;
    cell: (value: number | string, style?: TableRowStyle) => ModificationTags;
    setCellStyle(style: any): {
        modify: any[];
        children: {};
    };
    setCellBorder(style: any): {};
    slice(tag: string, length: number): Modification;
    adjustHeight(): this;
    adjustWidth(): this;
    setSize(orientation: 'cx' | 'cy', size: number): void;
    getTableSize(orientation: string): number;
}
