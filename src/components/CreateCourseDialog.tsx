"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createCourse } from "@/app/actions/createCourse";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getVenues } from "@/app/actions/getVenues";
import { toast } from "sonner";

export function CreateCourseDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [venues, setVenues] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    async function fetchVenues() {
      const fetchedVenues = await getVenues();
      setVenues(fetchedVenues);
    }
    fetchVenues();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await createCourse(formData);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Course created successfully!");
      onOpenChange(false); // Close the dialog on success
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Course</DialogTitle>
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
              <Label htmlFor="tokenType" className="text-right">
                Token Type
              </Label>
              <RadioGroup defaultValue="SILVER" name="tokenType" className="col-span-3 flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="SILVER" id="silver" />
                  <Label htmlFor="silver">Silver (200 coins)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="GOLD" id="gold" />
                  <Label htmlFor="gold">Gold (500 coins)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="DIAMOND" id="diamond" />
                  <Label htmlFor="diamond">Diamond (1000 coins)</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateTime" className="text-right">
                Date and Time
              </Label>
              <Input id="dateTime" name="dateTime" type="datetime-local" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="durationHours" className="text-right">
                Duration (Hours)
              </Label>
              <Input id="durationHours" name="durationHours" type="number" min="0" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="durationMinutes" className="text-right">
                Duration (Minutes)
              </Label>
              <Input id="durationMinutes" name="durationMinutes" type="number" min="0" max="59" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="venueId" className="text-right">
                Venue
              </Label>
              <Select name="venueId">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a venue" />
                </SelectTrigger>
                <SelectContent>
                  {venues.map((venue) => (
                    <SelectItem key={venue.id} value={venue.id}>
                      {venue.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit">Create Course</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
