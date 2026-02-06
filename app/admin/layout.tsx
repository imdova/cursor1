import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout sidebar={<AdminSidebar />}>{children}</DashboardLayout>
  );
}
