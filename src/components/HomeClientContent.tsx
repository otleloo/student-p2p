"use client";

import { useState } from "react";
import { NewNavbar } from "@/components/NewNavbar";
import { AddResourceDialog } from "@/components/AddResourceDialog";
import { CreateCourseDialog } from "@/components/CreateCourseDialog";

export function HomeClientContent() {
  const [resourceDialogOpen, setResourceDialogOpen] = useState(false);
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);

  return (
    <>
      <NewNavbar
        setResourceDialogOpen={setResourceDialogOpen}
        setCourseDialogOpen={setCourseDialogOpen}
      />
      <AddResourceDialog
        open={resourceDialogOpen}
        onOpenChange={setResourceDialogOpen}
      />
      <CreateCourseDialog
        open={courseDialogOpen}
        onOpenChange={setCourseDialogOpen}
      />
    </>
  );
}
