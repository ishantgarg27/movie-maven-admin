import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

const theaterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  totalSeats: z.string().min(1, "Total seats is required"),
});

type TheaterFormValues = z.infer<typeof theaterSchema>;

interface TheaterFormProps {
  onSuccess: () => void;
}

export function TheaterForm({ onSuccess }: TheaterFormProps) {
  const { toast } = useToast();
  const form = useForm<TheaterFormValues>({
    resolver: zodResolver(theaterSchema),
    defaultValues: {
      name: "",
      location: "",
      totalSeats: "",
    },
  });

  const onSubmit = async (data: TheaterFormValues) => {
    try {
      const response = await fetch("/api/theaters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          totalSeats: parseInt(data.totalSeats),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create theater");
      }

      toast({
        title: "Success",
        description: "Theater created successfully",
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create theater",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalSeats"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Seats</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit">Create Theater</Button>
        </div>
      </form>
    </Form>
  );
}