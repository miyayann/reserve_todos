import Layout from "@/components/Layout";
import { getAllTaskIds, getTaskData } from "@/lib/task";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Post({staticTask, id}) {
  const router = useRouter()
  const {data:task,mutate} = useSWR(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`,fetcher,{
    fallbackData: staticTask})
    useEffect(() => {
      mutate();
    },[])
    if(router.isFallback || !task) {
      return <div>Loading...</div>
    }
    return (
      <Layout title={task.title}>
        <span>{"ID : "}{task.id}</span>
        <p className="mt-2">{task.title}</p>
        <p className="mt-2">{task.created_at}</p>
        <Link href="/task-page">
        <div className="flex mt-5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24  24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer mr-4 ">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
        <span>back to task page</span>
        </div>
      </Link>
      </Layout>
    )
}

export async function getStaticPaths() {
  const paths = await getAllTaskIds()
  return  {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({params}) {
  const staticTask = await getTaskData(params.id)
  return {
    props: {
      id:staticTask.id,
      staticTask
    }
  }
}