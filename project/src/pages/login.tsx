import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { RiUser3Fill } from "react-icons/ri";
import { MdKey } from "react-icons/md";

import { toast } from "sonner";

import { SubmitButton } from "@/components/submit-button";
import { TextInput } from "@/components/text-input";
import { useAuth } from "@/context/AuthProvider/useAuth";

import rubberduck from "@/assets/rubberduck.png";

export function Login() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);

  const auth = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password.length <= 4 || name.length <= 3) {
      toast.error("Invalid name or password");
      return;
    }

    try {
      setPending(true);
      await auth.authenticate(name, password);

      toast.success("Logged in");
      navigate("/greet");
    } catch (error) {
      toast.error("Invalid name or password");
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

          <p>
            Doesn't have an account?{" "}
            <Link
              className="text-[#F0C52A] hover:text-[#ece3bf]"
              to="/register"
            >
              Sign up
            </Link>
          </p>

          <SubmitButton type="submit" disabled={pending}>
            {pending ? "Logging in..." : "Login"}
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
