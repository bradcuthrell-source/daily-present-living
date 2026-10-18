import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      description: 'For example: "Faith", "Family", "Grief", "Gratitude"',
      validation: (rule) => rule.required(),
    }),
  ],
});
