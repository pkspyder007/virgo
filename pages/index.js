import { getAllPostMetadata } from "@/utils/blog";
import Link from "next/link";
import React from "react";

function PostPage({ posts }) {
  return (
    <main className="text-center">
      {posts.map((p) => (
        <h1 key={p.title} className="text-xl underline my-6">
          <Link href={`/posts/${p.slug}`}>
            <a>{p.title}</a>
          </Link>
        </h1>
      ))}
    </main>
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
