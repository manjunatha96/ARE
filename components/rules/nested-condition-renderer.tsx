"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Condition,
  ConditionGroup,
  SimpleCondition,
  isSimpleCondition,
  isConditionGroup,
  createSimpleCondition,
  createConditionGroup,
} from "@/lib/condition-types";
import { cn } from "@/lib/utils";

interface NestedConditionRendererProps {
  condition: Condition | ConditionGroup;
  onUpdate: (condition: Condition | ConditionGroup) => void;
  onDelete: () => void;
  level?: number;
  canDelete?: boolean;
}

export function NestedConditionRenderer({
  condition,
  onUpdate,
  onDelete,
  level = 0,
  canDelete = true,
}: NestedConditionRendererProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (isSimpleCondition(condition)) {
    return (
      <div
        className={cn(
          "relative rounded-lg border border-border p-4 bg-muted/30 space-y-3",
          level > 0 && "ml-4"
        )}
      >
        <div className="absolute right-4 top-4 flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const group = createConditionGroup();
              onUpdate(group);
            }}
            className="h-8 w-8 text-primary hover:bg-primary/10"
            title="Convert to group"
          >
            <Plus className="h-4 w-4" />
          </Button>
          {canDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="h-8 w-8 text-destructive hover:bg-destructive/10"
              title="Delete condition"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-3 pr-28">
          <div className="space-y-2">
            <Label className="text-foreground text-sm font-medium">Field</Label>
            <Select
              value={condition.field}
              onValueChange={(value) => {
                onUpdate({ ...condition, field: value });
              }}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event_name">Event Name</SelectItem>
                <SelectItem value="event_status">Event Status</SelectItem>
                <SelectItem value="severity">Severity</SelectItem>
                <SelectItem value="source_ip">Source IP</SelectItem>
                <SelectItem value="group_key">Group Key</SelectItem>
                <SelectItem value="event_source">Event Source</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-foreground text-sm font-medium">
              Operator
            </Label>
            <Select
              value={condition.operator}
              onValueChange={(value) => {
                onUpdate({ ...condition, operator: value });
              }}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select operator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equals">Equals</SelectItem>
                <SelectItem value="not_equals">Not Equals</SelectItem>
                <SelectItem value="contains">Contains</SelectItem>
                <SelectItem value="starts_with">Starts With</SelectItem>
                <SelectItem value="ends_with">Ends With</SelectItem>
                <SelectItem value="greater_than">Greater Than</SelectItem>
                <SelectItem value="less_than">Less Than</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-foreground text-sm font-medium">Value</Label>
            <Select
              value={condition.value}
              onValueChange={(value) => {
                if (value === "__custom__") {
                  // Keep current value if custom is selected and there's already a value
                  // Otherwise it will be edited in the input
                } else {
                  onUpdate({ ...condition, value });
                }
              }}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select or enter value" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="stopped">Stopped</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="__custom__">Enter Custom Value</SelectItem>
              </SelectContent>
            </Select>
            {condition.value && condition.value !== "__custom__" && (
              <Input
                placeholder="Or type custom value"
                value={condition.value}
                onChange={(e) => {
                  onUpdate({ ...condition, value: e.target.value });
                }}
                className="bg-background text-sm"
              />
            )}
            {(!condition.value || condition.value === "__custom__") && (
              <Input
                placeholder="Enter custom value"
                value={condition.value === "__custom__" ? "" : condition.value}
                onChange={(e) => {
                  onUpdate({ ...condition, value: e.target.value });
                }}
                className="bg-background"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isConditionGroup(condition)) {
    return (
      <div className={cn("space-y-3", level > 0 && "ml-4 rounded-lg border border-dashed border-border p-4")}>
        {level > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-6 w-6"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              <span className="text-xs text-muted-foreground font-medium">
                GROUP
              </span>
              {level > 1 && (
                <Select
                  value={condition.operator}
                  onValueChange={(value) => {
                    onUpdate({
                      ...condition,
                      operator: value as "AND" | "OR",
                    });
                  }}
                >
                  <SelectTrigger className="w-24 bg-background text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AND">AND</SelectItem>
                    <SelectItem value="OR">OR</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            {canDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onDelete}
                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                title="Delete group"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        {isExpanded && (
          <div className="space-y-3">
            {condition.conditions.map((subCondition, index) => (
              <div key={subCondition.id} className="space-y-3">
                {index > 0 && level === 0 && (
                  <div className="flex items-center gap-2 px-2">
                    <div className="h-px flex-1 bg-border" />
                    <Select
                      value={condition.operator}
                      onValueChange={(value) => {
                        onUpdate({
                          ...condition,
                          operator: value as "AND" | "OR",
                        });
                      }}
                    >
                      <SelectTrigger className="w-24 bg-background text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AND">AND</SelectItem>
                        <SelectItem value="OR">OR</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                )}

                <NestedConditionRenderer
                  condition={subCondition}
                  onUpdate={(updated) => {
                    const newConditions = [...condition.conditions];
                    newConditions[index] = updated;
                    onUpdate({ ...condition, conditions: newConditions });
                  }}
                  onDelete={() => {
                    const newConditions = condition.conditions.filter(
                      (_, i) => i !== index
                    );
                    if (newConditions.length === 0) {
                      onDelete();
                    } else if (newConditions.length === 1 && level === 0) {
                      onUpdate(newConditions[0]);
                    } else {
                      onUpdate({ ...condition, conditions: newConditions });
                    }
                  }}
                  level={level + 1}
                  canDelete={condition.conditions.length > 1}
                />
              </div>
            ))}

            <Button
              variant="outline"
              onClick={() => {
                const newConditions = [
                  ...condition.conditions,
                  createSimpleCondition(),
                ];
                onUpdate({ ...condition, conditions: newConditions });
              }}
              className="gap-2 bg-transparent w-full"
            >
              <Plus className="h-4 w-4" />
              Add Condition
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                const newGroup = createConditionGroup();
                const newConditions = [
                  ...condition.conditions,
                  newGroup,
                ];
                onUpdate({ ...condition, conditions: newConditions });
              }}
              className="gap-2 bg-transparent w-full"
            >
              <Plus className="h-4 w-4" />
              Add Condition Group
            </Button>
          </div>
        )}
      </div>
    );
  }

  return null;
}
