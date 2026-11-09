
import {
  createMcpHandler,
  McpServer,
} from "@modelcontextprotocol/server";

import * as z from "zod/v4";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = "https://ajftrust.org";

const handler = createMcpHandler(() => {
  const server = new McpServer({
    name: "org.ajftrust/public-information",
    version: "1.0.0",
  });

  // TOOL 1: Public Trust Information
  server.registerTool(
    "get_trust_information",
    {
      description:
        "Get public information about Anand Jivan Foundation Trust (AJFT), its identity and charitable activities.",
      inputSchema: z.object({}),
    },
    async () => ({
      content: [
        {
          type: "text",
          text: `
Anand Jivan Foundation Trust (AJFT)

Website: ${SITE_URL}
Location: Darbhanga, Bihar, India
Email: info@ajftrust.org
Phone: +91-9155751363

AJFT is a public charitable trust working in community-focused areas including education, healthcare, women empowerment, child welfare, environment, skill development and social welfare.

Official information:
${SITE_URL}/about
${SITE_URL}/governance
${SITE_URL}/transparency
          `.trim(),
        },
      ],
    })
  );

  // TOOL 2: Public Programme Areas
  server.registerTool(
    "get_program_areas",
    {
      description:
        "Get the public programme areas of Anand Jivan Foundation Trust.",
      inputSchema: z.object({}),
    },
    async () => ({
      content: [
        {
          type: "text",
          text: `
AJFT public programme areas:

1. Education
2. Healthcare
3. Child Welfare
4. Women Empowerment
5. Environment
6. Skill Development
7. Community Development
8. Social Welfare

Official programme page:
${SITE_URL}/programs

Projects:
${SITE_URL}/projects
          `.trim(),
        },
      ],
    })
  );

  // TOOL 3: Public Contact Information
  server.registerTool(
    "get_contact_information",
    {
      description:
        "Get official public contact information for Anand Jivan Foundation Trust.",
      inputSchema: z.object({}),
    },
    async () => ({
      content: [
        {
          type: "text",
          text: `
Anand Jivan Foundation Trust

Website: ${SITE_URL}
Contact page: ${SITE_URL}/contact
Email: info@ajftrust.org
Phone: +91-9155751363
Location: Darbhanga, Bihar, India
          `.trim(),
        },
      ],
    })
  );

  return server;
});

// CORS for public MCP clients
function withCors(response: Response) {
  const headers = new Headers(response.headers);

  headers.set("Access-Control-Allow-Origin", "*");
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS"
  );
  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Mcp-Session-Id, Last-Event-Id"
  );
  headers.set(
    "Access-Control-Expose-Headers",
    "Mcp-Session-Id"
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function GET(request: Request) {
  return withCors(await handler.fetch(request));
}

export async function POST(request: Request) {
  return withCors(await handler.fetch(request));
}

export async function DELETE(request: Request) {
  return withCors(await handler.fetch(request));
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods":
        "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, Mcp-Session-Id, Last-Event-Id",
    },
  });
}
