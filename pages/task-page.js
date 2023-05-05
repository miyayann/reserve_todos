import Layout from "@/components/Layout";
import Task from "@/components/Task";
import TaskForm from "@/components/TaskForm";
import StateContextProvider from "@/context/StateContext";
import { getAllTaskData } from "@/lib/task";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`

export default function TaskPage({staticTasks}) {
  const {data:tasks,mutate} = useSWR(apiUrl, fetcher,{
    fallbackData: staticTasks
  });
    const filteredTasks = tasks?.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
    useEffect(() => {
      mutate();
    },[])
  return (
    <StateContextProvider>
    <Layout title="task-page">
      <TaskForm taskCreated={mutate}/>
      <ul className="mb-5">
        {filteredTasks.map(task => <Task key={task.id} task={task} taskDeleted={mutate}/>)}
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
    </StateContextProvider>
  )
}

export async function getStaticProps() {
  const staticTasks = await getAllTaskData();
  return {
    props: {staticTasks},
    revalidate: 3
  }
}