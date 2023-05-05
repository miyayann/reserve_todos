import Layout from "@/components/Layout"
import { getAllPostIds, getPostData } from "@/lib/post"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Post({post}) {
const router = useRouter()
  if(router.isFallback || !post) {
    return <div>Loading...</div>
  }
  return (
    <Layout>
      <div className="w-4/5 text-center">
      <p>{"ID : "} {post.id}</p>
      <p className="mt-2 font-bold">{post.title}</p>
      <p className="mt-2">{post.created_at}</p>
      <p className="mt-10">{post.content}</p>
      <Link href="/blog-page">
        <div className="flex mt-5 justify-center hover:duration-700 hover:-translate-x-4 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24  24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointe mr-4 ">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
        <span>back to blog page</span>
        </div>
      </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getAllPostIds()
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({params}) {
  const post = await getPostData(params.id)
  return {
    props: {
      post
    },
    revalidate: 3
  }
}