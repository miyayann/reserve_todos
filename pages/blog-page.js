import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { getAllPostData } from "@/lib/post";
import Link from "next/link";

export default function BlogPage({posts}) {
  return (
    <Layout title="blog-page">
      <ul className="mb-5">
        {posts.map(post => <Post post={post}/>)}
      </ul>
    <Link href="/main-page">
        <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24  24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointe mr-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
        <span>back to main page</span>
        </div>
      </Link>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = await getAllPostData();
  return {
    props: {posts},
    revalidate: 3
  }
}

