import rubberduck from "@/assets/rubberduck.png";

export function Login() {
  return (
    <div className="w-full h-screen relative">
      <div className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1 blur-md"></div>
      <div className="w-auto h-[60vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-grow h-full">
          <div className="w-max-[60%] w-full bg-[#6D4C1F] flex flex-col justify-center items-center p-4 rounded-l-2xl">
            <img className="size-24" src={rubberduck} alt="rubberduck" />
            <h1>Welcome to CS50</h1>
            <p>Enter your login and password</p>
          </div>
          <div className="w-auto bg-[#97c0d8] flex items-center justify-center p-4 rounded-r-2xl">
            <form action="/" className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="login"
                autoComplete="off"
                autoFocus
              />
              <input type="password" placeholder="password" />
              <button className="py-2 px-4 bg-[#FED46F] text-white rounded-lg hover:bg-blue-600 transition-colors" type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
