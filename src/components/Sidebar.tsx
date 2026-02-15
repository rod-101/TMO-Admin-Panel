import "../styles/sidebar.css";

import { useState } from "react";
import {
  SidebarHeader,
  SidebarToggle,
  SidebarFooter,
  SidebarNav,
} from "./sub/SidebarComponents";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <SidebarHeader isCollapsed={isCollapsed} />
      <SidebarToggle
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />
      <SidebarNav isCollapsed={isCollapsed} />
      <SidebarFooter isCollapsed={isCollapsed} />
    </aside>
  );
}
