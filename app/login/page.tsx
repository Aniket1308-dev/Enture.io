"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/features/auth/authApi";
import { setCredentials } from "@/features/auth/authSlice";

export default function LoginPage() {
  // const [useAlias, setUseAlias] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials({ user: result.user, token: result.token }));
      localStorage.setItem("token", result.token);
      router.push("/dashboard");
        } catch (err) {
      const message =
       typeof err === 'object' && err !== null && 'data' in err
        ? (err as { data?: { error?: string } }).data?.error
        : undefined;
        setError(message || "Invalid email or password");
        }
  };

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

 <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              className="w-full mt-2 bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

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