"use client";

import Sidebar from "@/components/layout/Sidebar";
import { getInstructorSidebarProps } from "@/config/sidebar";

export default function InstructorSidebar() {
  return <Sidebar {...getInstructorSidebarProps()} />;
}
