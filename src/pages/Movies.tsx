import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MovieForm } from "@/components/MovieForm";

const Movies = () => {
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Movies</h1>
        <Button onClick={() => setIsAddMovieOpen(true)}>
          <Plus className="mr-2" />
          Add Movie
        </Button>
      </div>

      <Dialog open={isAddMovieOpen} onOpenChange={setIsAddMovieOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Movie</DialogTitle>
          </DialogHeader>
          <MovieForm onSuccess={() => setIsAddMovieOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Movies;