import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Simplify College Event Management
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Our platform helps colleges host, manage, and promote events with AI-driven task allocation, centralized
                dashboards, and interactive tools.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/host-event">Host Your Event</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/events">Explore Events</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-950 dark:to-indigo-900 p-6 shadow-lg">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="rounded-lg bg-white/90 dark:bg-gray-800/90 p-4 shadow-sm">
                  <h3 className="text-lg font-semibold">National Hackathon 2025</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Hosted by Tech University</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                      Registration Open
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">May 15-17, 2025</span>
                  </div>
                </div>
                <div className="rounded-lg bg-white/90 dark:bg-gray-800/90 p-4 shadow-sm">
                  <h3 className="text-lg font-semibold">AI Workshop Series</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Hosted by CSI Community</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Coming Soon
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">June 5-10, 2025</span>
                  </div>
                </div>
                <div className="rounded-lg bg-white/90 dark:bg-gray-800/90 p-4 shadow-sm">
                  <h3 className="text-lg font-semibold">Leadership Summit</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Hosted by ISTE</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                      Planning
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">July 20-22, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

