"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const CreateEventPage = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(1)
  const [communities, setCommunities] = useState([])
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    address: "",
    mode: "in-person",
    capacity: 100,
    registrationDeadline: "",
    community: "",
    teams: [],
    requirements: "",
    banner: null,
    bannerPreview: null,
    sponsors: [{ name: "", tier: "Silver", logo: null, logoPreview: null }],
    schedule: [{ day: 1, items: [{ time: "", title: "", description: "" }] }],
    prizes: [{ position: "", prize: "" }],
    faqs: [{ question: "", answer: "" }],
    organizers: [{ name: "", role: "", email: "" }],
  })

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        // In a real app, this would be an API call
        // const res = await api.get('/api/communities');
        // setCommunities(res.data.communities);

        // Mock data
        setCommunities([
          { _id: "1", name: "CSI", fullName: "Computer Society of India" },
          { _id: "2", name: "ISTE", fullName: "Indian Society for Technical Education" },
          { _id: "3", name: "IEEE", fullName: "Institute of Electrical and Electronics Engineers" },
          { _id: "4", name: "TSDW", fullName: "Technical Skill Development Wing" },
        ])
      } catch (error) {
        console.error("Error fetching communities:", error)
        setError("Failed to load communities. Please try again.")
      }
    }

    fetchCommunities()
  }, [])

  const fetchTeams = async (communityId) => {
    try {
      // In a real app, this would be an API call
      // const res = await api.get(`/api/communities/${communityId}/teams`);
      // setTeams(res.data.teams);

      // Mock data
      if (communityId === "1") {
        // CSI
        setTeams([
          { _id: "1", name: "PR Team", community: "CSI" },
          { _id: "2", name: "Technical Team", community: "CSI" },
        ])
      } else if (communityId === "2") {
        // ISTE
        setTeams([
          { _id: "3", name: "Creative Team", community: "ISTE" },
          { _id: "4", name: "Content Team", community: "ISTE" },
        ])
      } else if (communityId === "3") {
        // IEEE
        setTeams([
          { _id: "5", name: "Event Management Team", community: "IEEE" },
          { _id: "6", name: "Technical Team", community: "IEEE" },
        ])
      } else if (communityId === "4") {
        // TSDW
        setTeams([
          { _id: "7", name: "Logistics Team", community: "TSDW" },
          { _id: "8", name: "Workshop Team", community: "TSDW" },
        ])
      }
    } catch (error) {
      console.error("Error fetching teams:", error)
      setError("Failed to load teams. Please try again.")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCommunityChange = (e) => {
    const communityId = e.target.value
    setFormData({ ...formData, community: communityId, teams: [] })
    if (communityId) {
      fetchTeams(communityId)
    } else {
      setTeams([])
    }
  }

  const handleTeamChange = (e) => {
    const selectedTeams = Array.from(e.target.selectedOptions, (option) => option.value)
    setFormData({ ...formData, teams: selectedTeams })
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      const file = files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        setFormData({
          ...formData,
          [name]: file,
          [`${name}Preview`]: reader.result,
        })
      }

      reader.readAsDataURL(file)
    }
  }

  const handleSponsorChange = (index, field, value) => {
    const updatedSponsors = [...formData.sponsors]
    updatedSponsors[index][field] = value
    setFormData({ ...formData, sponsors: updatedSponsors })
  }

  const handleSponsorLogoChange = (index, e) => {
    const { files } = e.target
    if (files && files[0]) {
      const file = files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        const updatedSponsors = [...formData.sponsors]
        updatedSponsors[index].logo = file
        updatedSponsors[index].logoPreview = reader.result
        setFormData({ ...formData, sponsors: updatedSponsors })
      }

      reader.readAsDataURL(file)
    }
  }

  const addSponsor = () => {
    setFormData({
      ...formData,
      sponsors: [...formData.sponsors, { name: "", tier: "Silver", logo: null, logoPreview: null }],
    })
  }

  const removeSponsor = (index) => {
    const updatedSponsors = [...formData.sponsors]
    updatedSponsors.splice(index, 1)
    setFormData({ ...formData, sponsors: updatedSponsors })
  }

  const handleScheduleChange = (dayIndex, itemIndex, field, value) => {
    const updatedSchedule = [...formData.schedule]
    updatedSchedule[dayIndex].items[itemIndex][field] = value
    setFormData({ ...formData, schedule: updatedSchedule })
  }

  const addScheduleDay = () => {
    const newDayNumber = formData.schedule.length + 1
    setFormData({
      ...formData,
      schedule: [...formData.schedule, { day: newDayNumber, items: [{ time: "", title: "", description: "" }] }],
    })
  }

  const addScheduleItem = (dayIndex) => {
    const updatedSchedule = [...formData.schedule]
    updatedSchedule[dayIndex].items.push({ time: "", title: "", description: "" })
    setFormData({ ...formData, schedule: updatedSchedule })
  }

  const removeScheduleItem = (dayIndex, itemIndex) => {
    const updatedSchedule = [...formData.schedule]
    updatedSchedule[dayIndex].items.splice(itemIndex, 1)
    setFormData({ ...formData, schedule: updatedSchedule })
  }

  const handlePrizeChange = (index, field, value) => {
    const updatedPrizes = [...formData.prizes]
    updatedPrizes[index][field] = value
    setFormData({ ...formData, prizes: updatedPrizes })
  }

  const addPrize = () => {
    setFormData({
      ...formData,
      prizes: [...formData.prizes, { position: "", prize: "" }],
    })
  }

  const removePrize = (index) => {
    const updatedPrizes = [...formData.prizes]
    updatedPrizes.splice(index, 1)
    setFormData({ ...formData, prizes: updatedPrizes })
  }

  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...formData.faqs]
    updatedFaqs[index][field] = value
    setFormData({ ...formData, faqs: updatedFaqs })
  }

  const addFaq = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: "", answer: "" }],
    })
  }

  const removeFaq = (index) => {
    const updatedFaqs = [...formData.faqs]
    updatedFaqs.splice(index, 1)
    setFormData({ ...formData, faqs: updatedFaqs })
  }

  const handleOrganizerChange = (index, field, value) => {
    const updatedOrganizers = [...formData.organizers]
    updatedOrganizers[index][field] = value
    setFormData({ ...formData, organizers: updatedOrganizers })
  }

  const addOrganizer = () => {
    setFormData({
      ...formData,
      organizers: [...formData.organizers, { name: "", role: "", email: "" }],
    })
  }

  const removeOrganizer = (index) => {
    const updatedOrganizers = [...formData.organizers]
    updatedOrganizers.splice(index, 1)
    setFormData({ ...formData, organizers: updatedOrganizers })
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would be an API call with FormData for file uploads
      // const eventData = new FormData();
      // Object.keys(formData).forEach(key => {
      //   if (key === 'banner') {
      //     if (formData.banner) eventData.append('banner', formData.banner);
      //   } else if (key === 'sponsors') {
      //     formData.sponsors.forEach((sponsor, index) => {
      //       eventData.append(`sponsors[${index}][name]`, sponsor.name);
      //       eventData.append(`sponsors[${index}][tier]`, sponsor.tier);
      //       if (sponsor.logo) eventData.append(`sponsors[${index}][logo]`, sponsor.logo);
      //     });
      //   } else if (!key.includes('Preview')) {
      //     eventData.append(key, JSON.stringify(formData[key]));
      //   }
      // });
      //
      // const res = await api.post('/api/events', eventData);
      // navigate(`/events/${res.data.event._id}`);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful creation
      navigate("/dashboard?tab=events")
    } catch (error) {
      console.error("Error creating event:", error)
      setError("Failed to create event. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Event</h1>
          <p className="text-gray-500 mt-2">Fill in the details to create a new event for your community</p>
        </div>

        {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

        <div className="mb-8">
          <div className="relative">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep === step
                      ? "border-purple-600 bg-purple-600 text-white"
                      : currentStep > step
                        ? "border-purple-600 bg-white text-purple-600"
                        : "border-gray-300 bg-white text-gray-300"
                  } z-10`}
                >
                  {currentStep > step ? (
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
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    step
                  )}
                </div>
              ))}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <div className={`text-center ${currentStep >= 1 ? "text-purple-600" : "text-gray-500"}`}>Basic Info</div>
              <div className={`text-center ${currentStep >= 2 ? "text-purple-600" : "text-gray-500"}`}>
                Date & Location
              </div>
              <div className={`text-center ${currentStep >= 3 ? "text-purple-600" : "text-gray-500"}`}>Teams</div>
              <div className={`text-center ${currentStep >= 4 ? "text-purple-600" : "text-gray-500"}`}>
                Schedule & Prizes
              </div>
              <div className={`text-center ${currentStep >= 5 ? "text-purple-600" : "text-gray-500"}`}>
                Additional Info
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., National Hackathon 2025"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Provide a detailed description of your event..."
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select a category</option>
                      <option value="Hackathon">Hackathon</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Conference">Conference</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Competition">Competition</option>
                      <option value="Career Fair">Career Fair</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="banner" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Banner
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {formData.bannerPreview ? (
                          <div>
                            <img
                              src={formData.bannerPreview || "/placeholder.svg"}
                              alt="Banner preview"
                              className="mx-auto h-32 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              className="mt-2 text-sm text-red-600 hover:text-red-500"
                              onClick={() => setFormData({ ...formData, banner: null, bannerPreview: null })}
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <>
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="banner"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="banner"
                                  name="banner"
                                  type="file"
                                  className="sr-only"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Next: Date & Location
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Date & Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Date & Location</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                        End Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="registrationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                      Registration Deadline <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="registrationDeadline"
                      name="registrationDeadline"
                      value={formData.registrationDeadline}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="mode" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Mode <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="mode"
                      name="mode"
                      value={formData.mode}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="in-person">In-Person</option>
                      <option value="virtual">Virtual</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>

                  {formData.mode !== "virtual" && (
                    <>
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Venue Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required={formData.mode !== "virtual"}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="e.g., University Auditorium"
                        />
                      </div>

                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Venue Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required={formData.mode !== "virtual"}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="e.g., 123 University Ave, Tech City, TC 12345"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum Capacity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="capacity"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      required
                      min="1"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Previous: Basic Info
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Next: Teams
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Teams */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Teams & Organization</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="community" className="block text-sm font-medium text-gray-700 mb-1">
                      Organizing Community <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="community"
                      name="community"
                      value={formData.community}
                      onChange={handleCommunityChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select a community</option>
                      {communities.map((community) => (
                        <option key={community._id} value={community._id}>
                          {community.name} - {community.fullName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="teams" className="block text-sm font-medium text-gray-700 mb-1">
                      Assign Teams <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="teams"
                      name="teams"
                      multiple
                      value={formData.teams}
                      onChange={handleTeamChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
                      disabled={!formData.community}
                    >
                      {teams.map((team) => (
                        <option key={team._id} value={team._id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-sm text-gray-500">Hold Ctrl (or Cmd) to select multiple teams</p>
                  </div>

                  <div>
                    <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                      Participant Requirements
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      rows={4}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="List any requirements for participants (e.g., laptop, student ID, etc.)"
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Organizers</label>
                    {formData.organizers.map((organizer, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-md"
                      >
                        <div>
                          <label
                            htmlFor={`organizer-name-${index}`}
                            className="block text-xs font-medium text-gray-500 mb-1"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id={`organizer-name-${index}`}
                            value={organizer.name}
                            onChange={(e) => handleOrganizerChange(index, "name", e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`organizer-role-${index}`}
                            className="block text-xs font-medium text-gray-500 mb-1"
                          >
                            Role
                          </label>
                          <input
                            type="text"
                            id={`organizer-role-${index}`}
                            value={organizer.role}
                            onChange={(e) => handleOrganizerChange(index, "role", e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div className="flex items-end">
                          <input
                            type="email"
                            placeholder="Email"
                            value={organizer.email}
                            onChange={(e) => handleOrganizerChange(index, "email", e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          {formData.organizers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeOrganizer(index)}
                              className="ml-2 inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:bg-red-50"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 6L6 18M6 6l12 12"></path>
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addOrganizer}
                      className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M5 12h14"></path>
                      </svg>
                      Add Organizer
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Previous: Date & Location
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Next: Schedule & Prizes
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Schedule & Prizes */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Event Schedule</h2>
                <div className="space-y-6">
                  {formData.schedule.map((day, dayIndex) => (
                    <div key={dayIndex} className="space-y-4 p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Day {day.day}</h3>
                      </div>

                      {day.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md"
                        >
                          <div>
                            <label
                              htmlFor={`schedule-time-${dayIndex}-${itemIndex}`}
                              className="block text-xs font-medium text-gray-500 mb-1"
                            >
                              Time
                            </label>
                            <input
                              type="text"
                              id={`schedule-time-${dayIndex}-${itemIndex}`}
                              value={item.time}
                              onChange={(e) => handleScheduleChange(dayIndex, itemIndex, "time", e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="e.g., 9:00 AM - 10:00 AM"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor={`schedule-title-${dayIndex}-${itemIndex}`}
                              className="block text-xs font-medium text-gray-500 mb-1"
                            >
                              Title
                            </label>
                            <input
                              type="text"
                              id={`schedule-title-${dayIndex}-${itemIndex}`}
                              value={item.title}
                              onChange={(e) => handleScheduleChange(dayIndex, itemIndex, "title", e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="e.g., Registration & Check-in"
                            />
                          </div>
                          <div className="flex items-end">
                            <input
                              type="text"
                              placeholder="Description (optional)"
                              value={item.description}
                              onChange={(e) => handleScheduleChange(dayIndex, itemIndex, "description", e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {day.items.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeScheduleItem(dayIndex, itemIndex)}
                                className="ml-2 inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:bg-red-50"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 6L6 18M6 6l12 12"></path>
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}

                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => addScheduleItem(dayIndex)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 5v14M5 12h14"></path>
                          </svg>
                          Add Item
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addScheduleDay}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                    Add Day
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Prizes & Awards</h2>
                <div className="space-y-4">
                  {formData.prizes.map((prize, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-md"
                    >
                      <div>
                        <label
                          htmlFor={`prize-position-${index}`}
                          className="block text-xs font-medium text-gray-500 mb-1"
                        >
                          Position/Category
                        </label>
                        <input
                          type="text"
                          id={`prize-position-${index}`}
                          value={prize.position}
                          onChange={(e) => handlePrizeChange(index, "position", e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="e.g., 1st Place, Best UI/UX"
                        />
                      </div>
                      <div className="flex items-end">
                        <div className="flex-1">
                          <label
                            htmlFor={`prize-prize-${index}`}
                            className="block text-xs font-medium text-gray-500 mb-1"
                          >
                            Prize
                          </label>
                          <input
                            type="text"
                            id={`prize-prize-${index}`}
                            value={prize.prize}
                            onChange={(e) => handlePrizeChange(index, "prize", e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="e.g., $5,000 + Internship Opportunities"
                          />
                        </div>
                        {formData.prizes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePrize(index)}
                            className="ml-2 inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:bg-red-50"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6L6 18M6 6l12 12"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addPrize}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                    Add Prize
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Previous: Teams
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Next: Additional Info
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Additional Information */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Sponsors</h2>
                <div className="space-y-4">
                  {formData.sponsors.map((sponsor, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-md"
                    >
                      <div>
                        <label
                          htmlFor={`sponsor-name-${index}`}
                          className="block text-xs font-medium text-gray-500 mb-1"
                        >
                          Sponsor Name
                        </label>
                        <input
                          type="text"
                          id={`sponsor-name-${index}`}
                          value={sponsor.name}
                          onChange={(e) => handleSponsorChange(index, "name", e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`sponsor-tier-${index}`}
                          className="block text-xs font-medium text-gray-500 mb-1"
                        >
                          Tier
                        </label>
                        <select
                          id={`sponsor-tier-${index}`}
                          value={sponsor.tier}
                          onChange={(e) => handleSponsorChange(index, "tier", e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="Platinum">Platinum</option>
                          <option value="Gold">Gold</option>
                          <option value="Silver">Silver</option>
                          <option value="Bronze">Bronze</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <div className="flex-1">
                          <label
                            htmlFor={`sponsor-logo-${index}`}
                            className="block text-xs font-medium text-gray-500 mb-1"
                          >
                            Logo
                          </label>
                          <div className="flex items-center">
                            {sponsor.logoPreview ? (
                              <div className="flex items-center">
                                <img
                                  src={sponsor.logoPreview || "/placeholder.svg"}
                                  alt={`${sponsor.name} logo`}
                                  className="h-8 w-8 object-contain mr-2"
                                />
                                <button
                                  type="button"
                                  className="text-xs text-red-600 hover:text-red-500"
                                  onClick={() => {
                                    const updatedSponsors = [...formData.sponsors]
                                    updatedSponsors[index].logo = null
                                    updatedSponsors[index].logoPreview = null
                                    setFormData({ ...formData, sponsors: updatedSponsors })
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            ) : (
                              <input
                                type="file"
                                id={`sponsor-logo-${index}`}
                                onChange={(e) => handleSponsorLogoChange(index, e)}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                accept="image/*"
                              />
                            )}
                          </div>
                        </div>
                        {formData.sponsors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSponsor(index)}
                            className="ml-2 inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:bg-red-50"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6L6 18M6 6l12 12"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addSponsor}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                    Add Sponsor
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">FAQs</h2>
                <div className="space-y-4">
                  {formData.faqs.map((faq, index) => (
                    <div key={index} className="grid grid-cols-1 gap-4 p-4 border border-gray-200 rounded-md">
                      <div>
                        <label
                          htmlFor={`faq-question-${index}`}
                          className="block text-xs font-medium text-gray-500 mb-1"
                        >
                          Question
                        </label>
                        <input
                          type="text"
                          id={`faq-question-${index}`}
                          value={faq.question}
                          onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="e.g., Can I participate as an individual?"
                        />
                      </div>
                      <div className="flex items-start">
                        <div className="flex-1">
                          <label
                            htmlFor={`faq-answer-${index}`}
                            className="block text-xs font-medium text-gray-500 mb-1"
                          >
                            Answer
                          </label>
                          <textarea
                            id={`faq-answer-${index}`}
                            value={faq.answer}
                            onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                            rows={2}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Provide a clear answer to the question..."
                          ></textarea>
                        </div>
                        {formData.faqs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFaq(index)}
                            className="ml-2 inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:bg-red-50"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6L6 18M6 6l12 12"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addFaq}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                    Add FAQ
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Previous: Schedule & Prizes
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {loading ? "Creating Event..." : "Create Event"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default CreateEventPage

