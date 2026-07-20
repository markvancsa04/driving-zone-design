import { defineMcp } from "@lovable.dev/mcp-js";
import getServicesTool from "./tools/get-services";
import getContactTool from "./tools/get-contact";
import getSchoolInfoTool from "./tools/get-school-info";

export default defineMcp({
  name: "driving-zone-mcp",
  title: "Driving Zone MCP",
  version: "0.1.0",
  instructions:
    "Public tools for the Driving Zone driving school in Kézdivásárhely. Use get_school_info for an overview, get_services for course offerings and prices, and get_contact_info for location and contact details.",
  tools: [getSchoolInfoTool, getServicesTool, getContactTool],
});
