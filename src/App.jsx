import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './RootPage'
import Upload from './Upload'
import List from './ImageList'
import './App.css'




function App() {


  const router = createBrowserRouter([
    {
      path:'/',
      element: <Root />,
      children: [
        {path: '/', element: <Upload /> },
        {path: '/list', element: <List /> }
        
      ]
    }
  ])

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
