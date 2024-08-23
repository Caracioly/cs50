import React from "react";
import { Link } from "react-router-dom";

interface exerciseLinkProps {
  children: React.ReactNode;
  to: string;
}

export function ExerciseLink({ children, to }: exerciseLinkProps) {
  return (
    <Link
      to={to}
      className="block text-lg font-semibold text-[#F0C52A] hover:text-[#ece3bf] hover:underline"
    >
      {children}
    </Link>
  );
}
