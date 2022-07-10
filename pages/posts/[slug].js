import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { getAllPostPaths, getPostData } from "@/utils/blog";
import CustomComponents from "@/components/mdx";

export default function Posts({ source, frontmatter }) {
  const Component = useMemo(() => getMDXComponent(source), [source]);
  return (
    <div className="prose mx-auto">
      <Component components={CustomComponents} />
    </div>
  );
}

export const getStaticProps = async ({ params }) => {
  const slug = params.slug;
  const post = await getPostData(slug);
  return {
    props: {
      source: post.source,
      frontmatter: post.frontmatter,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllPostPaths();

  return {
    paths,
    fallback: false,
  };
};
