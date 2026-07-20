import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const services = [
  {
    name: "B kategóriás járművezetői tanfolyam",
    description: "Türelmes és tapasztalt oktatók, akik mellett élmény a tanulás.",
    price_from: "2400 RON",
  },
  {
    name: "Vezetés-tökéletesítő órák (Már meglévő jogosítvánnyal)",
    description: "Személyre szabott gyakorló órák saját vagy oktatóautóval.",
    price_from: "150 RON",
  },
  {
    name: "Jogosítványcsere (Külföldi és belföldi)",
    description: "Külföldön szerzett vezetői engedélyek románra való cseréje (honosítás).",
    price_from: "Egyedi ajánlat",
  },
];

export default defineTool({
  name: "get_services",
  title: "Get Driving Zone services",
  description:
    "List the driving school services offered by Driving Zone in Kézdivásárhely, including name, description, and starting price.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
    structuredContent: { services },
  }),
});
