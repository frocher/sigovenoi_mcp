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
- Cursor, Windsurf, Claude Desktop or another MCP Client

## Getting started

### Install in Cursor

Go to: `Settings` -> `Cursor Settings` -> `MCP` -> `Add new global MCP server`

Pasting the following configuration into your Cursor `~/.cursor/mcp.json` file is the recommended approach. See [Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol) for more info.

```json
{
  "mcpServers": {
    "sigovenoi": {
      "command": "npx",
      "args": ["-y", "@frocher/sigovenoi-mcp@latest"]
    }
  }
}
```

### Install in Windsurf

TODO

### Install in VSCode

TODO

### Install in Claude Desktop

TODO

### Available Tools

#### get-themes
Retrieves all available themes.

#### search-theme-topics
Search topics for a given theme. Parameters:
- `themeCode`: Theme code to search for topics
- `query`: (Optional) Search query
- `tokens`: (Optional) Maximum number of tokens to return


## Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sigovenoi_mcp.git
cd sigovenoi_mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build
```bash
npm run build
```

### Configuration

Create a `.env` file in the root directory with the following variables:
```env
API_URL=https://www.sigovenoi.com/api/v1
```

Or provide the URL via command line:
```bash
node dist/index.js --url http://your-api-url
```

### Local configuration example
```json
{
  "mcpServers": {
    "sigovenoi": {
      "command": "npx",
      "args": ["tsx", "/path/to/folder/sigovenoi_mcp/src/index.ts"]
    }
  }
}
```

### Testing with MCP Inspector

```bash
npx -y @modelcontextprotocol/inspector npx @upstash/context7-mcp@latest
```


## License

MIT License - see [LICENSE](LICENSE) for details.
