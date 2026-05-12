/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import { useAuth } from "../lib/hooks/useAuth";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (loginEmail: string, loginPassword: string) => {
    try {
      setIsLoading(true);

      await login({
        email: loginEmail,
        password: loginPassword,
      });

      navigate({
        to: "/dashboard" as any,
      });
    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleLogin(email, password);
  };

  const handleDemoLogin = async () => {
    await handleLogin("demo@neuronote.ai", "Demo1234!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4EBDD] p-6 text-[#1F1F1F]">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_420px]">
        <section className="hidden rounded-[2rem] border-4 border-[#1F1F1F] bg-[#FFF9EF] shadow-[12px_12px_0_#EFA0A5] lg:flex lg:flex-col">
          <header className="rounded-t-[1.7rem] border-b-4 border-[#1F1F1F] bg-[#A8D5BA] px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">×</span>
              <span className="text-3xl">−</span>
              <span className="text-3xl">□</span>

              <div className="h-5 flex-1 rounded-full border-4 border-[#1F1F1F] bg-[#FFF9EF]" />
            </div>
          </header>

          <div className="flex flex-1 flex-col justify-center bg-[linear-gradient(#E8DED2_1px,transparent_1px),linear-gradient(90deg,#E8DED2_1px,transparent_1px)] bg-[size:28px_28px] p-10">
            <h1 className="text-7xl leading-none font-bold">
              Neuro
              <br />
              Note
            </h1>

            <p className="mt-6 max-w-md text-3xl leading-10">
              Your cute AI workspace for notes, tags, ideas and creative
              productivity.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="rounded-full border-4 border-[#1F1F1F] bg-[#F3A8A8] px-6 py-3 text-2xl">
                AI Notes
              </div>

              <div className="rounded-full border-4 border-[#1F1F1F] bg-[#A8D5BA] px-6 py-3 text-2xl">
                Smart Tags
              </div>
            </div>

            <div className="mt-10 max-w-xl rounded-3xl border-4 border-[#1F1F1F] bg-[#FFF4D6] p-5 shadow-[6px_6px_0_#1F1F1F]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-3xl font-bold">Demo Workspace</p>

                  <p className="mt-2 text-xl leading-8">
                    Explore NeuroNote instantly with a ready-to-use demo
                    account.
                  </p>
                </div>

                <div className="rounded-full border-4 border-[#1F1F1F] bg-[#F3A8A8] px-4 py-2 text-xl font-bold">
                  DEMO
                </div>
              </div>

              <div className="mt-5 grid gap-4 rounded-2xl border-4 border-dashed border-[#1F1F1F] bg-white p-4 sm:grid-cols-2">
                <div>
                  <p className="text-lg font-bold">Email</p>
                  <p className="break-all text-xl">demo@neuronote.ai</p>
                </div>

                <div>
                  <p className="text-lg font-bold">Password</p>
                  <p className="text-xl">Demo1234!</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="mt-5 w-full rounded-2xl border-4 border-[#1F1F1F] bg-[#A8D5BA] px-5 py-3 text-2xl font-bold shadow-[5px_5px_0_#1F1F1F] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                Explore Demo
              </button>
            </div>
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border-4 border-[#1F1F1F] bg-[#FFF9EF] shadow-[12px_12px_0_#EFA0A5]"
        >
          <header className="rounded-t-[1.7rem] border-b-4 border-[#1F1F1F] bg-[#F3A8A8] px-6 py-5">
            <h2 className="text-center text-5xl font-bold">Login</h2>
          </header>

          <div className="space-y-6 p-8">
            <div className="space-y-2">
              <label className="text-2xl font-bold">Email</label>

              <input
                type="email"
                placeholder="hello@neuronote.ai"
                className="w-full rounded-2xl border-4 border-[#1F1F1F] bg-white px-5 py-4 text-2xl outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-2xl font-bold">Password</label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border-4 border-[#1F1F1F] bg-white px-5 py-4 text-2xl outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer rounded-2xl border-4 border-[#1F1F1F] bg-[#A8D5BA] px-6 py-4 text-3xl font-bold shadow-[6px_6px_0_#1F1F1F] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>

            <p className="text-center text-2xl">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-bold underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
