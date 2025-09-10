import { ArchivedFile, ArchiveType } from '../../interfaces/iarchive';
import { XmlDocument } from '../../types/xml-types';
import { AutomizerParams } from '../../types/types';
import JSZip from 'jszip';
export default class Archive {
    filename: string;
    buffer: ArchivedFile[];
    options: JSZip.JSZipGeneratorOptions<'nodebuffer'>;
    constructor(filename: any);
    parseXml(xmlString: string): XmlDocument;
    serializeXml(XmlDocument: XmlDocument): string;
    writeBuffer(archiveType: ArchiveType): Promise<void>;
    toBuffer(relativePath: any, content: any): void;
    setOptions(params: AutomizerParams): void;
    fromBuffer(relativePath: any): ArchivedFile;
}
