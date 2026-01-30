"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Shield, Wifi } from "lucide-react";

interface NodeProfile {
  id: string;
  name: string;
  description: string;
  allowedIPs: string[];
  authRequired: boolean;
  isActive: boolean;
  lastModified: string;
}

const profiles: NodeProfile[] = [
  {
    id: "1",
    name: "Production Servers",
    description: "Primary production environment nodes",
    allowedIPs: ["192.168.1.0/24", "10.0.0.0/8"],
    authRequired: true,
    isActive: true,
    lastModified: "2025-01-20",
  },
  {
    id: "2",
    name: "Development Nodes",
    description: "Development and testing environment",
    allowedIPs: ["192.168.100.0/24"],
    authRequired: false,
    isActive: true,
    lastModified: "2025-01-15",
  },
  {
    id: "3",
    name: "Staging Cluster",
    description: "Pre-production staging environment",
    allowedIPs: ["172.16.0.0/12"],
    authRequired: true,
    isActive: false,
    lastModified: "2025-01-10",
  },
];

interface NodeProfileListProps {
  onAdd: () => void;
  onEdit: (profile: NodeProfile) => void;
  onDelete: (id: string) => void;
}

export function NodeProfileList({ onAdd, onEdit, onDelete }: NodeProfileListProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-foreground">Node Profiles</CardTitle>
            <CardDescription>
              Manage node configurations and event source validation
            </CardDescription>
          </div>
          <Button onClick={onAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            New Profile
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">IP Addresses</TableHead>
                <TableHead className="text-muted-foreground">Auth</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id} className="border-border">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{profile.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {profile.description}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Wifi className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {profile.allowedIPs.length} subnet(s)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {profile.authRequired ? (
                      <Badge variant="secondary" className="gap-1">
                        <Shield className="h-3 w-3" />
                        Required
                      </Badge>
                    ) : (
                      <Badge variant="outline">Not Required</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={profile.isActive ? "default" : "outline"}
                      className={
                        profile.isActive ? "bg-green-600" : "bg-muted text-muted-foreground"
                      }
                    >
                      {profile.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onEdit(profile)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        onClick={() => onDelete(profile.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
