import { Box } from "@mui/material";

interface WelcomeMessageProps {
  name: string;
}

export default function WelcomeMessage({ name }: WelcomeMessageProps) {
  return (
    <Box
      component="h1"
      sx={{
        color: '#FF0000',
        fontSize: {
          xs: '0.7rem',
          sm: '1.2rem',
          md: '1.5rem',
          lg: '1.75rem'
        },
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(247, 241, 241, 0.3)',
        fontFamily: '"Press Start 2P", cursive',
        margin: 0,
      }}
    >
      Let&apos;s Play, {name}!
    </Box>
  );
} 