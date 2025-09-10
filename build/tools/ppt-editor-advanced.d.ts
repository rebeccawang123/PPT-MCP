export declare const pptEditorAdvanced: {
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
                    template_slide: {
                        type: string;
                        description: string;
                    };
                    image_path: {
                        type: string;
                        description: string;
                    };
                    position: {
                        type: string;
                        properties: {
                            x: {
                                type: string;
                                description: string;
                            };
                            y: {
                                type: string;
                                description: string;
                            };
                            width: {
                                type: string;
                                description: string;
                            };
                            height: {
                                type: string;
                                description: string;
                            };
                        };
                    };
                };
            };
            output_path: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    run(args: {
        file_path: string;
        operation: string;
        slide_index?: number;
        content?: any;
        output_path?: string;
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
    addSlide(automizer: any, templateName: string, outputPath: string, args: any): Promise<{
        message: string;
    }>;
    replaceText(automizer: any, templateName: string, outputPath: string, args: any): Promise<{
        message: string;
    }>;
    addText(automizer: any, templateName: string, outputPath: string, args: any): Promise<{
        message: string;
    }>;
    duplicateSlide(automizer: any, templateName: string, outputPath: string, args: any): Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=ppt-editor-advanced.d.ts.map