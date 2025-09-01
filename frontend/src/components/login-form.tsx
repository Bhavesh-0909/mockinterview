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
} from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useLoadingBar } from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email()
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {start , complete} = useLoadingBar();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  })

  
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    start();
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_: values.email }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }
      
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      toast("OTP sent", {
        description: "Please check your email for the OTP.",
        descriptionClassName: "leading-7 [&:not(:first-child)]:mt-6"
      });
      complete();
      navigate(`/verify-otp/${values.email}`);
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-neutral-500 text-sm text-balance dark:text-neutral-400">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
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
          </div>
          <Button type="submit" variant="default" className="w-full">
            Login
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="underline underline-offset-4 text-primary">
            Sign up
          </a>
        </div>
      </form>
    </Form>
  )
}