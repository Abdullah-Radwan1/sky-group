"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader, User, Phone, Briefcase, MapPin } from "lucide-react";
import Image from "next/image";
import banner from "@/../public/banner2.jpg";

export const Sign_up = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    jobTitle: "",
    country: "",
  });

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "South Korea",
    "United Arab Emirates",
    "Saudi Arabia",
    "Egypt",
    "South Africa",
    "Brazil",
    "Mexico",
    "India",
    "China",
    "Singapore",
    "Malaysia",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      country: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Form submitted!");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-start mt-20 justify-center sm:p-4 p-0">
      <div className="w-full max-w-6xl rounded-xl border bg-card shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Join Sky Group
              </h1>
              <p className="text-muted-foreground mt-2">
                Create your account and start your journey with us
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                  <Input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full pl-10 h-11"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+20 123 456 789"
                    required
                    className="w-full pl-10 h-11"
                  />
                </div>
              </div>

              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                  <Input
                    id="jobTitle"
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Software Engineer"
                    required
                    className="w-full pl-10 h-11"
                  />
                </div>
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  onValueChange={handleCountryChange}
                  value={formData.country}
                >
                  <SelectTrigger className="w-full h-11" id="country">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 opacity-50" />
                      <SelectValue placeholder="Select your country" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading && <Loader className="w-4 h-4 animate-spin" />}
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>

          {/* Banner Section - Inside the same card */}
          <div className="w-full lg:w-1/2  ">
            <div className="relative w-full h-full min-h-[600px]">
              <Image
                src={"/banner2.jpg"}
                alt="Join our community"
                fill
                className="object-cover"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>

              {/* Text overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Welcome to Sky Group
                </h2>
                <p className="text-xl opacity-90 mb-6">
                  Join thousands of professionals already using our events
                  platform
                </p>
                <div className="flex items-center gap-2 text-sm opacity-80">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live community of 10,000+ members</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
