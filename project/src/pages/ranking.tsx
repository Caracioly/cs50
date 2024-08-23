import rubberduck from "@/assets/rubberduck.png";
import { useAuthValidation } from "@/context/AuthProvider/useAuthValidation";
import { useNavigate } from "react-router-dom";

import { FaClipboardList } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Api } from "@/services/api";
import { SubmitButton } from "@/components/submit-button";
import { IoLogOut } from "react-icons/io5";
import { getUserLocalStorage } from "@/context/AuthProvider/util";

interface Score {
  score: number;
}

interface ScoreRankingType {
  name: string;
  scores: Score[];
}

export function Ranking() {
  const { handleLogout } = useAuthValidation();
  const navigate = useNavigate();

  if (!getUserLocalStorage()) {
    navigate("/");
    return;
  }

  const user = getUserLocalStorage();

  const [scoreranking, setScoreRanking] = useState<ScoreRankingType[]>([]);

  const fetchData = async () => {
    try {
      const response = await Api.get("ranking", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setScoreRanking(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, [Ranking]);

  function navigateToExercises() {
    navigate("/exercises");
  }

  return (
    <div className="w-full h-screen bg-[#0B132B] pt-4">
      <div className="flex flex-col h-full items-center justify-between">
        <img className="size-48" src={rubberduck} alt="rubberduck" />
        <div className="w-1/4 h-2/4 bg-[#1C2541] p-6 rounded-2xl ring-[#F0C52A] ring-offset-2 ring-offset-zinc-950 overflow-y-auto">
          <h1 className="text-3xl font-bold text-center mb-3 text-[#F0C52A] ">
            Ranking
          </h1>
          <table className="w-full text-white text-center border-collapse rounded-lg overflow-scroll">
            <thead>
              <tr className="text-2xl font-mono bg-[#0B132B]">
                <th className="py-2 px-4 border-b-2 border-[#F0C52A] rounded-l-lg">
                  Name
                </th>
                <th className="py-2 px-4 border-b-2 border-[#F0C52A] rounded-r-lg">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {scoreranking
                .filter((item) => item.scores.some((score) => score.score > 0))
                .sort((a, b) => {
                  const scoreA = a.scores[0]?.score || 0;
                  const scoreB = b.scores[0]?.score || 0;
                  return scoreB - scoreA;
                })
                .map((item, index) => (
                  <tr key={index} className="bg-[#1C2541]">
                    <td className="py-2 px-4 border-b">{item.name}</td>
                    <td className="py-2 px-4 border-b">
                      {item.scores[0]?.score || 0}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row w-auto gap-x-2">
          <SubmitButton
            onClick={navigateToExercises}
            className="items-center flex gap-x-2 font-bold px-3 bg-[#F0C52A] rounded-lg hover:bg-[#ece3bf] text-[#0B132B] py-2"
          >
            <FaClipboardList />
            Exercises
          </SubmitButton>
          <SubmitButton
            onClick={handleLogout}
            className="items-center flex gap-x-2 font-bold px-3 bg-[#F0C52A] rounded-lg hover:bg-[#ece3bf] text-[#0B132B] py-2"
          >
            <IoLogOut className="" size={20} />
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
