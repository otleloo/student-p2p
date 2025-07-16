"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import Comp317 from "@/components/comp-317";

export default function InfoMenu() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
    content: "",
  });

  const handleMenuItemClick = (type: string) => {
    let title = "";
    let description = "";
    let content = "";

    switch (type) {
      case "about":
        title = "About Us";
        description = "Learn more about our platform.";
        content = "Our P2P Learning Platform connects students, enabling them to create, book, and share courses and resources. We believe in collaborative learning and empowering students to teach and learn from each other.";
        break;
      case "contact":
        title = "Contact Us";
        description = "Get in touch with our support team.";
        content = "Email: support@p2plearning.com\nPhone: +1 (123) 456-7890\nAddress: 123 Learning Lane, Knowledge City, KC 12345";
        break;
      case "help":
        title = "Help & Support";
        description = "Find answers to common questions.";
        content = "For frequently asked questions, please visit our FAQ section. If you need further assistance, feel free to contact us via email or phone. Our support team is available Monday to Friday, 9 AM - 5 PM.";
        break;
      default:
        break;
    }
    setDialogContent({ title, description, content });
    setDialogOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="text-muted-foreground size-8 rounded-full shadow-none"
            aria-label="Open info menu"
          >
            <InfoIcon size={16} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Information</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => handleMenuItemClick("about")}>About Us</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleMenuItemClick("contact")}>Contact</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleMenuItemClick("help")}>Help</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <DialogDescription>{dialogContent.description}</DialogDescription>
          </DialogHeader>
          <Comp317 title={dialogContent.title} content={dialogContent.content} />
        </DialogContent>
      </Dialog>
    </>
  );
}