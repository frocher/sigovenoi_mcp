# Sigovenoi MCP

A Model Context Protocol (MCP) server that provides access to coding rules and examples for various themes.

## Features

- Retrieve all available themes
- Search topics within a specific theme
- Configurable API endpoint
- Environment variable support

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sigovenoi_mcp.git
cd sigovenoi_mcp
```

2. Install dependencies:
```bash
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:
```env
API_URL=http://localhost:3000/api/v1
```

Or provide the URL via command line:
```bash
node dist/index.js --url http://your-api-url
```

## Usage

1. Build the project:
```bash
npm run build
```

2. Start the server:
```bash
node dist/index.js
```

## Available Tools

### get-themes
Retrieves all available themes.

### search-theme-topics
Search topics for a given theme. Parameters:
- `themeCode`: Theme code to search for topics
- `query`: (Optional) Search query
- `tokens`: (Optional) Maximum number of tokens to return

## Development

1. Install development dependencies:
```bash
npm install --save-dev typescript @types/node
```

2. Start the development server:
```bash
npm run dev
```

## License

MIT License - see [LICENSE](LICENSE) for details.
