import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm} from "react-hook-form"
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
import { SignupValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { Link } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react_query/queriesAndMutations"
import { sign } from "crypto"
import { signInAccount } from "@/lib/appwrite/api"


const SignupForm = () => {

  
  const { toast } = useToast()
  
  const { mutateAsync: createUserAccount, isLoading: isCreatingUser } = useCreateUserAccount();

  const { mutateAsync: SignInAccount, isLoading: isSigningIn  } = useSignInAccount();


  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // create new user
    console.log(values, "form values")
    const newUser = await createUserAccount(values);
    // console.log(newUser);

    if(!newUser){
      return toast({
        title: "Sign up failed. Please try again.",
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if(!session){
      return toast({ title: "Sign in failed. Please try again."})
    }

    


  }

  return (
    <Form {...form}>
      <div className="sm:w-[420px] flex justify-center items-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use SnapSphere, please enter your details</p>
      
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="p-2" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" 
                  className="p-2"
                  placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        
          <Button type="submit" className="shad-button_primary">
            {isCreatingUser ? 
              <div className="flex items-center justify-center gap-2">
                <Loader />
              </div> :
              "Sign up"
            }
          </Button>

          <p className="text-sm text-center mt-2">
            Already have an account ? <Link to={"/sign-in"}>Login</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm