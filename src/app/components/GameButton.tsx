import { Button, ButtonProps } from "@mui/material";

interface GameButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export default function GameButton({ isLoading, children, sx, ...props }: GameButtonProps) {
  return (
    <Button
      type="submit" 
      variant="contained" 
      fullWidth
      sx={{
        backgroundColor: '#FF0000',
        fontFamily: '"Press Start 2P", cursive',
        '&:hover': {
          backgroundColor: '#CC0000',
        },
        width: '300px',
        ...sx
      }}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </Button>
  );
} 