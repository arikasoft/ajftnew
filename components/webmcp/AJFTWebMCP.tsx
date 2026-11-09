
"use client";

import { useWebMCP } from "use-webmcp-tool";

const emptySchema = {
  type: "object" as const,
  properties: {},
  additionalProperties: false,
};

export default function AJFTWebMCP() {
  useWebMCP({
    name: "get_trust_information",
    description:
      "Retrieve official public identity and charitable activities of Anand Jivan Foundation Trust.",
    inputSchema: emptySchema,
    annotations: { readOnlyHint: true },
    execute: () => ({
      name: "Anand Jivan Foundation Trust",
      shortName: "AJFT",
      website: "https://ajftrust.org",
      location: "Darbhanga, Bihar, India",
      email: "info@ajftrust.org",
      phone: "+91-9155751363",
      activities: [
        "Education",
        "Healthcare",
        "Women Empowerment",
        "Child Welfare",
        "Environment",
        "Skill Development",
        "Social Welfare",
      ],
      officialPages: [
        "https://ajftrust.org/about",
        "https://ajftrust.org/governance",
        "https://ajftrust.org/transparency",
      ],
    }),
  });

  useWebMCP({
    name: "get_program_areas",
    description:
      "Retrieve the publicly described programme areas of AJFT.",
    inputSchema: emptySchema,
    annotations: { readOnlyHint: true },
    execute: () => ({
      programmes: [
        "Education & Learning",
        "Community Development",
        "Health & Well-being",
        "Social Support",
        "Empowerment",
        "Basic Infrastructure",
      ],
      url: "https://ajftrust.org/programs",
    }),
  });

  useWebMCP({
    name: "get_contact_information",
    description:
      "Retrieve official public contact details of AJFT.",
    inputSchema: emptySchema,
    annotations: { readOnlyHint: true },
    execute: () => ({
      website: "https://ajftrust.org",
      contactPage: "https://ajftrust.org/contact",
      email: "info@ajftrust.org",
      phone: "+91-9155751363",
      location: "Darbhanga, Bihar, India",
    }),
  });

  return null;
}
