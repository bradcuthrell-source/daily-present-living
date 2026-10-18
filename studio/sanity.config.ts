import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

// Set in studio/.env (local) — see studio/.env.example. Same values as the site's
// PUBLIC_SANITY_* variables.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "missing-project-id";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

// Keep the sidebar simple for a non-technical writer: Posts first, then the
// single "About Me" page, then Categories.
const structure: StructureResolver = (S) =>
  S.list()
    .title("Daily Present Living")
    .items([
      S.documentTypeListItem("post").title("Blog Posts"),
      S.listItem()
        .title("About Me (My Story page)")
        .id("author")
        .child(S.document().schemaType("author").documentId("author")),
      S.documentTypeListItem("category").title("Categories"),
    ]);

// "About Me" is a single document — hide it from the global "create new" menu.
const singletonTypes = new Set(["author"]);

export default defineConfig({
  name: "default",
  title: "Daily Present Living",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
});
