import { getAllPostMetadata } from "@/utils/blog";
import Link from "next/link";
import React from "react";

function PostPage({ posts }) {
  return (
    <>
      {posts.map((p) => (
        <h1>
          <Link href={`/posts/${p.slug}`}>{p.title}</Link>
        </h1>
      ))}
    </>
  );
}

export const getStaticProps = async () => {
  const posts = getAllPostMetadata();

  return {
    props: {
      posts,
    },
  };
};

export default PostPage;
