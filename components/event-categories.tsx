import Link from "next/link"
import { Briefcase, Code, Users, Trophy } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function EventCategories() {
  const categories = [
    {
      title: "Internships",
      description: "Find internship opportunities with top companies and organizations",
      icon: Briefcase,
      href: "/events/internships",
      color: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-500 dark:text-blue-400",
    },
    {
      title: "Mentorships",
      description: "Connect with industry professionals for guidance and career advice",
      icon: Users,
      href: "/events/mentorships",
      color: "bg-green-50 dark:bg-green-950",
      iconColor: "text-green-500 dark:text-green-400",
    },
    {
      title: "Competitions",
      description: "Participate in various competitions to showcase your skills",
      icon: Trophy,
      href: "/events/competitions",
      color: "bg-purple-50 dark:bg-purple-950",
      iconColor: "text-purple-500 dark:text-purple-400",
    },
    {
      title: "Hackathons",
      description: "Join hackathons to solve real-world problems and win prizes",
      icon: Code,
      href: "/events/hackathons",
      color: "bg-orange-50 dark:bg-orange-950",
      iconColor: "text-orange-500 dark:text-orange-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Card key={category.title} className={`overflow-hidden transition-all hover:shadow-md ${category.color}`}>
          <CardHeader className="p-6">
            <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg ${category.iconColor}`}>
              <category.icon className="h-6 w-6" />
            </div>
            <CardTitle>{category.title}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardFooter className="p-6 pt-0">
            <Button variant="outline" asChild className="w-full">
              <Link href={category.href}>Explore {category.title}</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

