import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function WelcomeMessage() {
  const name = useSelector((state: RootState) => state.name.value);

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