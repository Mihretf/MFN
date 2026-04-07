import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message = "Loading...", className = "" }: LoadingStateProps) {
  return (
    <Box 
      className={`flex flex-col items-center justify-center p-12 text-center ${className}`}
      sx={{ color: "text.secondary" }}
    >
      <CircularProgress size={46} color="primary" sx={{ mb: 2 }} />
      <Typography 
        variant="subtitle1" 
        sx={{ 
          fontWeight: 500, 
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' 
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}
