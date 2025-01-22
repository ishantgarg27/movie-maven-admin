import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  duration: z.string().min(1, "Duration is required"),
  releaseDate: z.string().min(1, "Release date is required"),
  languages: z.string().min(1, "At least one language is required"),
  genres: z.string().min(1, "At least one genre is required"),
  description: z.string().min(1, "Description is required"),
  certification: z.string().min(1, "Certification is required"),
  trailerVideoId: z.string().min(1, "Trailer video ID is required"),
});

type MovieFormValues = z.infer<typeof movieSchema>;

interface MovieFormProps {
  onSuccess: () => void;
}

export function MovieForm({ onSuccess }: MovieFormProps) {
  const { toast } = useToast();
  const form = useForm<MovieFormValues>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      duration: "",
      releaseDate: "",
      languages: "",
      genres: "",
      description: "",
      certification: "",
      trailerVideoId: "",
    },
  });

  const onSubmit = async (data: MovieFormValues) => {
    try {
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          languages: data.languages.split(",").map((lang) => lang.trim()),
          genres: data.genres.split(",").map((genre) => genre.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create movie");
      }

      toast({
        title: "Success",
        description: "Movie created successfully",
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create movie",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Movie Poster URL</FormLabel>
              <FormControl>
                <Input {...field} type="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (e.g., "2h 30min")</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="releaseDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release Date</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="languages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Languages (comma-separated)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="English, Spanish, French" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genres"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genres (comma-separated)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Action, Drama, Comedy" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="certification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certification (e.g., "PG-13")</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trailerVideoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trailer Video ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="YouTube video ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit">Create Movie</Button>
        </div>
      </form>
    </Form>
  );
}