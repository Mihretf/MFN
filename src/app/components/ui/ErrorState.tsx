import React from "react";
import { Alert, AlertTitle, Button, Box } from "@mui/material";
import { RefreshCw } from "lucide-react";
import { motion } from "motion/react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the information at this time. Please try again later.",
  onRetry,
  className = "",
}: ErrorStateProps) {
  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center w-full ${className}`}
    >
      <Alert 
        severity="error" 
        variant="filled"
        sx={{ 
          width: '100%', 
          maxWidth: 500, 
          borderRadius: 2, 
          boxShadow: 3,
        }}
        action={
          onRetry ? (
            <Button 
              color="inherit" 
              size="small" 
              onClick={onRetry} 
              startIcon={<RefreshCw className="w-4 h-4" />}
              sx={{ mt: 0.5 }}
            >
              Retry
            </Button>
          ) : null
        }
      >
        <AlertTitle sx={{ fontWeight: 600 }}>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
}
