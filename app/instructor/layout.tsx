import InstructorSidebar from "@/components/instructor/InstructorSidebar";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout sidebar={<InstructorSidebar />} mainClassName="flex-1">
      {children}
    </DashboardLayout>
  );
}
