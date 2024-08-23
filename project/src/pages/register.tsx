import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { RiUser3Fill } from "react-icons/ri";
import { MdKey } from "react-icons/md";
import { TiCalendar } from "react-icons/ti";

import { toast } from "sonner";

import { SubmitButton } from "@/components/submit-button";
import { TextInput } from "@/components/text-input";

import rubberduck from "@/assets/rubberduck.png";
import { Api } from "@/services/api";

// #F0C52A #FFFFFF #0B132B #1c2541 #3a506b

export function Register() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const [age, setAge] = useState<number>(0);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password.length < 4) {
      toast.error("Password must be at least 4 characters long");
      return;
    } else if (name.length < 3) {
      toast.error("Name must be at least 3 characters long");
      return;
    } else if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    } else if (age > 120) {
      toast.error("Please enter a realistic age");
      return;
    } else if (age < 6) {
      toast.error("You must be at least 6 years old");
      return;
    } else if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setPending(true);
      await Api.post("users", {
        name,
        age,
        password,
      });

      toast.success("Registered successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
      return;
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-full h-screen bg-[#0B132B] pt-4">
      <div className="flex flex-col h-full items-center justify-between">
        <img className="size-48" src={rubberduck} alt="rubberduck" />
        <form
          className="text-white mt-4 flex items-center justify-center flex-col bg-[#1c2541] p-6 rounded-2xl gap-y-6 ring-[#F0C52A] ring-offset-2 ring-offset-zinc-950 focus-within:ring-1"
          action="/"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-extralight mb-4">Welcome</h1>

          <div className="flex items-center bg-[#0B132B] rounded-lg">
            <RiUser3Fill className="ml-3" size={24} color="#F0C52A" />
            <TextInput
              type="text"
              name="name"
              placeholder="Nickname"
              autoComplete="off"
              autoFocus
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-[#0B132B] rounded-lg">
            <TiCalendar className="ml-3" size={24} color="#F0C52A" />
            <TextInput
              type="number"
              name="age"
              placeholder="Age"
              autoComplete="off"
              required
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center bg-[#0B132B] rounded-lg">
            <MdKey className="ml-3" size={24} color="#F0C52A" />
            <TextInput
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-[#0B132B] rounded-lg">
            <MdKey className="ml-3" size={24} color="#F0C52A" />
            <TextInput
              type="password"
              name="confirm"
              placeholder="Confirm password"
              autoComplete="off"
              required
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <p>
            Already have an account?{" "}
            <Link className="text-[#F0C52A] hover:text-[#ece3bf]" to="/">
              Log In
            </Link>
          </p>

          <SubmitButton type="submit" disabled={pending}>
            {pending ? "Registering..." : "Register"}
          </SubmitButton>
        </form>
        <div className="w-full text-white bg-[#1c2541] text-center p-4">
          <h1>CS50 Final-Project</h1>
          <h1>Made by @andrecaracioly</h1>
        </div>
      </div>
    </div>
  );
}
