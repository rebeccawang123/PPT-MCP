import { TargetByRelIdMapParam, TrackedRelation, TrackedRelationTag } from '../types/types';
export declare const TargetByRelIdMap: {
    chart: TargetByRelIdMapParam;
    chartEx: TargetByRelIdMapParam;
    image: TargetByRelIdMapParam;
    'image:svg': TargetByRelIdMapParam;
};
export declare const imagesTrack: () => TrackedRelation[];
export declare const contentTrack: () => TrackedRelationTag[];
