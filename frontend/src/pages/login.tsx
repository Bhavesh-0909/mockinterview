import { Bot } from "lucide-react"
import { LoginForm } from "@/components/login-form";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { File, Settings, Search } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
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
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:flex lg:justify-center lg:items-center ">
        <div className="h-full w-full p-10">
            <div className="relative overflow-hidden h-[500px] w-full">
                <OrbitingCircles>
                    <File />
                    <Settings />
                    <File />
                </OrbitingCircles>
                <OrbitingCircles radius={100} reverse>
                    <File />
                    <Settings />
                    <File />
                    <Search />
                </OrbitingCircles>
            </div>
        </div>
      </div>
    </div>
  )
}
