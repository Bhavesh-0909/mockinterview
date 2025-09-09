import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const resumeLinkFormSchema = z.object({
  resumelink: z.string().url().optional().or(z.literal(""))
});

function Profile() {
  const { user } = useAuth();
  const resumeLinkForm = useForm<z.infer<typeof resumeLinkFormSchema>>({
      resolver: zodResolver(resumeLinkFormSchema),
      defaultValues: {
        resumelink: user?.resumelink || "",
      },
  })

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  async function EmailLinkSubmit(values: z.infer<typeof resumeLinkFormSchema>) {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/user/resume-link`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ resumelink: values.resumelink }),
      });
      if (!response.ok) {
        throw new Error("Failed to update resume link");
      }
    } catch (error) {
      console.error("Error updating resume link:", error);
    }
  }

  return (
    <div className="h-full w-full flex flex-col items-start pr-5 md:pr-10">
      <h1 className="scroll-m-20 py-1.5 text-md tracking-tight text-balance">Profile</h1>
      <div className="flex flex-col flex-wrap -ml-6 md:ml-0 w-full space-y-4 py-4">
        {/* avatar section */}
        <div className="w-full h-fit flex flex-col flex-wrap border border-border rounded-md">
          <div className="flex w-full justify-between items-center border-b border-border p-6">
            <div className="flex flex-col justify-between space-y-2">
              <h1 className="text-lg md:text-2xl font-bold tracking-wide text-balance scroll-m-20">Avatar</h1>
              <p className="text-xs md:text-sm text-accent-foreground">This is your avatar.<br />Click on the avatar to upload a custom one from your files.</p>
            </div>
            <div className="flex items-center justify-center w-15 md:w-20 h-full">
              <img src={user.avatarlink} alt="Avatar" className="w-10 h-10 aspect-square md:w-15 md:h-15 rounded-full object-cover bg-primary-foreground cursor-pointer" />
            </div>
          </div>
          <div className="bg-muted/30 dark:bg-background/30 p-4 text-sm text-muted-foreground">
            <p>An avatar is optional but strongly recommended.</p>
          </div>
        </div>

        {/* email section */}
        <div className="w-full h-fit border border-border rounded-md">
          <div className="flex flex-col w-full justify-center border-b border-border space-y-2 p-6">
            <div className="flex flex-col justify-between space-y-2">
              <h1 className="text-lg md:text-2xl font-bold tracking-wide text-balance scroll-m-20">Email</h1>
              <p className="text-xs md:text-sm text-accent-foreground">This is your email address. It can not be changed. To delete your account, please contact support.</p>
            </div>
            <div className="flex flex-wrap items-center space-x-2 space-y-2">
              <div className="w-fit p-4 bg-muted/30 border border-border rounded-md">
                <span className="text-sm text-muted-foreground">{user.email}</span>
              </div>
              <Badge variant="verified">Verified</Badge>
            </div>
          </div>
          <div className="bg-muted/30 dark:bg-background/30 p-4 text-sm text-muted-foreground">
            <p>Emails must be verified to be able to login with them or be used as primary email.</p>
          </div>
        </div>

        {/* resumelink sections */}
        <div className="w-full h-fit border border-border rounded-md">
          <div className="flex flex-col w-full justify-center border-b border-border space-y-2 p-6">
          <div className="flex flex-col justify-between space-y-2"></div>
            <h1 className="text-lg md:text-2xl font-bold tracking-wide text-balance scroll-m-20">Resume Link</h1>
            <p className="text-xs md:text-sm text-accent-foreground">This is your resume link. It can be changed.</p>
           
            {!user.resumelink && 
              <div>
                <Form {...resumeLinkForm}>
                  <form onSubmit={resumeLinkForm.handleSubmit(EmailLinkSubmit)} className="flex items-center">
                    <Input type="text" placeholder="Enter your resume link" className="w-2/3 min-w-[250px] max-w-[350px] p-5" value={user.resumelink || ""} readOnly />
                    <Button type="submit" className="ml-4">Save</Button>
                  </form>
                </Form>
                 {user.resumelink && <div className="w-2/3 min-w-[280px] h-[300px] md:h-[500px] border border-border rounded-md overflow-hidden mx-auto">
                  <iframe
                    src="https://drive.google.com/file/d/1kA-SOHDTnuRUUSbdmIyxxpLhry2jRWqY/preview"
                    width="100%"
                    height="100%"
                    allow="autoplay"
                    title="Drive PDF"
                  ></iframe>
                </div>}
              </div>
            }
          </div>
        </div>
        
        {/* contact sections */}
        <div className="w-full h-fit border border-border rounded-md">
          <div className="flex flex-col w-full justify-center border-b border-border space-y-2 p-6">
            <h1 className="text-lg md:text-xl font-bold tracking-wide text-balance scroll-m-20">Contact Information</h1>
            <p className="text-xs md:text-sm text-accent-foreground">This is your contact information. It can be changed.</p>
          </div>
        </div>
        <div className="w-full h-fit border border-border rounded-md">1</div>
        <div className="w-full h-fit border border-border rounded-md">1</div>
      </div>
    </div>
  )
}

export default Profile;
