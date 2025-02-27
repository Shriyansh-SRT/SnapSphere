import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import FileUploader from "../shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import { toast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { useCreatePost } from "@/lib/react_query/queriesAndMutations"


type PostFormProps = {
  post?: Models.Document
  action: 'create' | 'update'
}

 
const PostForm = ({ post, action }: PostFormProps) => {

  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();

  const { user } = useUserContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(',') : "",

    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    const newPost = await createPost({
      ...values,
      userId: user.id,
    })

    if(!newPost){
      return (
        toast({
          title: "Post could not be created",
        })
      )
    }

    toast({
      title: "Post created successfully"
    })

    navigate('/')

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
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
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
                mt-4 h-12 bg-neutral-800 border-none placeholder:text-white-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 !important" {...field}/>
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
                mt-4 h-12 bg-neutral-800 border-none placeholder:text-white-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 !important" {...field}/>
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

        {/* <a href="#_" className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
            <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="relative">Post</span>
          </a> */}
          
        </div>    
        
      </form>
    </Form>
  )
}

export default PostForm


