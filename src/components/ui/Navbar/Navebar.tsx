"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { ThemeToggle } from "./ModeToggle";
import { Menu } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { lang } = useParams() as { lang?: string };
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    setMounted(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ar = lang === "ar";

  return (
    <div
      className={`overflow-hidden z-50 sticky top-0 w-full transition-all duration-300 
        ${scrolled ? "bg-background/70 backdrop-blur-md border-b" : ""}
      `}
    >
      <div className="relative w-[90%] md:w-[70%] lg:w-[70%] mx-auto">
        <main className="flex justify-between items-center py-4">
          {/* Left side - Logo */}
          <section className="flex items-center">
            <Link
              href={ar ? "/" : "/en"}
              className="text-lg xl:text-2xl font-bold bg-gradient-to-r from-blue-700 to-purple-500 bg-clip-text text-transparent"
            >
              {ar ? " سكاي جروب " : "SKY GROUP "}
            </Link>
          </section>

          {/* Right side */}
          <section className="flex items-center gap-4">
            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-md transition-colors ${
                    scrolled
                      ? "hover:bg-gray-100 dark:hover:bg-gray-800"
                      : "hover:bg-white/20 dark:hover:bg-black/20"
                  }`}
                >
                  <Menu size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/login">{ar ? "تسجيل الدخول" : "Login"}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about">{ar ? "من نحن" : "About Us"}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme + Language */}
            <div
              className={`flex items-center gap-2 pl-4 ${
                scrolled ? "border-l" : ""
              }`}
            >
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
