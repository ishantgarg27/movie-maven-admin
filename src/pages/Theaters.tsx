import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TheaterForm } from "@/components/TheaterForm";

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

      <Dialog open={isAddTheaterOpen} onOpenChange={setIsAddTheaterOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Theater</DialogTitle>
          </DialogHeader>
          <TheaterForm onSuccess={() => setIsAddTheaterOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Theaters;