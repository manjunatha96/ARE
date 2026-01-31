"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  LayoutDashboard,
  Workflow,
  Globe,
  Calendar,
  Activity,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Server,
  RotateCcw,
  Package,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href?: string;
  icon: any;
  submenu?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Rule Engine",
    href: "/rules",
    icon: Workflow,
  },
  {
    title: "Event Management",
    href: "/events",
    icon: Calendar,
  },
  {
    title: "Node Profiles",
    href: "/node-profiles",
    icon: Server,
  },
  {
    title: "Retry Policies",
    href: "/retry-policies",
    icon: RotateCcw,
  },
  {
    title: "Repository",
    href: "/repository",
    icon: Package,
    submenu: [
      {
        title: "Scripts",
        href: "/repository/scripts",
      },
      {
        title: "Outbound APIs",
        href: "/repository/outbound",
      },
    ],
  },
  {
    title: "Audit & Compliance",
    href: "/audit-compliance",
    icon: Shield,
  },
];

const adminNavItems: NavItem[] = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Activity Log",
    href: "/activity-log",
    icon: Activity,
  },
  {
    title: "Lock Management",
    href: "/lock-management",
    icon: Lock,
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>("/repository");

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">ARE Platform</span>
          </Link>
        )}
        {collapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary mx-auto">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("h-8 w-8", collapsed && "absolute right-2 top-4")}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            const isExpanded = expandedMenu === item.href;
            const hasSubmenu = item.submenu && item.submenu.length > 0;

            return (
              <li key={item.href || item.title}>
                <div className="flex items-center">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  ) : (
                    <button
                      className={cn(
                        "flex-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                        "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </button>
                  )}
                  {!collapsed && hasSubmenu && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setExpandedMenu(isExpanded ? null : item.href)}
                      className="h-8 w-8"
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </Button>
                  )}
                </div>

                {!collapsed && hasSubmenu && isExpanded && (
                  <ul className="ml-6 mt-1 space-y-1 border-l border-border pl-3">
                    {item.submenu!.map((subitem) => {
                      const isSubActive = pathname === subitem.href;
                      return (
                        <li key={subitem.href}>
                          <Link
                            href={subitem.href}
                            className={cn(
                              "block rounded-lg px-3 py-2 text-sm transition-colors",
                              isSubActive
                                ? "bg-primary text-primary-foreground font-medium"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            {subitem.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {!collapsed && (
        <div className="border-t border-border p-4">
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs font-medium text-foreground">System Status</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground">All systems operational</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
