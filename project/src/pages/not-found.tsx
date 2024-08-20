import rubberduck from "@/assets/rubberduck.png";

export function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center text-white text-4xl bg-[#0B132B]">
      <img src={rubberduck} alt="" />
      <h1>Page Not Found</h1>
    </div>
  );
}
