import rubberduck from "@/assets/rubberduck.png";
import { ExerciseLink } from "@/components/exercise-link";
import { useAuthValidation } from "@/context/AuthProvider/useAuthValidation";
import { getUserLocalStorage } from "@/context/AuthProvider/util";
import { useNavigate } from "react-router-dom";

import { FaCheck, FaInfo } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Api } from "@/services/api";

import { FaRankingStar } from "react-icons/fa6";
import { SubmitButton } from "@/components/submit-button";
import { IoLogOut } from "react-icons/io5";

export function Exercises() {
  const { handleLogout } = useAuthValidation();
  const navigate = useNavigate();

  if (!getUserLocalStorage()) {
    navigate("/");
    return;
  }

  const user = getUserLocalStorage();

  const [score, setScore] = useState(0);
  const [allTestspassed, setAllTestspassed] = useState();

  const fetchData = async () => {
    try {
      const response = await Api.get("user-stats", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setScore(response.data.score);
      setAllTestspassed(response.data.allTestspassed);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, [Exercises]);

  const exercises = [
    {
      id: 1,
      url: "greet",
      name: "Greet",
      completion: allTestspassed?.[0] || false,
    },
    {
      id: 2,
      url: "sum",
      name: "Sum",
      completion: allTestspassed?.[1] || false,
    },
    {
      id: 3,
      url: "average",
      name: "Average",
      completion: allTestspassed?.[2] || false,
    },
    {
      id: 4,
      url: "vowel",
      name: "Vowel",
      completion: allTestspassed?.[3] || false,
    },
  ];

  function navigateToRanking() {
    navigate("/ranking");
  }

  return (
    <div className="w-full h-screen bg-[#0B132B] pt-4">
      <div className="flex flex-col h-full items-center justify-between">
        <img className="size-48" src={rubberduck} alt="rubberduck" />
        <div className="text-white mt-4 flex items-center justify-center flex-col bg-[#1c2541] p-6 rounded-2xl gap-y-6 ring-[#F0C52A] ring-offset-2 ring-offset-zinc-950 focus-within:ring-1">
          <h1 className="text-4xl font-extralight">Exercices</h1>
          <ul className="space-y-4 p-4 rounded-lg w-full">
            {exercises.map((exercise) => (
              <li
                key={exercise.id}
                className="bg-[#0B132B] p-4 rounded-lg border border-[#F0C52A] flex justify-between  items-center"
              >
                <ExerciseLink to={`/${exercise.url}`}>
                  <div className="underline hover:text-[#f3e4ad]">
                    {exercise.id} - {exercise.name}
                  </div>
                </ExerciseLink>
                <p className="font-bold ml-5 flex items-center flex-row gap-x-2">
                  Completion
                  {exercise.completion ? (
                    <FaCheck color="green" />
                  ) : (
                    <FaInfo color="yellow" />
                  )}
                </p>
              </li>
            ))}
          </ul>
          <p className="font-bold text-2xl">Score: {score} </p>
        </div>
        <div className="flex flex-row gap-x-2">
          <SubmitButton
            onClick={navigateToRanking}
            className="items-center flex gap-x-2 font-bold px-3 bg-[#F0C52A] rounded-lg hover:bg-[#ece3bf] text-[#0B132B] py-2"
          >
            <FaRankingStar size={20} />
            Ranking
          </SubmitButton>
          <SubmitButton
            onClick={handleLogout}
            className="items-center flex gap-x-2 font-bold px-3 bg-[#F0C52A] rounded-lg hover:bg-[#ece3bf] text-[#0B132B] py-2"
          >
            <IoLogOut size={20} />
            Logout
          </SubmitButton>
        </div>
        <div className="w-full text-white bg-[#1c2541] text-center p-4">
          <h1>CS50 Final-Project</h1>
          <h1>Made by @andrecaracioly</h1>
        </div>
      </div>
    </div>
  );
}
