
const SITE_URL = "https://ajftrust.org";

const serverCard = {
  "$schema":
    "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",

  version: "1.0",
  protocolVersion: "2026-07-28",

  serverInfo: {
    name: "org.ajftrust/public-information",
    title: "Anand Jivan Foundation Trust MCP Server",
    version: "1.0.0",
  },

  description:
    "Official public information MCP server for Anand Jivan Foundation Trust (AJFT), Darbhanga, Bihar, India.",

  transport: {
    type: "streamable-http",
    endpoint: `${SITE_URL}/api/mcp`,
  },

  capabilities: {
    tools: {},
  },

  authentication: {
    required: false,
  },

  tools: ["dynamic"],

  instructions:
    "Provides read-only access to public AJFT trust information, programme areas and contact details. It does not provide access to private donor, student, applicant, payment or administrative data.",
};

export async function GET() {
  return Response.json(serverCard, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}
