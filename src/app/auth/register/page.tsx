"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

interface Course {
  id: string;
  courseCode: string;
  courseName: string;
}

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    school: "",
    courseCategory: "",
    courseCode: "",
    registrationNumber: "",
    avatar: "",
  });
  const [courses, setCourses] = useState<Course[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, courseCategory: value, courseCode: "" }));
    fetchCourses(value);
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, courseCode: value }));
  };

  const fetchCourses = async (category: string) => {
    try {
      const res = await fetch(`/api/courses?category=${category}`);
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setCourses([]);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle final submission to API
    console.log("Submitting form:", formData);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registration successful!");
        // Redirect to sign-in or dashboard
      } else {
        alert(data.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Register - Step {step}</CardTitle>
          <CardDescription>
            {step === 1 && "Enter your basic information"}
            {step === 2 && "Provide your academic details"}
            {step === 3 && "Optional information"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="button" onClick={nextStep} className="w-full">
                  Next
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="school">School</Label>
                  <Input
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Course Category</Label>
                  <RadioGroup
                    value={formData.courseCategory}
                    onValueChange={handleRadioChange}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="BACHELORS" id="r1" />
                      <Label htmlFor="r1">Bachelors</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="MASTERS" id="r2" />
                      <Label htmlFor="r2">Masters</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PHD" id="r3" />
                      <Label htmlFor="r3">PhD</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="DIPLOMA" id="r4" />
                      <Label htmlFor="r4">Diploma</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="CERTIFICATE" id="r5" />
                      <Label htmlFor="r5">Certificate</Label>
                    </div>
                  </RadioGroup>
                </div>
                {formData.courseCategory && ( // Only show if category is selected
                  <div className="grid gap-2">
                    <Label htmlFor="courseCode">Course Code</Label>
                    <Select value={formData.courseCode} onValueChange={handleSelectChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course: Course) => (
                          <SelectItem key={course.id} value={course.courseCode}>
                            {course.courseName} ({course.courseCode})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="flex justify-between">
                  <Button type="button" onClick={prevStep} variant="outline">
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="registrationNumber">Registration Number (Optional)</Label>
                  <Input
                    id="registrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="avatar">Avatar URL (Optional)</Label>
                  <Input
                    id="avatar"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between">
                  <Button type="button" onClick={prevStep} variant="outline">
                    Previous
                  </Button>
                  <Button type="submit">
                    Register
                  </Button>
                </div>
              </div>
            )}
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
