import Link from 'next/link'
import React from 'react'

const Post = ({post}) => {
  return (
    <div>
      <span>{post.id}</span>
      {" : "}
      <Link href={`/posts/${post.id}`}>
      <span className='cursor-pointer hover:bg-gray-600 border-b text-blue-600 border-blue-400'>{post.title}</span>
      </Link>
    </div>
  )
}

export default Post