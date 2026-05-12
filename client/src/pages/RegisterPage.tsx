/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import { useAuth } from "../lib/hooks/useAuth";

export function RegisterPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { register, updateAvatar } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleAvatarFile = (file: File) => {
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      await register({
        name,
        email,
        password,
      });

      if (avatarFile) {
        await updateAvatar(avatarFile);
      }

      navigate({
        to: "/dashboard" as any,
      });
    } catch (error) {
      console.error(error);
      alert("Register failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4EBDD] p-6 text-[#1F1F1F]">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[420px_1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border-4 border-[#1F1F1F] bg-[#FFF9EF] shadow-[12px_12px_0_#EFA0A5]"
        >
          <header className="rounded-t-[1.7rem] border-b-4 border-[#1F1F1F] bg-[#F3A8A8] px-6 py-5">
            <h2 className="text-center text-5xl font-bold">Register</h2>
          </header>

          <div className="space-y-5 p-8">
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();

                const file = e.dataTransfer.files[0];

                if (file) {
                  handleAvatarFile(file);
                }
              }}
              className="mx-auto flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-dashed border-[#6FA98B] bg-[#A8D5BA] text-center text-xl font-bold text-[#1F1F1F]"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Avatar preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>
                  Drop
                  <br />
                  Avatar
                </span>
              )}

              <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    handleAvatarFile(file);
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-2xl font-bold">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-2xl border-4 border-[#1F1F1F] bg-white px-5 py-3 text-2xl outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-2xl font-bold">Email</label>
              <input
                type="email"
                placeholder="hello@neuronote.ai"
                className="w-full rounded-2xl border-4 border-[#1F1F1F] bg-white px-5 py-3 text-2xl outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-2xl font-bold">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border-4 border-[#1F1F1F] bg-white px-5 py-3 text-2xl outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer rounded-2xl border-4 border-[#1F1F1F] bg-[#A8D5BA] px-6 py-4 text-3xl font-bold shadow-[6px_6px_0_#1F1F1F] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              {isLoading ? "Creating..." : "Register"}
            </button>

            <p className="text-center text-2xl">
              Already have an account?{" "}
              <Link to="/login" className="font-bold underline">
                Login
              </Link>
            </p>
          </div>
        </form>

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
              Build your
              <br />
              AI notebook
            </h1>

            <p className="mt-6 max-w-xl text-3xl leading-10">
              Save ideas, organize them with tags, generate summaries, and make
              your learning flow feel alive.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-3xl border-4 border-[#1F1F1F] bg-[#F3A8A8] p-5 text-2xl font-bold">
                Notes
              </div>
              <div className="rounded-3xl border-4 border-[#1F1F1F] bg-[#A8D5BA] p-5 text-2xl font-bold">
                AI Summary
              </div>
              <div className="rounded-3xl border-4 border-[#1F1F1F] bg-white p-5 text-2xl font-bold">
                Smart Tags
              </div>
              <div className="rounded-3xl border-4 border-[#1F1F1F] bg-[#F3A8A8] p-5 text-2xl font-bold">
                Creative Flow
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
