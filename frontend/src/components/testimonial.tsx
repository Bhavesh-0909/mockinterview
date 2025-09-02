import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

function Testimonial() {
  const [testimonials, setTestimonials] = useState([
    {   
      id: "",
      fullname: "",
      comment: "",
      avatarlink: "",
      userid: "",
      createdAt: ""
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const loadingCard = 3;

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/feedback`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  return (
    <div className="flex flex-col w-full h-fit mt-10 px-4 py-16 md:py-10 text-center">
      <h2 className="scroll-m-20 text-3xl font-bold text-primary tracking-tight">
        Testimonials
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-3">
        What our users say about us
      </p>
      
      <motion.div 
        initial={{ opacity: 0, translateY: 40 }} 
        animate={{ opacity: 1, translateY: 0 }} 
        transition={{ duration: 0.5, delay: 0.2 }} 
        viewport={{ once: true }} 
        exit={{ opacity: 0, translateY: 40 }}
      >
        <div className="mt-10 space-y-4 flex flex-wrap gap-4 justify-center">
          {loading ? (
            Array.from({ length: loadingCard }).map((_, i) => (
              <Card key={i} className="w-full md:w-1/3 lg:w-1/4 h-[500px] animate-pulse">
                <CardHeader className="flex items-center space-x-4">
                  <Skeleton className="w-10 bg-accent h-10 p-0.5 rounded-full" />
                  <Skeleton className="w-full h-6" />
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                  <Skeleton className="h-4" />
                  <Skeleton className="h-4" />
                  <Skeleton className="h-4" />
                  <Skeleton className="h-4" />
                  <Skeleton className="h-4" />
                  <Skeleton className="h-4" />
                  <Skeleton className="h-4" />
                  <Skeleton className="h-4" />
                  <Skeleton className="h-4" />
                  <Skeleton className="h-4" />
                  <Skeleton className="h-4" />
                  <Skeleton className="h-4" />
                  <Skeleton className="h-4" />
                  <Skeleton className="h-4" />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Skeleton className="w-1/4 h-4 bg-muted" />
                </CardFooter>
              </Card>
            ))
          ) : (
            testimonials.map((testimonial, index) => (
              <Card key={index} className="w-full md:w-1/3 lg:w-1/4 h-[500px]">
                <CardHeader className="flex items-center space-x-4">
                  <CardTitle>
                    <img 
                      src={testimonial?.avatarlink} 
                      alt={testimonial?.fullname} 
                      className="w-10 h-10 bg-primary p-0.5 rounded-full" 
                    />
                  </CardTitle>
                  <CardTitle>{testimonial?.fullname}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-balance text-justify">
                    {testimonial?.comment}
                  </p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground italic w-full text-right">
                    {new Date(testimonial?.createdAt).toLocaleDateString()}
                  </p>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Testimonial;