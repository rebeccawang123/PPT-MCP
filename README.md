# 🎯 PPT-MCP

> **Pure Node.js PowerPoint MCP Server** - Create, analyze, and manage PowerPoint presentations with AI assistance

<mcreference link="https://www.npmjs.com/package/pptxgenjs" index="1">1</mcreference> **PPT-MCP** is a Model Context Protocol (MCP) server that provides comprehensive PowerPoint presentation management capabilities using pure JavaScript/TypeScript. Built with **PptxGenJS**, the most popular PowerPoint library for Node.js with 3,500+ GitHub stars.

## ✨ Features

### 🚀 **Pure Node.js Stack**
- **Zero Python Dependencies** - 100% JavaScript/TypeScript implementation
- **Cross-Platform** - Works on Windows, macOS, and Linux
- **Modern Architecture** - Built with latest Node.js and TypeScript
- **Lightweight** - Minimal dependencies, fast startup

### 📊 **Core Capabilities**
- **🎨 Create Presentations** - Generate professional PowerPoint files with custom templates
- **✏️ Edit Existing Files** - Advanced editing capabilities with pptx-automizer for real PowerPoint modification
- **📖 File Analysis** - Analyze presentation structure and metadata
- **🔧 Template Support** - Basic, Professional, and Modern design templates
- **📁 File Management** - Smart file handling and directory management

### 🎯 **AI-Powered Workflow**
- **Claude Integration** - Seamless integration with Claude Desktop
- **Natural Language** - Create presentations using conversational commands
- **Intelligent Templates** - AI-suggested layouts and designs
- **Batch Operations** - Handle multiple presentations efficiently

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **Claude Desktop** (for MCP integration)

### Installation

#### Option 1: NPM Package (Recommended)
```bash
npm install -g ppt-mcp
```

#### Option 2: From Source
```bash
git clone https://github.com/guangxiangdebizi/PPT-MCP.git
cd PPT-MCP
npm install
npm run build
```

### Claude Desktop Configuration

Add to your Claude Desktop config:

#### Stdio Mode (Local Development)
```json
{
  "mcpServers": {
    "ppt-mcp": {
      "command": "node",
      "args": ["path/to/PPT-MCP/build/index.js"]
    }
  }
}
```

#### SSE Mode (Production)
```bash
# Install and run with Supergateway
npm install -g supergateway
npx supergateway --stdio "node build/index.js" --port 3100
```

```json
{
  "mcpServers": {
    "ppt-mcp": {
      "type": "sse",
      "url": "http://localhost:3100/sse",
      "timeout": 600
    }
  }
}
```

## 🛠️ Available Tools

### 1. **create_presentation**
Create new PowerPoint presentations with customizable options.

**Parameters:**
- `title` (required) - Presentation title
- `slides` (optional) - Number of slides (default: 1)
- `output_path` (optional) - Custom save location
- `template` (optional) - Design template: `basic`, `professional`, `modern`

**Example:**
```
Create a presentation titled "Q4 Business Review" with 5 slides using the professional template
```

### 2. **edit_presentation**
Basic editing of existing presentations (Note: Limited by PptxGenJS library capabilities).

**Parameters:**
- `file_path` (required) - Path to existing presentation
- `operation` (required) - Edit type: `add_slide`, `add_text`, `add_image`, `add_table`
- `slide_index` (optional) - Target slide number
- `content` (optional) - Content to add

### 2.5. **edit_presentation_enhanced** 🆕
Enhanced PowerPoint editing with comprehensive guidance and step-by-step instructions for manual editing.

**Parameters:**
- `file_path` (required) - Path to existing presentation
- `operation` (required) - Operation type: `get_guidance`, `add_slide`, `replace_text`, `extract_content`
- `slide_index` (optional) - Target slide number (1-based)
- `content` (optional) - Content specifications

**Features:**
- 📋 Step-by-step editing instructions
- 🔧 Multiple solution approaches
- 💡 Best practice recommendations
- 🎯 Operation-specific guidance

**Example:**
```
Get guidance for editing "report.pptx" to replace text content
```

### 3. **read_presentation**
Analyze and extract information from PowerPoint files.

**Parameters:**
- `file_path` (required) - Path to presentation file
- `output_format` (optional) - Format: `text`, `json`, `markdown`
- `slide_range` (optional) - Specific slides to read
- `include_notes` (optional) - Include speaker notes

### 4. **analyze_presentation**
Perform comprehensive analysis of presentation structure and content.

**Parameters:**
- `file_path` (required) - Path to presentation file
- `analysis_type` (optional) - Analysis type: `structure`, `content`, `statistics`, `readability`, `comprehensive`
- `detailed` (optional) - Enable detailed analysis

## 📁 Project Structure

```
PPT-MCP/
├── src/
│   ├── index.ts              # MCP server entry point
│   └── tools/
│       ├── ppt-creator.ts     # Creation & editing tools
│       └── ppt-reader.ts      # Reading & analysis tools
├── build/                     # Compiled JavaScript
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript configuration
├── README.md                 # Documentation
└── LICENSE                   # Apache 2.0 License
```

## 🔧 Development

### Build Commands
```bash
npm run build        # Compile TypeScript
npm run dev          # Watch mode compilation
npm start           # Run compiled server
npm run sse         # Start with Supergateway SSE
```

### Testing
```bash
# Test server startup
node build/index.js

# Test presentation creation
# (Use Claude Desktop or MCP client)
```

## 🎨 Template Showcase

### **Basic Template**
- Clean, minimal design
- Black text on white background
- Perfect for academic or simple business presentations

### **Professional Template**
- Corporate color scheme (Dark Slate Gray)
- Sophisticated typography
- Ideal for business meetings and reports

### **Modern Template**
- Vibrant blue and green accents
- Contemporary design elements
- Great for creative and tech presentations

## 🚀 Technology Stack

- **Runtime:** Node.js 18+
- **Language:** TypeScript
- **PPT Engine:** <mcreference link="https://www.npmjs.com/package/pptxgenjs" index="1">1</mcreference> PptxGenJS (3,500+ ⭐)
- **MCP SDK:** @modelcontextprotocol/sdk
- **Build System:** TypeScript Compiler
- **Package Manager:** NPM

## 🔄 Migration from Python

This version represents a complete rewrite from Python to pure Node.js:

### **Advantages of Node.js Version:**
- ✅ **Faster Startup** - No Python interpreter overhead
- ✅ **Simpler Deployment** - Single runtime environment
- ✅ **Better Integration** - Native JavaScript ecosystem
- ✅ **Modern Tooling** - TypeScript, ESM, and modern Node.js features
- ✅ **Cross-Platform** - Consistent behavior across operating systems

### **Current Limitations:**
- ⚠️ **Direct File Modification** - PptxGenJS is creation-focused, not editing-focused
- ⚠️ **Complex Animations** - Advanced animations not yet supported
- ⚠️ **Embedded Media** - Video/audio embedding requires additional implementation

### **Solutions Provided:**
- ✅ **Comprehensive Guidance** - `edit_presentation_enhanced` tool provides step-by-step instructions
- ✅ **Multiple Approaches** - Manual editing, hybrid workflows, and programmatic creation
- ✅ **Best Practices** - Detailed recommendations for different editing scenarios

*The `edit_presentation_enhanced` tool bridges the gap by providing expert guidance for PowerPoint editing workflows.*

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Add tests for new features
- Update documentation
- Ensure cross-platform compatibility

## 📄 License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Xingyu Chen**
- 🌐 **LinkedIn:** [Xingyu Chen](https://www.linkedin.com/in/xingyu-chen-b5b3b0313/)
- 📧 **Email:** guangxiangdebizi@gmail.com
- 🐙 **GitHub:** [@guangxiangdebizi](https://github.com/guangxiangdebizi/)
- 📦 **NPM:** [@xingyuchen](https://www.npmjs.com/~xingyuchen)

## 🙏 Acknowledgments

- **PptxGenJS Team** - For the excellent PowerPoint generation library
- **Anthropic** - For the Model Context Protocol specification
- **TypeScript Team** - For the amazing type system
- **Node.js Community** - For the robust runtime environment

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

[🐛 Report Bug](https://github.com/guangxiangdebizi/PPT-MCP/issues) • [✨ Request Feature](https://github.com/guangxiangdebizi/PPT-MCP/issues) • [📖 Documentation](https://github.com/guangxiangdebizi/PPT-MCP)

</div>