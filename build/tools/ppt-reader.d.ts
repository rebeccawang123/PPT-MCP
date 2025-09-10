export declare const pptReader: {
    name: string;
    description: string;
    parameters: {
        type: string;
        properties: {
            file_path: {
                type: string;
                description: string;
            };
            output_format: {
                type: string;
                description: string;
                enum: string[];
                default: string;
            };
            slide_range: {
                type: string;
                description: string;
                properties: {
                    start: {
                        type: string;
                        description: string;
                    };
                    end: {
                        type: string;
                        description: string;
                    };
                };
            };
            include_notes: {
                type: string;
                description: string;
                default: boolean;
            };
        };
        required: string[];
    };
    run(args: {
        file_path: string;
        output_format?: string;
        slide_range?: {
            start?: number;
            end?: number;
        };
        include_notes?: boolean;
    }): Promise<{
        content: {
            type: string;
            text: string;
        }[];
        isError?: undefined;
    } | {
        content: {
            type: string;
            text: string;
        }[];
        isError: boolean;
    }>;
};
export declare const pptAnalyzer: {
    name: string;
    description: string;
    parameters: {
        type: string;
        properties: {
            file_path: {
                type: string;
                description: string;
            };
            analysis_type: {
                type: string;
                description: string;
                enum: string[];
                default: string;
            };
            detailed: {
                type: string;
                description: string;
                default: boolean;
            };
        };
        required: string[];
    };
    run(args: {
        file_path: string;
        analysis_type?: string;
        detailed?: boolean;
    }): Promise<{
        content: {
            type: string;
            text: string;
        }[];
        isError?: undefined;
    } | {
        content: {
            type: string;
            text: string;
        }[];
        isError: boolean;
    }>;
};
//# sourceMappingURL=ppt-reader.d.ts.map