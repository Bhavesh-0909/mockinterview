import { useEffect } from "react";

function Testimonial() {
    useEffect(() => {
        // Fetch testimonials from API or any other source
    }, []);

    return (
        <div className="flex flex-col w-full h-fit px-4 py-10 text-center">
            <h2 className="scroll-m-20 text-3xl font-bold text-primary tracking-tight">Testimonials</h2>
            <p className="leading-7 [&:not(:first-child)]:mt-3">What our users say about us</p>


        </div>
    )
}

export default Testimonial;