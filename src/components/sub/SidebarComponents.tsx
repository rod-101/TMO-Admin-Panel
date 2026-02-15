// import itmoLogo from "../../assets/sidebar/itmo-logo.svg";
import { MenuIcon, FileBarChartIcon } from "./SidebarIcons";
import { SidebarItem } from "./SidebarItem";
import { menuItems } from "./MenuItem";

interface SidebarHeaderProps {
  isCollapsed: boolean;
}

interface SidebarFooterProps {
  isCollapsed: boolean;
}

interface SidebarNavProps {
  isCollapsed: boolean;
}

interface SidebarToggleProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function SidebarNav({ isCollapsed }: SidebarNavProps) {
  return (
    <nav className="sidebar-nav">
      {menuItems.map((item, index) => (
        <SidebarItem key={index} item={item} isCollapsed={isCollapsed} />
      ))}
    </nav>
  );
}

export function SidebarHeader({ isCollapsed }: SidebarHeaderProps) {
  return (
    <div className="sidebar-header">
      <div className={`logo ${isCollapsed ? "collapsed" : ""}`}>
        {isCollapsed ? (
          <img alt="iTMO Logo" className="logo-icon" />
        ) : (
          <img alt="iTMO Logo" className="logo-full" />
        )}
      </div>
    </div>
  );
}

export function SidebarToggle({ onToggle }: SidebarToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="hamburger-btn"
      aria-label="Toggle sidebar"
    >
      <MenuIcon />
    </button>
  );
}

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  return (
    <div className="sidebar-footer">
      <button className={`settings-btn ${isCollapsed ? "collapsed" : ""}`}>
        <FileBarChartIcon />
        {!isCollapsed && <span className="nav-label">SETTINGS</span>}
      </button>
    </div>
  );
}
