"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NodeProfile {
  id: string;
  name: string;
  description: string;
  nodeGroup?: string;
  allowedIPs: string[];
  authRequired: boolean;
  authType: "bearer" | "api_key" | "basic";
  payloadMapping: Record<string, string>;
  transformationRules: Array<{ sourceField: string; targetField: string; transformation: string }>;
  isActive: boolean;
  severityMapping?: Array<{
    keyword: string;
    severity: "critical" | "high" | "medium" | "low";
    autoRemediate: boolean;
  }>;
  validationRules?: {
    requireEventSource: boolean;
    requireEventName: boolean;
    maxPayloadSize: number;
  };
}

interface NodeProfileFormProps {
  profile?: NodeProfile;
  onSave: (profile: NodeProfile) => void;
  onCancel: () => void;
}

const DEFAULT_VALIDATION_RULES = {
  requireEventSource: true,
  requireEventName: true,
  maxPayloadSize: 1048576,
};

const INTERNAL_EVENT_SCHEMA = {
  eventId: "Unique event identifier",
  eventName: "Name of the event",
  eventSource: "Source system",
  severity: "Event severity level",
  timestamp: "Event occurrence time",
  payload: "Event data",
  nodeId: "Source node identifier",
};

export function NodeProfileForm({ profile, onSave, onCancel }: NodeProfileFormProps) {
  const [formData, setFormData] = useState<NodeProfile>(
    profile || {
      id: "",
      name: "",
      description: "",
      nodeGroup: "",
      allowedIPs: [""],
      authRequired: false,
      authType: "bearer",
      payloadMapping: {},
      transformationRules: [],
      isActive: true,
      severityMapping: [],
      validationRules: DEFAULT_VALIDATION_RULES,
    }
  );

  const [expandedSections, setExpandedSections] = useState({
    ips: true,
    auth: false,
    validation: false,
    mapping: false,
    transformation: false,
    severity: false,
  });

  const [nodeGroups, setNodeGroups] = useState<string[]>([
    "Production",
    "Staging",
    "Development",
  ]);
  const [newGroupName, setNewGroupName] = useState("");
  const [showNewGroupInput, setShowNewGroupInput] = useState(false);

  const addIP = () => {
    setFormData({
      ...formData,
      allowedIPs: [...formData.allowedIPs, ""],
    });
  };

  const removeIP = (index: number) => {
    setFormData({
      ...formData,
      allowedIPs: formData.allowedIPs.filter((_, i) => i !== index),
    });
  };

  const updateIP = (index: number, value: string) => {
    const newIPs = [...formData.allowedIPs];
    newIPs[index] = value;
    setFormData({ ...formData, allowedIPs: newIPs });
  };

  const addPayloadMapping = () => {
    setFormData({
      ...formData,
      payloadMapping: {
        ...formData.payloadMapping,
        [`incoming_field_${Object.keys(formData.payloadMapping).length}`]: "",
      },
    });
  };

  const removePayloadMapping = (key: string) => {
    const newMapping = { ...formData.payloadMapping };
    delete newMapping[key];
    setFormData({ ...formData, payloadMapping: newMapping });
  };

  const updatePayloadMapping = (key: string, value: string) => {
    setFormData({
      ...formData,
      payloadMapping: { ...formData.payloadMapping, [key]: value },
    });
  };

  const addTransformation = () => {
    setFormData({
      ...formData,
      transformationRules: [
        ...formData.transformationRules,
        { sourceField: "", targetField: "", transformation: "direct" },
      ],
    });
  };

  const removeTransformation = (index: number) => {
    setFormData({
      ...formData,
      transformationRules: formData.transformationRules.filter((_, i) => i !== index),
    });
  };

  const updateTransformation = (index: number, field: string, value: string) => {
    const newRules = [...formData.transformationRules];
    newRules[index] = { ...newRules[index], [field]: value };
    setFormData({ ...formData, transformationRules: newRules });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const addNewNodeGroup = () => {
    if (newGroupName.trim() && !nodeGroups.includes(newGroupName.trim())) {
      setNodeGroups([...nodeGroups, newGroupName.trim()]);
      setFormData({ ...formData, nodeGroup: newGroupName.trim() });
      setNewGroupName("");
      setShowNewGroupInput(false);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">
          {profile ? "Edit Node Profile" : "Create Node Profile"}
        </CardTitle>
        <CardDescription>
          Configure node properties, event validation, and payload mapping for the remediation engine
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground text-sm font-medium">
              Profile Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Production Servers"
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nodeGroup" className="text-foreground text-sm font-medium">
              Node Group
            </Label>
            <Select value={formData.nodeGroup || ""} onValueChange={(value) => {
              if (value === "__new__") {
                setShowNewGroupInput(true);
              } else {
                setFormData({ ...formData, nodeGroup: value });
              }
            }}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select or create group" />
              </SelectTrigger>
              <SelectContent>
                {nodeGroups.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
                <SelectItem value="__new__" className="font-medium">
                  + Create New Group
                </SelectItem>
              </SelectContent>
            </Select>
            {showNewGroupInput && (
              <div className="flex gap-2 mt-2">
                <Input
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Enter group name"
                  className="bg-background"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addNewNodeGroup();
                  }}
                />
                <Button
                  size="sm"
                  onClick={addNewNodeGroup}
                  variant="outline"
                  className="bg-transparent"
                >
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setShowNewGroupInput(false);
                    setNewGroupName("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
          <div className="space-y-2 flex flex-col">
            <Label className="text-foreground text-sm font-medium">Active</Label>
            <div className="flex items-center pt-1">
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-foreground text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the purpose and usage of this node profile"
            className="bg-background min-h-20"
          />
        </div>

        {/* Allowed IPs Section */}
        <div className="border border-border rounded-lg">
          <button
            onClick={() => toggleSection("ips")}
            className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
          >
            <div>
              <h3 className="text-foreground font-medium text-sm">Allowed IP Addresses</h3>
              <p className="text-muted-foreground text-xs">Control which IPs can send events</p>
            </div>
            {expandedSections.ips ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {expandedSections.ips && (
            <div className="border-t border-border p-4 space-y-3 bg-muted/30">
              {formData.allowedIPs.map((ip, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={ip}
                    onChange={(e) => updateIP(index, e.target.value)}
                    placeholder="192.168.1.0/24"
                    className="bg-background"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeIP(index)}
                    disabled={formData.allowedIPs.length === 1}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addIP}
                className="gap-2 bg-transparent w-full"
              >
                <Plus className="h-4 w-4" />
                Add IP Address
              </Button>
            </div>
          )}
        </div>

        {/* Authentication Section */}
        <div className="border border-border rounded-lg">
          <button
            onClick={() => toggleSection("auth")}
            className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
          >
            <div>
              <h3 className="text-foreground font-medium text-sm">Authentication</h3>
              <p className="text-muted-foreground text-xs">Configure authentication requirements</p>
            </div>
            {expandedSections.auth ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {expandedSections.auth && (
            <div className="border-t border-border p-4 space-y-3 bg-muted/30">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label className="text-foreground text-sm font-medium">
                    Require Authentication
                  </Label>
                  <p className="text-muted-foreground text-xs">
                    Incoming requests must include auth credentials
                  </p>
                </div>
                <Switch
                  checked={formData.authRequired}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, authRequired: checked })
                  }
                />
              </div>

              {formData.authRequired && (
                <div className="space-y-2">
                  <Label className="text-foreground text-sm font-medium">Auth Type</Label>
                  <Select
                    value={formData.authType}
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, authType: value })
                    }
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bearer">Bearer Token</SelectItem>
                      <SelectItem value="api_key">API Key</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Event Validation Section */}
        <div className="border border-border rounded-lg">
          <button
            onClick={() => toggleSection("validation")}
            className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
          >
            <div>
              <h3 className="text-foreground font-medium text-sm">Event Validation Rules</h3>
              <p className="text-muted-foreground text-xs">
                Validate incoming events before acceptance
              </p>
            </div>
            {expandedSections.validation ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {expandedSections.validation && (
            <div className="border-t border-border p-4 space-y-4 bg-muted/30">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground text-sm font-medium">
                    Require Event Source
                  </Label>
                  <p className="text-muted-foreground text-xs">
                    Event must specify a source system
                  </p>
                </div>
                <Switch
                  checked={formData.validationRules?.requireEventSource ?? true}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      validationRules: {
                        ...formData.validationRules,
                        requireEventSource: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground text-sm font-medium">
                    Require Event Name
                  </Label>
                  <p className="text-muted-foreground text-xs">
                    Event must have a descriptive name
                  </p>
                </div>
                <Switch
                  checked={formData.validationRules?.requireEventName ?? true}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      validationRules: {
                        ...formData.validationRules,
                        requireEventName: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground text-sm font-medium">
                  Max Payload Size (bytes)
                </Label>
                <Input
                  type="number"
                  value={formData.validationRules?.maxPayloadSize ?? 1048576}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      validationRules: {
                        ...formData.validationRules,
                        maxPayloadSize: parseInt(e.target.value),
                      },
                    })
                  }
                  className="bg-background"
                />
                <p className="text-muted-foreground text-xs">
                  Default: 1MB (1048576 bytes)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Payload Mapping Section */}
        <div className="border border-border rounded-lg">
          <button
            onClick={() => toggleSection("mapping")}
            className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
          >
            <div>
              <h3 className="text-foreground font-medium text-sm">Payload Field Mapping</h3>
              <p className="text-muted-foreground text-xs">
                Map incoming payload fields to internal event schema
              </p>
            </div>
            {expandedSections.mapping ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {expandedSections.mapping && (
            <div className="border-t border-border p-4 space-y-4 bg-muted/30">
              <div className="grid gap-4">
                <div>
                  <Label className="text-foreground text-sm font-medium mb-2 block">
                    Internal Event Schema
                  </Label>
                  <div className="bg-background rounded-lg p-3 space-y-1">
                    {Object.entries(INTERNAL_EVENT_SCHEMA).map(([field, description]) => (
                      <div key={field} className="text-xs">
                        <Badge variant="outline" className="mr-2">
                          {field}
                        </Badge>
                        <span className="text-muted-foreground">{description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-foreground text-sm font-medium">
                    Incoming Field Mappings
                  </Label>
                  {Object.entries(formData.payloadMapping).map(([incomingField, targetField]) => (
                    <div key={incomingField} className="flex gap-2">
                      <Input
                        placeholder="Incoming field name"
                        value={incomingField}
                        readOnly
                        className="bg-background text-muted-foreground"
                      />
                      <span className="flex items-center text-muted-foreground">→</span>
                      <Select
                        value={targetField}
                        onValueChange={(value) =>
                          updatePayloadMapping(incomingField, value)
                        }
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select target field" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(INTERNAL_EVENT_SCHEMA).map((field) => (
                            <SelectItem key={field} value={field}>
                              {field}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removePayloadMapping(incomingField)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addPayloadMapping}
                    className="gap-2 bg-transparent w-full"
                  >
                    <Plus className="h-4 w-4" />
                    Add Mapping
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Transformation Rules Section */}
        <div className="border border-border rounded-lg">
          <button
            onClick={() => toggleSection("transformation")}
            className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
          >
            <div>
              <h3 className="text-foreground font-medium text-sm">Transformation Rules</h3>
              <p className="text-muted-foreground text-xs">
                Apply transformations to normalize incoming data
              </p>
            </div>
            {expandedSections.transformation ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {expandedSections.transformation && (
            <div className="border-t border-border p-4 space-y-3 bg-muted/30">
              {formData.transformationRules.map((rule, index) => (
                <div key={index} className="border border-border rounded-lg p-3 space-y-2 bg-background">
                  <div className="grid gap-2 sm:grid-cols-3">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Source Field</Label>
                      <Input
                        value={rule.sourceField}
                        onChange={(e) =>
                          updateTransformation(index, "sourceField", e.target.value)
                        }
                        placeholder="e.g., error_code"
                        className="bg-muted text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Target Field</Label>
                      <Input
                        value={rule.targetField}
                        onChange={(e) =>
                          updateTransformation(index, "targetField", e.target.value)
                        }
                        placeholder="e.g., severity"
                        className="bg-muted text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Transformation</Label>
                      <Select
                        value={rule.transformation}
                        onValueChange={(value) =>
                          updateTransformation(index, "transformation", value)
                        }
                      >
                        <SelectTrigger className="bg-muted text-xs h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="direct">Direct Mapping</SelectItem>
                          <SelectItem value="uppercase">Uppercase</SelectItem>
                          <SelectItem value="lowercase">Lowercase</SelectItem>
                          <SelectItem value="parse_json">Parse JSON</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTransformation(index)}
                    className="text-destructive hover:text-destructive w-full h-8"
                  >
                    <Trash2 className="h-3 w-3 mr-2" />
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addTransformation}
                className="gap-2 bg-transparent w-full"
              >
                <Plus className="h-4 w-4" />
                Add Transformation Rule
              </Button>
            </div>
          )}
        </div>

        {/* Severity Mapping Section */}
        <div className="border border-border rounded-lg">
          <button
            onClick={() => toggleSection("severity")}
            className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
          >
            <div>
              <h3 className="text-foreground font-medium text-sm">Severity Mapping</h3>
              <p className="text-muted-foreground text-xs">
                Map event keywords to severity levels
              </p>
            </div>
            {expandedSections.severity ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {expandedSections.severity && (
            <div className="border-t border-border p-4 space-y-4 bg-muted/30">
              <div className="space-y-3">
                {(formData.severityMapping || []).map((mapping, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <Input
                      value={mapping.keyword}
                      onChange={(e) => {
                        const updated = [...(formData.severityMapping || [])];
                        updated[index].keyword = e.target.value;
                        setFormData({ ...formData, severityMapping: updated });
                      }}
                      placeholder="Keyword (e.g., FATAL, ERROR)"
                      className="bg-background"
                    />
                    <Select
                      value={mapping.severity}
                      onValueChange={(value: any) => {
                        const updated = [...(formData.severityMapping || [])];
                        updated[index].severity = value;
                        setFormData({ ...formData, severityMapping: updated });
                      }}
                    >
                      <SelectTrigger className="bg-background w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2 pt-2">
                      <Switch
                        checked={mapping.autoRemediate}
                        onCheckedChange={(checked) => {
                          const updated = [...(formData.severityMapping || [])];
                          updated[index].autoRemediate = checked;
                          setFormData({ ...formData, severityMapping: updated });
                        }}
                      />
                      <Label className="text-xs text-muted-foreground">Auto-remediate</Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updated = (formData.severityMapping || []).filter((_, i) => i !== index);
                        setFormData({ ...formData, severityMapping: updated });
                      }}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  const updated = [...(formData.severityMapping || [])];
                  updated.push({ keyword: "", severity: "medium", autoRemediate: false });
                  setFormData({ ...formData, severityMapping: updated });
                }}
                className="gap-2 bg-transparent w-full"
              >
                <Plus className="h-4 w-4" />
                Add Severity Mapping
              </Button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 bg-transparent"
          >
            Cancel
          </Button>
          <Button onClick={() => onSave(formData)} className="flex-1">
            {profile ? "Update Profile" : "Create Profile"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
