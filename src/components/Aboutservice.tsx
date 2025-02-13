import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export default function ServiceShowcase() {
  return (
    <div className="h-full overflow-scroll z-50">

        <h2 className="text-3xl font-bold mb-4 sticky top-0 backdrop-blur-lg bg text-center m-2">Our Premium Consulting Service</h2>
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Service Description Section */}
      <section className="text-center ">
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We offer expert consulting services to help your business grow and thrive in today's competitive market. Our
          team of experienced professionals is dedicated to delivering tailored solutions that meet your unique needs.
        </p>
      </section>

      {/* Image Gallery Section */}
      <section>
        <h3 className="text-2xl font-semibold mb-6 text-center">What We Offer</h3>
        <div className="grid grid-cols-1  gap-6">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="overflow-hidden">
              <Image
                src={`/placeholder.svg?height=200&width=300&text=Service+Image+${index}`}
                alt={`Service illustration ${index}`}
                width={300}
                height={200}
                className="w-full object-cover"
              />
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Service Feature {index}</h4>
                <p className="text-sm text-muted-foreground">
                  A brief description of this service feature and its benefits to your business.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Step-by-Step Process Section */}
      <section>
        <h3 className="text-2xl font-semibold mb-6 text-center">Our Process</h3>
        <ol className="space-y-4">
          {[
            "Initial Consultation",
            "Needs Assessment",
            "Strategy Development",
            "Implementation",
            "Monitoring and Adjustment",
            "Final Review and Recommendations",
          ].map((step, index) => (
            <li key={index} className="flex items-center space-x-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                {index + 1}
              </span>
              <span className="text-lg">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Written Reviews Section */}
      <section>
        <h3 className="text-2xl font-semibold mb-6 text-center">What Our Clients Say</h3>
        <div className="grid grid-cols-1  gap-6">
          {[
            {
              name: "Alex Johnson",
              role: "CEO, TechStart",
              content:
                "The consulting service provided invaluable insights that helped us scale our operations efficiently.",
              avatar: "/placeholder.svg?text=AJ",
            },
            {
              name: "Sarah Lee",
              role: "Marketing Director, GrowthCo",
              content: "Their step-by-step approach made complex strategies easy to implement. Highly recommended!",
              avatar: "/placeholder.svg?text=SL",
            },
            {
              name: "Michael Chen",
              role: "Founder, InnovateTech",
              content:
                "The team's expertise in our industry was evident. They delivered results beyond our expectations.",
              avatar: "/placeholder.svg?text=MC",
            },
          ].map((review, index) => (
            <Card key={index} className="flex flex-col justify-between">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{review.content}</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Video Reviews Section */}
      <section>
        <h3 className="text-2xl font-semibold mb-6 text-center">Client Success Stories</h3>
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={`/placeholder.svg?height=200&width=300&text=Review+Video+${index}`}
                  alt={`Client review video ${index}`}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button variant="secondary" size="icon" className="rounded-full w-12 h-12">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path
                        fillRule="evenodd"
                        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Client Success Story {index}</h4>
                <p className="text-sm text-muted-foreground">
                  Watch how our consulting services helped this client achieve their business goals.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <Button size="lg">Get Started Today</Button>
      </section>
    </div>
    <div className="fixed flex justify-center md:justify-start backdrop-blur-lg border border-base-300 rounded w-full p-4 font-bold text-xl  bottom-0  ">
      <button className="ml-32 text-primary backdrop-blur-sm">ADD TO CART</button>
    </div>
    </div>
  )
}

