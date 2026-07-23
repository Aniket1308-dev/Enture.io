"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [useAlias, setUseAlias] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left hero panel */}
      <div
        className="hidden md:flex md:w-[45%] flex-col justify-between p-12 text-white relative overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(135deg, #4c1d95, #6d28d9)",
          backgroundSize: "20px 20px, cover",
        }}
      >
        <div>
          <h1 className="text-3xl font-bold">
            Enture<span className="align-super text-xs ml-1">TM</span>
          </h1>
          <p className="text-xs tracking-widest text-purple-200 mt-1">
            INDUSTRIAL IOT PLATFORM
          </p>
        </div>

        <div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Digital backbone
            <br />
            for Industry 4.0
          </h2>
          <p className="text-purple-200 max-w-xs">
            Real-time monitoring, digital twins, and intelligent automation —
            built for manufacturing.
          </p>
        </div>

        <p className="text-xs text-purple-300">© 2026 Nebeskie Labs</p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-1">Welcome back</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Sign in to your factory
          </p>

          <div className="flex items-center gap-2 mb-6">
            <Switch checked={useAlias} onCheckedChange={setUseAlias} />
            <Label className="cursor-pointer" onClick={() => setUseAlias(!useAlias)}>
              Use Organisation Alias
            </Label>
          </div>

          <div className="space-y-4">
            {useAlias && (
              <Input placeholder="Organisation alias" />
            )}

            <Input placeholder="User ID" />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
            Sign in
          </Button>

          <p className="text-center text-sm text-purple-600 mt-4 cursor-pointer hover:underline">
            Forgot password?
          </p>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Powered by Nebeskie Labs · Enture™
          </p>
        </div>
      </div>
    </div>
  );
}