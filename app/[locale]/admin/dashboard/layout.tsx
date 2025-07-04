import DashboardLayout  from "@/components/admin/dashboard-layout"

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}