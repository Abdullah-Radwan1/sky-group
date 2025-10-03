"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  Building2,
  HeartHandshakeIcon,
} from "lucide-react";
import { TypeDictionary } from "../../../dictionaries/en";
import { useParams } from "next/navigation";

export const Search = ({ dict }: { dict: TypeDictionary }) => {
  const t = dict.search; // shorthand for easier access
const {lang} = useParams()
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    hall: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, hall: value }));
  };

  return (
    <div className="min-h-screen flex items-start mt-10 justify-center sm:p-4 p-2">
      <div className="w-full max-w-6xl rounded-xl border bg-card shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Form Inputs */}
          <div className="w-full lg:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6">{t.title}</h2>

            {/* Hall Select */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="hall">{t.form.hall.label}</Label>
              <Select dir={lang==="ar" ? "rtl" : "ltr"} onValueChange={handleSelectChange} value={formData.hall}>
                <SelectTrigger className="w-full h-11" id="hall">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 opacity-50" />
                    <SelectValue placeholder={t.form.hall.placeholder} />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {["Main", "Hall1", "Hall2"].map((hall) => (
                    <SelectItem key={hall} value={hall}>
                      {hall}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Email */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="email">{t.form.email.label}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.form.email.placeholder}
                  className="w-full pl-10 h-11"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="phone">{t.form.phone.label}</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                <Input
                dir={lang==="ar" ? "rtl" : "ltr"}
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.form.phone.placeholder}
                  className="w-full pl-10 h-11"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Display Data */}
          <div className="w-full lg:w-1/2 border-l p-8 bg-muted content-center">
            <h1 className="content-center text-center text-2xl font-bold mb-6">
              {t.start_message}{" "}
              <HeartHandshakeIcon className="inline" color="red" />
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
