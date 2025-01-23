import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TheaterForm } from "@/components/TheaterForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TheaterList } from "@/components/TheaterList";

const Theaters = () => {
  const [isAddTheaterOpen, setIsAddTheaterOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Theaters</h1>
        <Button onClick={() => setIsAddTheaterOpen(true)}>
          <Plus className="mr-2" />
          Add Theater
        </Button>
      </div>

      <TheaterList />

      <Dialog open={isAddTheaterOpen} onOpenChange={setIsAddTheaterOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Add New Theater</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[calc(90vh-8rem)] pr-4">
            <TheaterForm onSuccess={() => setIsAddTheaterOpen(false)} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Theaters;