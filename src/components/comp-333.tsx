"use client"

import * as React from "react"
import {
  SearchIcon,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { searchCourses } from "@/app/actions/searchCourses";
import { useRouter } from "next/navigation";

export default function Component() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length > 2) {
        await searchCourses(searchTerm);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    router.push(`/home?query=${query}`);
  };

  return (
    <div className="relative w-full">
      <SearchIcon
        className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        type="search"
        placeholder="Search courses..."
        className="w-full appearance-none bg-background pl-8 shadow-none"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}
