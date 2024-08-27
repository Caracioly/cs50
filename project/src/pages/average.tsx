import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { IoLogOut } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";

import { Api } from "@/services/api";

import { getUserLocalStorage } from "@/context/AuthProvider/util";

import { useAuthValidation } from "@/context/AuthProvider/useAuthValidation";
import { SubmitButton } from "@/components/submit-button";
import { CodeEditor } from "@/components/codeEditor";
import { Code } from "@/components/code";

interface CodeEditorRef {
  getEditorValue: () => string;
}

interface TestCase {
  test: number;
  Input: string;
  Expect: string;
  Output: string;
  passed?: boolean;
}

export function Average() {
  const { handleLogout } = useAuthValidation();
  const navigate = useNavigate();

  if (!getUserLocalStorage()) {
    navigate("/");
    return;
  }

  const user = getUserLocalStorage();

  const [chances, setChances] = useState(0);
  const [score, setScore] = useState(0);
  const [testCases, setTestCases] = useState<TestCase[]>([
    { test: 1, Input: "list = [2, 4, 6]", Expect: "4", Output: "" },
    { test: 2, Input: "list = [1, 1, 1, 1]", Expect: "1", Output: "" },
    { test: 3, Input: "list = [-1, 1, -1, 1]", Expect: "0", Output: "" },
  ]);

  const fetchData = async () => {
    try {
      const response = await Api.get("user-stats", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setChances(response.data.chances[2]);
      setScore(response.data.score);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, [Average]);

  const editorRef = useRef<CodeEditorRef>(null);

  async function submitTest() {
    const editorValue = editorRef.current?.getEditorValue();

    try {
      await Api.post("average", {
        code: editorValue,
        token: user.token,
      })
        .then((response) => {
          const result = response.data.results;

          const updatedTestCases = testCases.map((testCase, index) => ({
            ...testCase,
            Output: result[index].result,
            passed: result[index].passed,
          }));
          setTestCases(updatedTestCases);

          toast.info("Test submitted");
        })
        .finally(() => {
          fetchData();
        });
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  }

  function navigateToExercises() {
    navigate("/exercises");
  }

  return (
    <div className="flex flex-col min-h-screen h-full bg-[#0B132B] p-4 items-center justify-center">
      <div className="flex min-h-[90vh] h-full w-2/3">
        <div className="w-1/3 p-4 text-white bg-[#1C2541] rounded-lg border-2 border-[#F0C52A] flex flex-col justify-between gap-y-3">
          <h1 className="text-center text-xl font-bold mb-4">03 - Average</h1>

          <p>
            Your task is to write a function that accepts a single{" "}
            <Code>list</Code> parameter, representing a list of integers, and
            returns the average of these numbers.
          </p>

          <p className="mt-2">
            For instance, given a list of integers <br /> <Code>list = [3, 5, 7]</Code>
            , your function should output:
          </p>

          <p className="mt-1 font-bold">5</p>

          <h2 className="mt-4 text-lg font-bold">Example:</h2>

          <p>
            <b>Input:</b> <Code>list = [7, 8, 9]</Code>
          </p>
          <p>
            <b>Output:</b> <Code>8</Code>
          </p>
          <p className="mt-2">
            <b>Explanation:</b> Since the input list contains 7, 8, and 9, your
            function should return <br /> <Code>8</Code> as the average of these
            numbers.
          </p>

          <div className="border-t border-gray-500">
            <p className="mt-2 mb-2 font-bold">Hi: {user.name}</p>
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-x-2 w-auto">
                <SubmitButton
                  onClick={handleLogout}
                  className="items-center flex gap-x-2 font-bold px-3 bg-[#F0C52A] rounded-lg hover:bg-[#ece3bf] text-[#0B132B] py-2"
                >
                  <IoLogOut className="" size={20} />
                  Logout
                </SubmitButton>
                <SubmitButton
                  onClick={navigateToExercises}
                  className="items-center flex gap-x-2 font-bold px-3 bg-[#F0C52A] rounded-lg hover:bg-[#ece3bf] text-[#0B132B] py-2"
                >
                  <FaClipboardList />
                  Exercises
                </SubmitButton>
              </div>
              <div className="flex">
                <a className="text-white font-bold text-end">Score: {score}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/3 flex flex-col justify-between px-4 rounded-lg">
          <div className="h-2/3 mb-5 border-2 border-[#665412]">
            <CodeEditor ref={editorRef} defaultValue="# def average()" />
          </div>

          <div className="bg-[#1C2541] p-4 rounded-lg border-2 border-[#f3d97d]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-xl text-white">Testcases</h2>
              <div className="flex flex-row items-center">
                <span className="text-white font-bold mr-6">
                  Chances: {chances}/3
                </span>
                <SubmitButton disabled={chances === 0} onClick={submitTest}>
                  Submit Test
                </SubmitButton>
              </div>
            </div>
            <div className="flex flex-row flex-wrap p-4 rounded-lg text-white justify-center">
              {testCases.map((testCase) => (
                <div key={testCase.test} className="p-2">
                  <div
                    className={`p-3 bg-[#1C2541] rounded-lg text-white border-2 ${
                      testCase.Output === ""
                        ? "border-[#ffffff]"
                        : testCase.passed
                        ? "border-green-400"
                        : "border-red-400"
                    }`}
                  >
                    <h1 className="text-center text-xl font-bold mb-2">
                      Test {testCase.test}
                    </h1>
                    <p>
                      Input:{" "}
                      <span className="text-gray-400">"{testCase.Input}"</span>
                    </p>
                    <p>
                      Expect:{" "}
                      <span className="text-gray-400">"{testCase.Expect}"</span>
                    </p>
                    <p>
                      Output:{" "}
                      <span
                        className={
                          testCase.Output === ""
                            ? "text-gray-400"
                            : testCase.passed
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        "{testCase.Output}"
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
