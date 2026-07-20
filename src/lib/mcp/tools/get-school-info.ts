import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_school_info",
  title: "About Driving Zone",
  description:
    "General information about Driving Zone driving school: mission, experience, and student stats.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Driving Zone Autósiskola",
      location: "Kézdivásárhely, Románia",
      language: "Magyar / Román",
      summary:
        "Az elmúlt másfél évtizedben több mint 5000 diákunk szerzett sikeresen jogosítványt az irányításunk alatt.",
      categories: ["B kategória"],
      highlights: [
        "Tapasztalt, türelmes oktatók",
        "Modern autópark",
        "Elméleti és gyakorlati képzés",
        "Jogosítványcsere és honosítás",
      ],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
