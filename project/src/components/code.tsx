type codeProps = {
  children: React.ReactNode;
};

export function Code({ children }: codeProps) {
  return <code className="bg-gray-500 rounded-lg p-1">{children}</code>;
}
