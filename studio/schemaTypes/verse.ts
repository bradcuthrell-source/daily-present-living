import { defineField, defineType } from "sanity";

// A scripture passage. Rendered on the site as a highlighted callout.
export const verse = defineType({
  name: "verse",
  title: "Scripture",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Verse text",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reference",
      title: "Reference",
      type: "string",
      description: 'For example: "Psalm 118:24 (NIV)"',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "reference", subtitle: "text" },
    prepare: ({ title, subtitle }) => ({ title: `📖 ${title ?? "Scripture"}`, subtitle }),
  },
});
