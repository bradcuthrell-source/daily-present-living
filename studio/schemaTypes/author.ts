import { defineField, defineType } from "sanity";

// Single document that powers the "My Story" page.
export const author = defineType({
  name: "author",
  title: "About Me",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Your name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo of you",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Describe the photo", type: "string" })],
    }),
    defineField({
      name: "bio",
      title: "Your story",
      type: "richText",
    }),
  ],
});
