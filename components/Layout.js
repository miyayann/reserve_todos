import Head from 'next/head'
import React from 'react'

const Layout = ({children, title="Default title"}) => {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-200'>
      <Head>
        <title>{title}</title>
      </Head>
      <main className='flex flex-1 flex-col justify-center items-center'>
        {children}
      </main>
      <footer className='flex h-12 justify-center items-center'>
        reserved
      </footer>
    </div>
  )
}

export default Layout