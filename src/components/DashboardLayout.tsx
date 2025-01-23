import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Film,
  Building2,
  Calendar,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Movies",
    icon: Film,
    path: "/dashboard/movies",
  },
  {
    title: "Theaters",
    icon: Building2,
    path: "/dashboard/theaters",
  },
  {
    title: "Shows",
    icon: Calendar,
    path: "/dashboard/shows",
  },
  {
    title: "Bookings",
    icon: BookOpen,
    path: "/dashboard/bookings",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <div className="flex items-center justify-between px-4 py-2">
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <ThemeToggle />
            </div>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={location.pathname === item.path ? "bg-secondary" : ""}
                    >
                      <Link to={item.path}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={logout}>
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};