"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Code, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const scripts = [
  {
    id: "1",
    name: "memory_cleanup.sh",
    type: "Bash",
    description: "Cleans up memory by terminating idle processes",
    lastModified: "2024-01-10",
    usedBy: 3,
  },
  {
    id: "2",
    name: "db_health_check.py",
    type: "Python",
    description: "Checks database health and connection pool status",
    lastModified: "2024-01-08",
    usedBy: 5,
  },
  {
    id: "3",
    name: "log_rotate.sh",
    type: "Bash",
    description: "Archives and rotates log files",
    lastModified: "2024-01-05",
    usedBy: 2,
  },
  {
    id: "4",
    name: "service_restart.ps1",
    type: "PowerShell",
    description: "Restarts Windows services gracefully",
    lastModified: "2024-01-03",
    usedBy: 4,
  },
];

const typeColors: Record<string, string> = {
  Bash: "bg-success text-success-foreground",
  Python: "bg-primary text-primary-foreground",
  PowerShell: "bg-chart-5 text-primary-foreground",
};

export function ScriptRepositorySettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "Bash",
    description: "",
  });

  const handleOpen = (script?: (typeof scripts)[0]) => {
    if (script) {
      setEditingId(script.id);
      setFormData({
        name: script.name,
        type: script.type,
        description: script.description,
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", type: "Bash", description: "" });
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingId(null);
    setFormData({ name: "", type: "Bash", description: "" });
  };

  const handleSave = () => {
    // TODO: Implement actual save to backend
    console.log("[v0] Saving script:", { ...formData, id: editingId || "new" });
    handleClose();
  };

  return (
    <Card id="scripts" className="bg-card border-border">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-foreground">Script Repository</CardTitle>
            <CardDescription>Manage scripts used for remediation actions</CardDescription>
          </div>
          <Button onClick={() => handleOpen()} className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Add Script
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Script Name</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground hidden md:table-cell">Description</TableHead>
                <TableHead className="text-muted-foreground text-right">Used By</TableHead>
                <TableHead className="text-muted-foreground text-right w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scripts.map((script) => (
                <TableRow key={script.id} className="border-border">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="font-medium text-foreground font-mono text-sm truncate">
                        {script.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={typeColors[script.type]}>
                      {script.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate hidden md:table-cell">
                    {script.description}
                  </TableCell>
                  <TableCell className="text-foreground text-right">
                    {script.usedBy}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleOpen(script)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => {
                          console.log("[v0] Deleting script:", script.id);
                          // TODO: Implement delete functionality
                        }}
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingId ? "Edit Script" : "Add New Script"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update the script details below."
                : "Create a new remediation script."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="script-name" className="text-foreground text-sm font-medium">
                Script Name
              </Label>
              <Input
                id="script-name"
                placeholder="e.g., memory_cleanup.sh"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="script-type" className="text-foreground text-sm font-medium">
                Script Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger id="script-type" className="bg-background">
                  <SelectValue placeholder="Select script type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bash">Bash</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="PowerShell">PowerShell</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="script-description"
                className="text-foreground text-sm font-medium"
              >
                Description
              </Label>
              <Textarea
                id="script-description"
                placeholder="Describe what this script does..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="bg-background min-h-24"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose} className="bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Update Script" : "Create Script"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
