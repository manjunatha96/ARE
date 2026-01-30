"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Settings, AlertTriangle} from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { id: "general", label: "General", icon: Settings },
  { id: "severity", label: "Severity Mapping", icon: AlertTriangle }
];

export function SettingsNav() {
  const [activeSection, setActiveSection] = useState("general");

  useEffect(() => {
    const observers = navItems.map((item) => {
      const element = document.getElementById(item.id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.id);
          }
        },
        { threshold: 0.3, rootMargin: "-100px 0px -66% 0px" }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => {
        if (observer) observer.disconnect();
      });
    };
  }, []);

  return (
    <Card className="bg-card border-border sticky top-24">
      <CardContent className="p-2">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                activeSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}
