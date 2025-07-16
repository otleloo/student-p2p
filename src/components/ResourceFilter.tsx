"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ResourceFilter({
  initialQuery,
  initialFileType,
  initialUnit,
}: {
  initialQuery?: string;
  initialFileType?: string;
  initialUnit?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(initialQuery || "");
  const [selectedFileType, setSelectedFileType] = useState<string | null>(initialFileType || null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(initialUnit || null);

  const handleSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      newSearchParams.set("query", searchQuery);
    } else {
      newSearchParams.delete("query");
    }
    if (selectedFileType) {
      newSearchParams.set("fileType", selectedFileType);
    } else {
      newSearchParams.delete("fileType");
    }
    if (selectedUnit) {
      newSearchParams.set("unit", selectedUnit);
    } else {
      newSearchParams.delete("unit");
    }
    router.push(`/resources?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Input
        type="text"
        placeholder="Search resources..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow"
      />
      <Select value={selectedFileType || ""} onValueChange={setSelectedFileType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="File Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={null}>All Types</SelectItem>
          <SelectItem value="pdf">PDF</SelectItem>
          <SelectItem value="word">Word Document</SelectItem>
          <SelectItem value="text">Text File</SelectItem>
          <SelectItem value="image">Image</SelectItem>
        </SelectContent>
      </Select>
      <Select value={selectedUnit || ""} onValueChange={setSelectedUnit}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Unit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={null}>All Units</SelectItem>
          <SelectItem value="COMP331">COMP331</SelectItem>
          <SelectItem value="COMP333">COMP333</SelectItem>
          <SelectItem value="COMP551">COMP551</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleSearch}>Apply Filters</Button>
    </div>
  );
}
