import { defineArrayMember, defineType } from "sanity";

// The writing area used for post bodies and the "My Story" bio: paragraphs,
// headings, quotes, lists, links, plus photos and scripture callouts.
export const richText = defineType({
  name: "richText",
  title: "Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullets", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [{ name: "href", title: "URL", type: "url" }],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      title: "Photo",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Describe the photo",
          type: "string",
          description: "A short description for people using screen readers.",
        },
        { name: "caption", title: "Caption (optional)", type: "string" },
      ],
    }),
    defineArrayMember({ type: "verse" }),
  ],
});
