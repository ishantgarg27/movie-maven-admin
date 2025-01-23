import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { movieService } from "@/services/movieService";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { MovieForm } from "./MovieForm";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "./ui/use-toast";

export function MovieList() {
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: movies, isLoading } = useQuery({
    queryKey: ['movies'],
    queryFn: movieService.getAllMovies,
  });

  const deleteMutation = useMutation({
    mutationFn: movieService.deleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      toast({
        title: "Success",
        description: "Movie deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete movie",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {movies?.map((movie: any) => (
        <div key={movie.id} className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border">
          <img 
            src={movie.imageUrl} 
            alt={movie.title} 
            className="w-24 h-36 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{movie.title}</h3>
            <p className="text-muted-foreground">{movie.duration}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSelectedMovie(movie);
                setIsEditOpen(true);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => deleteMutation.mutate(movie.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Movie</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[calc(90vh-8rem)] pr-4">
            <MovieForm 
              initialData={selectedMovie}
              onSuccess={() => {
                setIsEditOpen(false);
                queryClient.invalidateQueries({ queryKey: ['movies'] });
              }} 
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}