import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import FileUploader from "../shared/FileUploader"

 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const PostForm = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-[4px] text-white">Caption</FormLabel>
              <FormControl>
                <Textarea className="h-36 bg-neutral-800 text-white placeholder-gray-400 rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 !important custom-scrollbar mt-4" placeholder="write a caption" {...field} />
              </FormControl>
              <FormMessage className="text-red !important" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white !important">Add Photos</FormLabel>
              <FormControl>
                <FileUploader />
              </FormControl>
              <FormMessage className="text-red !important" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white !important">Add Location</FormLabel>
              <FormControl>
                <Input placeholder="add location" type="text" className="
                mt-4 h-12 bg-neutral-800 border-none placeholder:text-white-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 !important" />
              </FormControl>
              <FormMessage className="text-red !important" />
            </FormItem>
          )}
        />    

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white !important">Add Tags (separated by comma " , ")</FormLabel>
              <FormControl>
                <Input 
                  type="text"
                  placeholder="#art, #entertainment, #music" 
                  className="
                mt-4 h-12 bg-neutral-800 border-none placeholder:text-white-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 !important" />
              </FormControl>
              <FormMessage className="text-red !important" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button 
            type="button" 
            className="h-12 bg-neutral-800 px-5 text-white flex gap-2 !important">
              Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-indigo-400 h-12 px-5 hover:bg-indigo-500 text-white flex gap-2 !important"
            >
              Post
          </Button>
        </div>    
        
      </form>
    </Form>
  )
}

export default PostForm