import { Button, ButtonProps } from "@mui/material";

interface GameButtonProps extends ButtonProps {
  isRunning?: boolean;
}

export default function GameButton({ isRunning, children, sx, ...props }: GameButtonProps) {
  return (
    <Button
      variant="contained" 
      fullWidth
      disabled={isRunning}
      data-testid="game-button"
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
      {isRunning ? "Running..." : children}
    </Button>
  );
} 