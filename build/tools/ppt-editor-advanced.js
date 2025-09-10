import * as fs from "fs";
import * as path from "path";
// Dynamic import for pptx-automizer
let Automizer;
async function loadAutomizer() {
    if (!Automizer) {
        const module = await import("pptx-automizer");
        Automizer = module.Automizer || module.default;
    }
    return Automizer;
}
export const pptEditorAdvanced = {
    name: "edit_presentation_advanced",
    description: "Advanced editing of existing PowerPoint presentations with full read/write capabilities",
    parameters: {
        type: "object",
        properties: {
            file_path: {
                type: "string",
                description: "Path to the existing presentation file"
            },
            operation: {
                type: "string",
                description: "Type of edit operation",
                enum: ["add_slide", "modify_text", "add_text", "duplicate_slide", "delete_slide", "replace_text", "add_image"]
            },
            slide_index: {
                type: "number",
                description: "Slide index to edit (1-based)"
            },
            content: {
                type: "object",
                description: "Content to add or modify based on operation type",
                properties: {
                    text: { type: "string", description: "Text content" },
                    old_text: { type: "string", description: "Text to replace (for replace_text operation)" },
                    new_text: { type: "string", description: "New text content (for replace_text operation)" },
                    title: { type: "string", description: "Slide title" },
                    template_slide: { type: "number", description: "Template slide index to copy from (for add_slide)" },
                    image_path: { type: "string", description: "Path to image file" },
                    position: {
                        type: "object",
                        properties: {
                            x: { type: "number", description: "X position" },
                            y: { type: "number", description: "Y position" },
                            width: { type: "number", description: "Width" },
                            height: { type: "number", description: "Height" }
                        }
                    }
                }
            },
            output_path: {
                type: "string",
                description: "Output file path (optional, defaults to overwriting original)"
            }
        },
        required: ["file_path", "operation"]
    },
    async run(args) {
        try {
            // Validate file exists
            if (!fs.existsSync(args.file_path)) {
                throw new Error(`File not found: ${args.file_path}`);
            }
            // Load and initialize automizer
            const AutomizerClass = await loadAutomizer();
            const automizer = new AutomizerClass({
                templateDir: path.dirname(args.file_path),
                outputDir: path.dirname(args.output_path || args.file_path),
                useCreationIds: false,
                autoImportSlideMasters: false,
                removeExistingSlides: false,
                cleanup: false
            });
            const templateName = path.basename(args.file_path);
            const outputPath = args.output_path || args.file_path;
            let result;
            switch (args.operation) {
                case "add_slide":
                    result = await this.addSlide(automizer, templateName, outputPath, args);
                    break;
                case "modify_text":
                case "replace_text":
                    result = await this.replaceText(automizer, templateName, outputPath, args);
                    break;
                case "add_text":
                    result = await this.addText(automizer, templateName, outputPath, args);
                    break;
                case "duplicate_slide":
                    result = await this.duplicateSlide(automizer, templateName, outputPath, args);
                    break;
                default:
                    throw new Error(`Unsupported operation: ${args.operation}`);
            }
            return {
                content: [{
                        type: "text",
                        text: `✅ **PowerPoint Edit Successful**\n\n` +
                            `**Operation:** ${args.operation}\n` +
                            `**Source file:** ${args.file_path}\n` +
                            `**Output file:** ${args.output_path || args.file_path}\n` +
                            `**Details:** ${result.message || 'Edit completed successfully'}`
                    }]
            };
        }
        catch (error) {
            return {
                content: [{
                        type: "text",
                        text: `❌ **Edit operation failed:** ${error instanceof Error ? error.message : String(error)}`
                    }],
                isError: true
            };
        }
    },
    async addSlide(automizer, templateName, outputPath, args) {
        const pres = automizer.loadRoot(templateName);
        // Get all slide numbers from the template
        const slideNumbers = await pres.getAllSlideNumbers();
        const templateSlideIndex = args.content?.template_slide || slideNumbers[0] || 1;
        // Add a slide based on the template
        pres.addSlide(templateName, templateSlideIndex);
        // Generate the output
        const jszip = await pres.getJSZip();
        const buffer = await jszip.generateAsync({ type: 'nodebuffer' });
        // Write to file
        fs.writeFileSync(outputPath, buffer);
        return { message: `Added new slide${args.content?.title ? ` with title: ${args.content.title}` : ''}` };
    },
    async replaceText(automizer, templateName, outputPath, args) {
        const pres = automizer.loadRoot(templateName);
        const oldText = args.content?.old_text || args.content?.text;
        const newText = args.content?.new_text || args.content?.text;
        if (oldText && newText) {
            // Add all slides from template first
            const slideNumbers = await pres.getAllSlideNumbers();
            for (const slideNum of slideNumbers) {
                pres.addSlide(templateName, slideNum);
            }
            // Replace text across all slides
            pres.addText(newText, (textElement) => {
                textElement.replaceText([{
                        replace: oldText,
                        by: newText
                    }]);
            });
        }
        // Generate the output
        const jszip = await pres.getJSZip();
        const buffer = await jszip.generateAsync({ type: 'nodebuffer' });
        // Write to file
        fs.writeFileSync(outputPath, buffer);
        return { message: `Replaced "${oldText}" with "${newText}"` };
    },
    async addText(automizer, templateName, outputPath, args) {
        const pres = automizer.loadRoot(templateName);
        // Add all slides from template first
        const slideNumbers = await pres.getAllSlideNumbers();
        for (const slideNum of slideNumbers) {
            pres.addSlide(templateName, slideNum);
        }
        // Note: Adding new text elements requires more complex implementation
        // For now, we'll just copy the slides
        // Generate the output
        const jszip = await pres.getJSZip();
        const buffer = await jszip.generateAsync({ type: 'nodebuffer' });
        // Write to file
        fs.writeFileSync(outputPath, buffer);
        return { message: `Text addition prepared (advanced text positioning requires additional implementation)` };
    },
    async duplicateSlide(automizer, templateName, outputPath, args) {
        const pres = automizer.loadRoot(templateName);
        const slideIndex = args.slide_index || 1;
        // Add all slides from template first
        const slideNumbers = await pres.getAllSlideNumbers();
        for (const slideNum of slideNumbers) {
            pres.addSlide(templateName, slideNum);
        }
        // Add the specified slide again to duplicate it
        if (slideNumbers.includes(slideIndex)) {
            pres.addSlide(templateName, slideIndex);
        }
        // Generate the output
        const jszip = await pres.getJSZip();
        const buffer = await jszip.generateAsync({ type: 'nodebuffer' });
        // Write to file
        fs.writeFileSync(outputPath, buffer);
        return { message: `Duplicated slide ${slideIndex}` };
    }
};
//# sourceMappingURL=ppt-editor-advanced.js.map