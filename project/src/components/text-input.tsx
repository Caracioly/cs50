import React from "react";

type inputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ ...rest }: inputProps) {
  return (
    <input
      className="py-2 px-3 rounded-lg bg-[#0B132B] outline-none"
      {...rest}
    />
  );
}
