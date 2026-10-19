import { defineField, defineType } from "sanity";

// Single document that powers the "My Story" page. Name and photo are optional
// so the author can stay anonymous; the page only shows what's filled in.
export const author = defineType({
  name: "author",
  title: "About Me",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Your name (optional)",
      type: "string",
      description: "Leave blank to stay anonymous. If filled in, the page heading says \"Hi, I'm …\".",
    }),
    defineField({
      name: "image",
      title: "Photo (optional)",
      type: "image",
      description: "Leave blank to stay anonymous. Any photo here appears beside your story.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Describe the photo", type: "string" })],
    }),
    defineField({
      name: "bio",
      title: "Your story",
      type: "richText",
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Me (My Story page)" }),
  },
});
