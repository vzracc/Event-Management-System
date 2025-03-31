"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../api/api"

const HomePage = () => {
  const [featuredEvents, setFeaturedEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/api/events?limit=3")
        setFeaturedEvents(res.data.events)
      } catch (err) {
        console.error("Error fetching events:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const categories = [
    {
      title: "Internships",
      description: "Find internship opportunities with top companies and organizations",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
      href: "/events?category=internship",
      color: "bg-blue-50 dark:bg-blue-900",
      iconColor: "text-blue-500 dark:text-blue-400",
    },
    {
      title: "Mentorships",
      description: "Connect with industry professionals for guidance and career advice",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      href: "/events?category=mentorship",
      color: "bg-green-50 dark:bg-green-900",
      iconColor: "text-green-500 dark:text-green-400",
    },
    {
      title: "Competitions",
      description: "Participate in various competitions to showcase your skills",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      ),
      href: "/events?category=competition",
      color: "bg-purple-50 dark:bg-purple-900",
      iconColor: "text-purple-500 dark:text-purple-400",
    },
    {
      title: "Hackathons",
      description: "Join hackathons to solve real-world problems and win prizes",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      href: "/events?category=hackathon",
      color: "bg-orange-50 dark:bg-orange-900",
      iconColor: "text-orange-500 dark:text-orange-400",
    },
  ]

  return (
    <div className="flex flex-col gap-12 pb-8">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Simplify College Event Management
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our platform helps colleges host, manage, and promote events with AI-driven task allocation,
                  centralized dashboards, and interactive tools.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  to="/host-event"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-purple-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-700"
                >
                  Host Your Event
                </Link>
                <Link
                  to="/events"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                >
                  Explore Events
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-purple-950 dark:to-indigo-900 p-6 shadow-lg">
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

      {/* Event Categories Section */}
      <section className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Event Categories</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Discover various types of events and opportunities for your college community
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.title}
              className={`overflow-hidden transition-all hover:shadow-md rounded-lg ${category.color}`}
            >
              <div className="p-6">
                <div
                  className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg ${category.iconColor}`}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{category.description}</p>
                <div className="pt-4">
                  <Link
                    to={category.href}
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                  >
                    Explore {category.title}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Events</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Check out these upcoming events from colleges across the country
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="rounded-lg border border-gray-200 bg-white shadow-sm">
                  <div className="h-48 w-full bg-gray-200 animate-pulse rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded mb-4"></div>
                    <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                </div>
              ))
          ) : featuredEvents.length > 0 ? (
            featuredEvents.map((event) => (
              <div key={event._id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <img
                  src={event.image || "https://via.placeholder.com/400x200"}
                  alt={event.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {event.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{event.organizer}</p>
                  <p className="mt-2 text-gray-700">{event.description.substring(0, 100)}...</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-4 w-4 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-4 w-4 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      to={`/events/${event._id}`}
                      className="inline-flex h-10 w-full items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500">No events found. Check back later!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Host Your Event?</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform makes it easy to create, manage, and promote your college events
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              to="/host-event"
              className="inline-flex h-10 items-center justify-center rounded-md bg-purple-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-700"
            >
              Host Your Event Now
            </Link>
            <Link
              to="/events"
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

