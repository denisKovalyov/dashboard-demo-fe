import React from "react";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="w-full bg-primary text-primary-foreground border-b border-border p-6">
      <h1 className="text-3xl font-bold">{title}</h1>
    </header>
  );
};
