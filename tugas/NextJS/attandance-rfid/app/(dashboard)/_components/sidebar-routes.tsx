"use client";
import { CalendarDays, Layout, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

const adminRoutes = [
  {
    icon: Users,
    label: "Pegawai",
    href: "/pegawai",
  },
  {
    icon: CalendarDays,
    label: "Absensi",
    href: "/absensi",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();
  //Todo Check Role user for render routes
  const routes = adminRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
