"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";
export default function Test() { 
  const handleClick = (mode) => {
    mode
      ? toast.success("This is a success message!")
      : toast.error("This is an error message!");
  };

  return (
    <div>
      <h1>Test Component</h1>
      <Button onClick={() => handleClick(true)}>Show Success Toast</Button>
      <Button onClick={() => handleClick(false)}>Show Error Toast</Button>
    </div>
  );
}
