import { Code } from "@/components/code";
import { CodeEditor } from "@/components/codeEditor";
import { SubmitButton } from "@/components/submit-button";
import { useAuthValidation } from "@/context/AuthProvider/useAuthValidation";
import { getUserLocalStorage } from "@/context/AuthProvider/util";
import { Api } from "@/services/api";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

// #F0C52A #FFFFFF #0B132B #1C2541 #3A506B

export function Greet() {
  const { handleLogout } = useAuthValidation();
  const navigate = useNavigate();

  if (!getUserLocalStorage()) {
    navigate("/");
    return;
  }

  const user = getUserLocalStorage();

  const [testCases, setTestCases] = useState<TestCase[]>([
    { test: 1, Input: "Andre", Expect: "hello, Andre", Output: "" },
    { test: 2, Input: "David", Expect: "hello, David", Output: "" },
    { test: 3, Input: "Brian", Expect: "hello, Brian", Output: "" },
  ]);

  const editorRef = useRef<CodeEditorRef>(null);

  async function submitTest() {
    const editorValue = editorRef.current?.getEditorValue();
    console.log(editorValue);

    try {
      await Api.post("greet", {
        code: editorValue,
      }).then((response) => {
        const result = response.data.results;

        const updatedTestCases = testCases.map((testCase, index) => ({
          ...testCase,
          Output: result[index].result,
          passed: result[index].passed,
        }));
        setTestCases(updatedTestCases);
        toast.success("Test submitted successfully");
      });
    } catch (error: any) {
      toast.error(error.response.data.message || "Syntax error");
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#0B132B] p-4 items-center">
      <div className="flex h-full w-2/3">
        <div className="w-1/3 p-4 text-white bg-[#1C2541] rounded-lg border-2 border-[#F0C52A] flex flex-col justify-between gap-y-3">
          <h1 className="text-center text-xl font-bold mb-4">01 - Greeting</h1>

          <p>
            Your task is to write a function that accepts a <Code>string</Code>
            parameter, representing a person's name, and returns a personalized
            greeting for that name.
          </p>

          <p className="mt-2">
            For instance, given a <Code>string</Code> named <Code>"andre"</Code>
            , your function should output:
          </p>

          <p className="mt-1 font-bold">"hello, andre"</p>

          <h2 className="mt-4 text-lg font-bold">Example:</h2>

          <p>
            <b>Input:</b> <Code>David</Code>
          </p>
          <p>
            <b>Output:</b> <Code>"hello, David"</Code>
          </p>
          <p className="mt-2">
            <b>Explanation:</b> Since the input is David, your function should
            return <br /> <Code>"hello, David"</Code> to greet the name
            provided.
          </p>

          <div className="border-t border-gray-500">
            <p className="mt-2 mb-2 font-bold">Hi: {user.name}</p>
            <div className="flex justify-between items-center">
              <SubmitButton onClick={handleLogout}>Logout</SubmitButton>
              <a className="text-white font-bold text-end">Score: 1</a>
            </div>
          </div>
        </div>

        <div className="w-2/3 flex flex-col justify-between px-4 rounded-lg">
          <div className="h-2/3 mb-5 border-2 border-[#665412]">
            <CodeEditor 
            ref={editorRef} 
            defaultValue="# def greet()"/>
          </div>

          <div className="bg-[#1C2541] p-4 rounded-lg border-2 border-[#f3d97d]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-xl text-white">Testcases</h2>
              <div className="flex flex-row items-center">
                <span className="text-white font-bold mr-6">Chances: 2/3</span>
                <SubmitButton onClick={submitTest}>Submit Test</SubmitButton>
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
