"use client";

import { Button } from "@/components/ui/button";
import { FileIcon } from "lucide-react";
import { recordDownload } from "@/app/actions/recordDownload";

interface ResourceCardProps {
  resource: {
    id: string;
    title: string;
    description: string;
    unit: string;
    fileUrl: string;
    fileType: string;
    creator: { username: string };
    createdAt: Date; // Changed to Date type
  };
}

function ResourceCard({ resource }: ResourceCardProps) {
  const handleDownload = async () => {
    await recordDownload(resource.id);
    window.open(resource.fileUrl, '_blank');
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return <FileIcon className="h-5 w-5 text-red-500" />;
    if (fileType.includes("word") || fileType.includes("document")) return <FileIcon className="h-5 w-5 text-blue-500" />;
    if (fileType.includes("text")) return <FileIcon className="h-5 w-5 text-gray-500" />;
    if (fileType.includes("image")) return <FileIcon className="h-5 w-5 text-green-500" />;
    return <FileIcon className="h-5 w-5" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{resource.title}</h2>
        {getFileIcon(resource.fileType)}
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{resource.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>Unit: {resource.unit}</span>
        <span>By: {resource.creator.username}</span>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
        <span>Uploaded: {resource.createdAt.toLocaleDateString()}</span>
        <Button size="sm" onClick={handleDownload}>
          Download
        </Button>
      </div>
    </div>
  );
}

export function ResourceList({ resources }: { resources: ResourceCardProps['resource'][] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources && resources.length > 0 ? (
        resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No resources found.</p>
      )}
    </div>
  );
}
