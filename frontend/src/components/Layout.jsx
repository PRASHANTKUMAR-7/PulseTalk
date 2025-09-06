
import React from 'react'

const Layout = ({homepageprops,showSidebarporps=false}) => {
  return (
   <div className="min-h-screen">
  <div className="flex">
    {showSidebarporps && <Sidebar />}

    <div className="flex-1 flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-y-auto">{homepageprops}</main>
    </div>
  </div>
</div>
  )
}

export default Layout
