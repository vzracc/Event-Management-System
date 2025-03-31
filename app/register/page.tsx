"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      })
      router.push("/login")
    }, 1500)
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Register to access the event management platform</p>
        </div>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="chair">Chair</TabsTrigger>
            <TabsTrigger value="member">Member</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Card>
              <form onSubmit={handleRegister}>
                <CardHeader>
                  <CardTitle>Attendee Registration</CardTitle>
                  <CardDescription>Register to participate in events and competitions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="college">College/University</Label>
                    <Input id="college" required />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                      Sign In
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="admin">
            <Card>
              <form onSubmit={handleRegister}>
                <CardHeader>
                  <CardTitle>Admin Registration</CardTitle>
                  <CardDescription>Register as a college administrator</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-first-name">First Name</Label>
                      <Input id="admin-first-name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-last-name">Last Name</Label>
                      <Input id="admin-last-name" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input id="admin-email" type="email" placeholder="admin@college.edu" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input id="admin-password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-confirm-password">Confirm Password</Label>
                    <Input id="admin-confirm-password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="college-name">College/University Name</Label>
                    <Input id="college-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="college-id">College ID/Registration Number</Label>
                    <Input id="college-id" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" placeholder="e.g., Dean, Director, etc." required />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Register as Admin"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="chair">
            <Card>
              <form onSubmit={handleRegister}>
                <CardHeader>
                  <CardTitle>Chairperson Registration</CardTitle>
                  <CardDescription>Register as a community chairperson</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="chair-first-name">First Name</Label>
                      <Input id="chair-first-name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chair-last-name">Last Name</Label>
                      <Input id="chair-last-name" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chair-email">Email</Label>
                    <Input id="chair-email" type="email" placeholder="chair@college.edu" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chair-password">Password</Label>
                    <Input id="chair-password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chair-confirm-password">Confirm Password</Label>
                    <Input id="chair-confirm-password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chair-college">College/University</Label>
                    <Input id="chair-college" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="community">Community</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select community" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csi">CSI</SelectItem>
                        <SelectItem value="iste">ISTE</SelectItem>
                        <SelectItem value="tsdw">TSDW</SelectItem>
                        <SelectItem value="ieee">IEEE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chair-id">Chairperson ID</Label>
                    <Input id="chair-id" required />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Register as Chairperson"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="member">
            <Card>
              <form onSubmit={handleRegister}>
                <CardHeader>
                  <CardTitle>Member Registration</CardTitle>
                  <CardDescription>Register as a community team member</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="member-first-name">First Name</Label>
                      <Input id="member-first-name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="member-last-name">Last Name</Label>
                      <Input id="member-last-name" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-email">Email</Label>
                    <Input id="member-email" type="email" placeholder="member@college.edu" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-password">Password</Label>
                    <Input id="member-password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-confirm-password">Confirm Password</Label>
                    <Input id="member-confirm-password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-college">College/University</Label>
                    <Input id="member-college" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-community">Community</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select community" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csi">CSI</SelectItem>
                        <SelectItem value="iste">ISTE</SelectItem>
                        <SelectItem value="tsdw">TSDW</SelectItem>
                        <SelectItem value="ieee">IEEE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-team">Team</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pr">PR Team</SelectItem>
                        <SelectItem value="technical">Technical Team</SelectItem>
                        <SelectItem value="creative">Creative Team</SelectItem>
                        <SelectItem value="logistics">Logistics Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Register as Member"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

