import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from "dotenv";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Load environment variables from .env file
dotenv.config();

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option("url", {
    type: "string",
    description: "API URL",
  })
  .parseSync();

// Get API URL from arguments or environment variables
const API_URL = argv.url || process.env.API_URL;
const DEFAULT_MINIMUM_TOKENS = 5000;

// Create server instance
const server = new McpServer({
  name: "Sigovenoi",
  description: "Retrieves coding rules and code examples for a given theme.",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Helper function for making API requests
async function makeAPIRequest<T>(url: string): Promise<T | null> {
  const headers = {
    Accept: "application/json",
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making API request:", error);
    return null;
  }
}

// Register the tools
server.tool(
  "get-themes",
  "Required first step: retrieve all themes.",
  {},
  async () => {
    const data = await makeAPIRequest<any>(API_URL + "/themes");

    if (!data) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve themes data",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  },
);

server.tool(
  "search-theme-topics",
  "Search topics for a given theme. Must be called after 'get-themes'.",
  {
    themeCode: z.string().describe("Theme code to search for topics."),
    query: z.string().optional().describe("Query to search for topics."),
    tokens: z
      .number()
      .optional()
      .describe(
        `Maximum number of tokens to return. Default is ${DEFAULT_MINIMUM_TOKENS}. Higher values provide more context but consume more tokens.`
      ),
  },
  async ({ themeCode, query = "", tokens = DEFAULT_MINIMUM_TOKENS }) => {
    const searchParams = new URLSearchParams();
    if (query) {
      searchParams.set("query", query);
    }
    if (tokens) {
      searchParams.set("tokens", tokens.toString());
    }

    const url = `${API_URL}/themes/${themeCode}/topics/search.json${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;

    const data = await makeAPIRequest<any>(url);
    if (!data) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve topics",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  },
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Sigovenoi Documentation MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
