import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_contact_info",
  title: "Get contact info",
  description:
    "Get contact information for Driving Zone driving school (address, phone, email, opening hours). Located in Kézdivásárhely, Romania.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const contact = {
      school: "Driving Zone Autósiskola",
      city: "Kézdivásárhely (Târgu Secuiesc), Romania",
      website: "https://drivingzone.example",
      note: "Konkrét cím, telefon, e-mail és nyitvatartás az iskola Kapcsolat oldalán érhető el.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(contact, null, 2) }],
      structuredContent: contact,
    };
  },
});
