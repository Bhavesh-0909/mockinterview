import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

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

    useEffect(() => {
        async function fetchTestimonials() {
            try {
                const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/feedback`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                
                setTestimonials(data);
                console.log("Fetched testimonials:", data);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            }
        }
        fetchTestimonials();
    }, []);

    return (
        <div className="flex flex-col w-full h-fit px-4 py-16 md:py-10 text-center">
            <h2 className="scroll-m-20 text-3xl font-bold text-primary tracking-tight">Testimonials</h2>
            <p className="leading-7 [&:not(:first-child)]:mt-3">What our users say about us</p>
            {testimonials.length > 0 ? (
                <div className="mt-4 space-y-4 flex flex-wrap gap-4 justify-center">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="w-full md:w-1/3 lg:w-1/4 max-h-[500px] ">
                            <CardHeader className="flex items-center space-x-4">
                                <CardTitle><img src={testimonial?.avatarlink} alt={testimonial?.fullname} className="w-10 h-10 bg-primary p-0.5 rounded-full" /></CardTitle>
                                <CardTitle>{testimonial?.fullname}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground text-balance text-justify">{testimonial?.comment}</p>
                            </CardContent>
                            <CardFooter>
                                <p className="text-sm text-muted-foreground italic w-full text-right">{new Date(testimonial?.createdAt).toLocaleDateString()}</p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="mt-4 text-gray-600">No testimonials available</p>
            )}
        </div>
    )
}

export default Testimonial;