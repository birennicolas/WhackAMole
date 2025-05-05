import { Modal, Paper, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { LeaderboardEntry } from "../types/leaderboard";

interface LeaderboardModalProps {
  open: boolean;
  onClose: () => void;
  leaderboardData: LeaderboardEntry[];
}

export default function LeaderboardModal({ open, onClose, leaderboardData }: LeaderboardModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="leaderboard-modal"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{
          width: '90%',
          maxWidth: 600,
          maxHeight: '90vh',
          p: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <Box
          sx={{
            mb: 3,
            color: '#FF0000',
            fontSize: {
              xs: '1rem',
              sm: '1.5rem',
              md: '2rem',
            },
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily: '"Press Start 2P", cursive',
          }}
        >
          Leaderboard
        </Box>
        <TableContainer sx={{ maxHeight: '60vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: { xs: '0.7rem', sm: '1rem' },
                    backgroundColor: 'red',
                    color: 'white',
                  }}
                >
                  Rank
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: { xs: '0.7rem', sm: '1rem' },
                    backgroundColor: 'red',
                    color: 'white',
                  }}
                >
                  Player
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: { xs: '0.7rem', sm: '1rem' },
                    backgroundColor: 'red',
                    color: 'white',
                  }}
                >
                  Score
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      fontFamily: '"Press Start 2P", cursive',
                      fontSize: { xs: '0.6rem', sm: '0.8rem' },
                    }}
                  >
                    #{index + 1}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: '"Press Start 2P", cursive',
                      fontSize: { xs: '0.6rem', sm: '0.8rem' },
                    }}
                  >
                    {entry.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: '"Press Start 2P", cursive',
                      fontSize: { xs: '0.6rem', sm: '0.8rem' },
                    }}
                  >
                    {entry.score}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Modal>
  );
} 