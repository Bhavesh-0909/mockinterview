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
import { useAuth } from "@/context/AuthContext"
import { useState, useEffect } from "react"

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
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const { start, complete } = useLoadingBar();
  
  // Get email from location state or URL params
  const email = location.state?.email || location.pathname.split("/").pop() || "";
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location.state]);

  // Validate email exists
  useEffect(() => {
    if (!email) {
      toast.error("Email not found. Please start the login process again.");
      navigate("/login");
    }
  }, [email, navigate]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    start();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email_: email, 
          otp_: data.pin 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || "Failed to verify OTP";
        toast.error(errorMessage);
        return;
      }

      const result = await response.json();
      console.log("OTP verification result:", result);
      if (result.token && result.user) {
        
        const success = await login(result.user, result.token);
        if (!success) {
          toast.error("Login failed after OTP verification");
          return;
        }
        toast.success("OTP verified successfully");
        
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      } else {
        toast.error("Invalid response from server");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error(`Failed to verify OTP: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
      complete();
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">Verify Your Account</h1>
            <p className="text-sm text-muted-foreground">
              We've sent a 6-digit code to <span className="font-medium">{email}</span>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel className="text-lg font-medium text-gray-700">
                      Enter Verification Code
                    </FormLabel>
                    <FormControl>
                      <InputOTP 
                        maxLength={6} 
                        {...field}
                        disabled={isSubmitting}
                      >
                        <InputOTPGroup className="justify-center gap-2 px-10">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription className="text-center text-sm text-gray-500">
                      Please enter the 6-digit code sent to your registered device.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Verify Code"}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-gray-500 hover:text-gray-700"
              disabled={isSubmitting}
            >
              ← Back to Login
            </button>
          </div>
        
      </div>
    </div>
  );
}