export declare const pptCreator: {
    name: string;
    description: string;
    parameters: {
        type: string;
        properties: {
            title: {
                type: string;
                description: string;
            };
            slides: {
                type: string;
                description: string;
                default: number;
            };
            output_path: {
                type: string;
                description: string;
            };
            template: {
                type: string;
                description: string;
                enum: string[];
                default: string;
            };
        };
        required: string[];
    };
    run(args: {
        title: string;
        slides?: number;
        output_path?: string;
        template?: string;
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
export declare const pptEditor: {
    name: string;
    description: string;
    parameters: {
        type: string;
        properties: {
            file_path: {
                type: string;
                description: string;
            };
            operation: {
                type: string;
                description: string;
                enum: string[];
            };
            slide_index: {
                type: string;
                description: string;
            };
            content: {
                type: string;
                description: string;
                properties: {
                    text: {
                        type: string;
                    };
                    title: {
                        type: string;
                    };
                    x: {
                        type: string;
                    };
                    y: {
                        type: string;
                    };
                    width: {
                        type: string;
                    };
                    height: {
                        type: string;
                    };
                    fontSize: {
                        type: string;
                    };
                    color: {
                        type: string;
                    };
                };
            };
        };
        required: string[];
    };
    run(args: {
        file_path: string;
        operation: string;
        slide_index?: number;
        content?: any;
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
export declare const pptEditorEnhanced: {
    name: string;
    description: string;
    parameters: {
        type: string;
        properties: {
            file_path: {
                type: string;
                description: string;
            };
            operation: {
                type: string;
                description: string;
                enum: string[];
            };
            slide_index: {
                type: string;
                description: string;
            };
            content: {
                type: string;
                description: string;
                properties: {
                    text: {
                        type: string;
                        description: string;
                    };
                    old_text: {
                        type: string;
                        description: string;
                    };
                    new_text: {
                        type: string;
                        description: string;
                    };
                    title: {
                        type: string;
                        description: string;
                    };
                };
            };
        };
        required: string[];
    };
    run(args: {
        file_path: string;
        operation: string;
        slide_index?: number;
        content?: any;
    }): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    } | {
        content: {
            type: string;
            text: string;
        }[];
        isError: boolean;
    }>;
    getEditingGuidance(filePath: string, fileSizeKB: string): {
        content: {
            type: string;
            text: string;
        }[];
    };
    extractContentGuidance(filePath: string): {
        content: {
            type: string;
            text: string;
        }[];
    };
    addSlideGuidance(args: any): {
        content: {
            type: string;
            text: string;
        }[];
    };
    replaceTextGuidance(args: any): {
        content: {
            type: string;
            text: string;
        }[];
    };
};
//# sourceMappingURL=ppt-creator.d.ts.map