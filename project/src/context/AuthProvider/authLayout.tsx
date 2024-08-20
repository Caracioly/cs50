import { useAuthValidation } from "./useAuthValidation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  useAuthValidation();

  return <>{children}</>;
}
