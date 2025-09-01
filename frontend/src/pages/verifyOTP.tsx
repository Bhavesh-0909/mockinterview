"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useLoadingBar } from "react-top-loading-bar"
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useNavigate, useLocation } from "react-router-dom"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export default function InputOTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  const location = useLocation();
  const email = location.pathname.split("/").pop() || "";
  console.log("email", email);
  const { start, complete } = useLoadingBar();
  const navigation = useNavigate();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    start();
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email_: email, otp_: data.pin }),
        });
        console.log("response", response);
        if (!response.ok) {
            toast.error("Failed to verify OTP")
            return
        }
        const result = await response.json();
        if (result.token) {
            localStorage.setItem("token", result.token);
            toast.success("OTP verified successfully");
        }
    } catch (e) {
        toast.error(`Failed to submit form ${e}`);
        return;
    } finally {
      complete();
    }
    navigation("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-2/3 mx-auto min-h-screen h-full flex flex-col justify-center items-center gap-4">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col items-center gap-2">
              <FormLabel className="scroll-m-20 text-center text-lg font-bold tracking-tight text-balance">One Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="default" type="submit">Submit</Button>
      </form>
    </Form>
  )
}
