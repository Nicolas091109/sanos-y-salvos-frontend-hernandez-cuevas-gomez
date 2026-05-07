import ContentArea from './ContentArea'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-[1800px]">
        <div className="hidden w-[300px] shrink-0 xl:block">
          <Sidebar />
        </div>

        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar />
          <ContentArea />
        </div>
      </div>
    </div>
  )
}
