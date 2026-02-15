import { Link, useLocation } from "react-router-dom";
import type { MenuItem } from "./MenuItem";

interface SidebarItemProps {
  item: MenuItem;
  isCollapsed: boolean;
}

export const SidebarItem = ({ item, isCollapsed }: SidebarItemProps) => {
  const location = useLocation();
  const Icon = item.icon;
  const isActive = location.pathname === item.path;

  return (
    <Link
      to={item.path}
      className={`nav-item ${isCollapsed ? "collapsed" : ""} ${isActive ? "active" : ""}`}
    >
      <div className="icon-wrapper">
        <Icon />
      </div>
      {!isCollapsed && <span className="nav-label">{item.label}</span>}
    </Link>
  );
};
