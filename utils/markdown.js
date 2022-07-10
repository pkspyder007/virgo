import { bundleMDX } from "mdx-bundler";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";

export const getCompiledMDX = async (content) => {
  const remarkPlugins = [];
  const rehypePlugins = [
    rehypeSlug,
    rehypeCodeTitles,
    rehypePrism,
    rehypeAutolinkHeadings,
  ];

  try {
    return await bundleMDX({
      source: content,
      mdxOptions(options, frontmatter) {
        // this is the recommended way to add custom remark/rehype plugins:
        // The syntax might look weird, but it protects you in case we add/remove
        // plugins in the future.
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          ...remarkPlugins,
        ];
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          ...rehypePlugins,
        ];

        return options;
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
