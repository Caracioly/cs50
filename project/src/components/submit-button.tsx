import React from "react";

type buttonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SubmitButton({ ...rest }: buttonProps) {
  return (
    <button
      className="text-[#0B132B] font-bold py-2 px-4 bg-[#F0C52A] rounded-lg hover:bg-[#ece3bf]"
      {...rest}
    />
  );
}
