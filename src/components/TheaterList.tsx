import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { theaterService } from "@/services/theaterService";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { TheaterForm } from "./TheaterForm";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "./ui/use-toast";

export function TheaterList() {
  const [selectedTheater, setSelectedTheater] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: theaters, isLoading } = useQuery({
    queryKey: ['theaters'],
    queryFn: theaterService.getAllTheaters,
  });

  const deleteMutation = useMutation({
    mutationFn: theaterService.deleteTheater,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['theaters'] });
      toast({
        title: "Success",
        description: "Theater deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete theater",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {theaters?.map((theater: any) => (
        <div key={theater.id} className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{theater.name}</h3>
            <p className="text-muted-foreground">{theater.location}</p>
            <p className="text-sm text-muted-foreground">Total Seats: {theater.totalSeats}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSelectedTheater(theater);
                setIsEditOpen(true);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => deleteMutation.mutate(theater.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Theater</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[calc(90vh-8rem)] pr-4">
            <TheaterForm 
              initialData={selectedTheater}
              onSuccess={() => {
                setIsEditOpen(false);
                queryClient.invalidateQueries({ queryKey: ['theaters'] });
              }} 
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}