import * as Icons from "./SidebarIcons";

export interface MenuItem {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  path: string;
}

export const menuItems: MenuItem[] = [
  { icon: Icons.HomeIcon, label: "DASHBOARD", path: "/dashboard" },
  {
    icon: Icons.AlertTriangleIcon,
    label: "VIOLATION RECORDS",
    path: "/violation-records",
  },
  { icon: Icons.MapIcon, label: "MAP VIEW", path: "/map-view" },
  { icon: Icons.FileBarChartIcon, label: "GENERATE REPORT", path: "/report" },
  { icon: Icons.CalendarIcon, label: "CALENDAR", path: "/calendar" },
  { icon: Icons.UsersIcon, label: "USER MANAGEMENT", path: "/user-management" },
  { icon: Icons.ScalesIcon, label: "ORDINANCES", path: "/ordinances" },
];
