import { Box, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

interface GameHeaderProps {
  score: number;
  timer: number;
  onLeaderboardOpen: () => void;
}

export default function GameHeader({ score, timer, onLeaderboardOpen }: GameHeaderProps) {
  return (
    <Stack
      flexDirection="row"
      width="100vw"
      justifyContent="space-between"
      alignItems="center"
      paddingX={8}
      paddingY={2}
      gap={4}
    >
      <Box
        sx={{
          color: '#FF0000',
          fontSize: {
            xs: '0.7rem',
            sm: '1.2rem',
            md: '1.5rem',
            lg: '1.75rem'
          },
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          fontFamily: '"Press Start 2P", cursive',
        }}
      >
        Score: {score}
      </Box>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          sx={{
            color: '#FF0000',
            fontSize: {
              xs: '0.7rem',
              sm: '1.2rem',
              md: '1.5rem',
              lg: '1.75rem'
            },
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            fontFamily: '"Press Start 2P", cursive',
          }}
        >
          Time: {timer}s
        </Box>
        <Box
          component="button"
          onClick={onLeaderboardOpen}
          sx={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFD700',
            transition: 'color 0.2s',
            '&:hover': {
              color: '#FFA500',
            },
          }}
        >
          <Box
            sx={{
              fontSize: {
                xs: '1.5rem',
                sm: '2rem',
                md: '2.5rem',
                lg: '2.5rem'
              }
            }}
          >
            <FontAwesomeIcon 
              icon={faTrophy} 
              style={{ 
                filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
              }}
            />
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
} 