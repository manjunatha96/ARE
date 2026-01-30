"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";

interface MetadataFilterProps {
  onFilterChange?: (category: string, value: string) => void;
}

const categoryOptions = {
  "Event Type": ["Application", "System", "Database", "Network", "Security"],
  "Severity": ["Critical", "High", "Medium", "Low", "Info"],
  "Status": ["Active", "Resolved", "Pending", "Failed", "Silenced"],
  "Source": ["MySQL", "PostgreSQL", "MongoDB", "App Server", "Cache"],
};

export function MetadataFilter({ onFilterChange }: MetadataFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedValue("");
  };

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onFilterChange?.(selectedCategory, value);
  };

  const currentValues = selectedCategory 
    ? categoryOptions[selectedCategory as keyof typeof categoryOptions] || []
    : [];

  return (
    <Card className="bg-card border-border">
      <CardContent className="pt-4">
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <div className="flex gap-3 flex-1">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-40 bg-background">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(categoryOptions).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedValue} onValueChange={handleValueChange} disabled={!selectedCategory}>
              <SelectTrigger className="flex-1 bg-background">
                <SelectValue placeholder="Select value" />
              </SelectTrigger>
              <SelectContent>
                {currentValues.map((val) => (
                  <SelectItem key={val} value={val}>
                    {val}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {selectedCategory && selectedValue && (
          <p className="text-xs text-muted-foreground mt-2">
            Filtering by: <span className="font-medium text-foreground">{selectedCategory}</span> = <span className="font-medium text-foreground">{selectedValue}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
