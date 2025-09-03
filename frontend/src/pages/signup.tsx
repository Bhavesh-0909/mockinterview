import { Bot } from "lucide-react"
import {SignupForm} from "@/components/signup-form.js";

function SignupPage() {
  return (
    <div className="flex flex-col items-center gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Bot className="size-4" />
            </div>
            MockInterview
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
    </div>
  )
}

export default SignupPage