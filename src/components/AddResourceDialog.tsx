import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Comp551 from "@/components/comp-551";
import { addResource } from "@/app/actions/addResource";
import { useState } from "react";
import { toast } from "sonner";

export function AddResourceDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    console.log("Client - selectedFiles before append:", selectedFiles);
    selectedFiles.forEach((file, index) => {
      formData.append(`file-${index}`, file);
    });

    const result = await addResource(formData);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Resource(s) uploaded successfully!");
      onOpenChange(false); // Close dialog on success
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Resource</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">
                Unit
              </Label>
              <Input id="unit" name="unit" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" name="title" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input id="description" name="description" className="col-span-3" />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">File</Label>
              <div className="col-span-3">
                <Comp551
                  onFilesChange={(newFiles) => setSelectedFiles(newFiles.map(f => f.file as File))}
                />
              </div>
            </div>
          </div>
          <Button type="submit">Add Resource</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}