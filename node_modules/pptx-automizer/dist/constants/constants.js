"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentTrack = exports.imagesTrack = exports.TargetByRelIdMap = void 0;
exports.TargetByRelIdMap = {
    chart: {
        relRootTag: 'c:chart',
        relAttribute: 'r:id',
        prefix: '../charts/chart',
    },
    chartEx: {
        relRootTag: 'cx:chart',
        relAttribute: 'r:id',
        prefix: '../charts/chartEx',
    },
    image: {
        relRootTag: 'a:blip',
        relAttribute: 'r:embed',
        prefix: '../media/image',
    },
    'image:svg': {
        relRootTag: 'asvg:svgBlip',
        relAttribute: 'r:embed',
        prefix: '../media/image',
    },
};
const imagesTrack = () => [
    {
        type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image',
        tag: 'a:blip',
        role: 'image',
        attribute: 'r:embed',
    },
    {
        type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image',
        tag: 'asvg:svgBlip',
        role: 'image',
        attribute: 'r:embed',
    },
];
exports.imagesTrack = imagesTrack;
const contentTrack = () => {
    return [
        {
            source: 'ppt/presentation.xml',
            relationsKey: 'ppt/_rels/presentation.xml.rels',
            tags: [
                {
                    type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster',
                    tag: 'p:sldMasterId',
                    role: 'slideMaster',
                },
                {
                    type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide',
                    tag: 'p:sldId',
                    role: 'slide',
                },
            ],
        },
        {
            source: 'ppt/slides',
            relationsKey: 'ppt/slides/_rels',
            isDir: true,
            tags: [
                {
                    type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart',
                    tag: 'c:chart',
                    role: 'chart',
                },
                {
                    type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout',
                    role: 'slideLayout',
                    tag: null,
                },
                ...(0, exports.imagesTrack)(),
            ],
        },
        {
            source: 'ppt/charts',
            relationsKey: 'ppt/charts/_rels',
            isDir: true,
            tags: [
                {
                    type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/package',
                    tag: 'c:externalData',
                    role: 'externalData',
                },
            ],
        },
        {
            source: 'ppt/slideMasters',
            relationsKey: 'ppt/slideMasters/_rels',
            isDir: true,
            tags: [
                {
                    type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout',
                    tag: 'p:sldLayoutId',
                    role: 'slideLayout',
                },
                ...(0, exports.imagesTrack)(),
            ],
        },
        {
            source: 'ppt/slideLayouts',
            relationsKey: 'ppt/slideLayouts/_rels',
            isDir: true,
            tags: [
                {
                    type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster',
                    role: 'slideMaster',
                    tag: null,
                },
                ...(0, exports.imagesTrack)(),
            ],
        },
    ];
};
exports.contentTrack = contentTrack;
//# sourceMappingURL=constants.js.map