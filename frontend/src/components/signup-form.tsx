// signup-form.tsx
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useLoadingBar } from "react-top-loading-bar"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { ExampleCombobox } from "./ui/college-combobox"

const SignupSchema = z.object({
  fullname: z.string().min(2, "Name too short").max(100),
  email: z.string().email("Invalid email"),
  college: z.string().min(2, "Select your college"),
})

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { start, complete } = useLoadingBar()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      fullname: "",
      college: "",
    },
  })

  async function onSubmit(values: z.infer<typeof SignupSchema>) {
    start()
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email_: values.email,
            fullname: values.fullname,
            college: values.college,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("signup failed")
      }

      toast("Signup registration successful", {
        description: "Please login now",
      })

      navigate(`/login`)
    } catch (error) {
      console.error("Error during signup:", error)
      toast.error("Signup failed, please try again")
    } finally {
      complete()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-neutral-500 text-sm text-balance dark:text-neutral-400">
            Enter your details below to create an account
          </p>
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" {...field} />
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
                  <Input type="email" placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="college"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College</FormLabel>
                <FormControl>
                  <ExampleCombobox
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="default" className="w-full">
            Sign Up
          </Button>
        </div>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="underline underline-offset-4 text-primary"
          >
            Login
          </a>
        </div>
      </form>
    </Form>
  )
}
