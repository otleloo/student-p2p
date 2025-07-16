export const dynamic = 'force-dynamic';

import { getAllResources } from "@/app/actions/getAllResources";
import { ResourceFilter } from "@/components/ResourceFilter";
import { ResourceList } from "@/components/ResourceList";

export default async function ResourcesPage({ searchParams }: { searchParams?: { query?: string; fileType?: string; unit?: string } }) {
  const query = searchParams?.query;
  const fileType = searchParams?.fileType;
  const unit = searchParams?.unit;

  const { resources, error } = await getAllResources(query, fileType, unit);

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Resources</h1>

      <ResourceFilter initialQuery={query} initialFileType={fileType} initialUnit={unit} />

      <ResourceList resources={resources} />
    </div>
  );
}