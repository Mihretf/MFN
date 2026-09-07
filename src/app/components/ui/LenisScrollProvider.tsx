import React from "react";

// Scroll-jacking removed: Lenis smooth scroll was causing viewport locking
// and artificial scroll delays. Now uses native smooth scroll (set in CSS).
interface LenisScrollProviderProps {
  children: React.ReactNode;
}

export const LenisScrollProvider: React.FC<LenisScrollProviderProps> = ({ children }) => {
  return <>{children}</>;
};
