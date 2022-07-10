import { join } from "path";
import { existsSync, readdirSync, readFileSync } from "fs";
import { getCompiledMDX } from "./markdown";
import matter from "gray-matter";
import { readFile } from "fs/promises";

const POSTS_DIR = join(process.cwd(), "content", "posts");

const readFileNames = (dir) => {
  const files = readdirSync(dir);
  const fileNames = files.map((file) => file.split(".")[0]);

  return fileNames;
};

export const getAllPostPaths = () => {
  const postNames = readFileNames(join(process.cwd(), "content", "posts"));
  return postNames.map((post) => `/posts/${post}`);
};

export const getPostPathFromSlug = (slug) => {
  let mdxPath = join(process.cwd(), "content", "posts", `${slug}.mdx`);
  if (existsSync(mdxPath)) {
    return mdxPath;
  }

  let mdPath = join(process.cwd(), "content", "posts", `${slug}.md`);
  if (existsSync(mdPath)) {
    return mdPath;
  }

  return null;
};

export const readContent = (path) => {
  const source = readFileSync(path);
  return source;
};

export const getAllPostMetadata = () => {
  const metadata = [];
  const files = readdirSync(POSTS_DIR);

  files.forEach((file) => {
    const { data } = matter(readContent(`${POSTS_DIR}/${file}`));
    metadata.push(data);
  });
  return metadata;
};

export const getPostData = async (slug) => {
  const filePath = getPostPathFromSlug(slug);
  const source = await readFile(filePath);
  const { code, frontmatter } = await getCompiledMDX(source.toString());

  return {
    source: code,
    frontmatter,
  };
};
