import { Box } from "@mui/material";

interface GameBoardProps {
  activeMoles: number[];
  hitMoles: number[];
  onMoleClick: (idx: number) => void;
}

export default function GameBoard({ activeMoles, hitMoles, onMoleClick }: GameBoardProps) {
  return (
    <Box
      data-testid="game-board"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(3, 24vw)",
          md: "repeat(4, 10vw)",
        },
        gridTemplateRows: {
          xs: "repeat(4, 18vw)",
          md: "repeat(3, 10vw)",
        },
        gap: 4,
        justifyContent: "center",
        alignItems: "end",
        margin: "0 auto",
        cursor: "url(/images/WAM_Hammer110.png) 55 55, auto",
      }}
    >
      {[...Array(12)].map((_, idx) => (
        <Box
          key={`hole-${idx}`}
          data-testid="mole-hole"
          data-active={activeMoles.includes(idx)}
          data-hit={hitMoles.includes(idx)}
          component="img"
          src={
            activeMoles.includes(idx)
              ? "/images/WAM_Mole.png"
              : "/images/WAM_Hole.png"
          }
          alt={activeMoles.includes(idx) ? "WAM Mole" : "WAM Hole"}
          justifyContent={"center"}
          sx={{
            width: "100%",
            height: "auto",
            transition: "0.2s",
            filter: hitMoles.includes(idx)
              ? "sepia(100%) saturate(300%) brightness(70%) hue-rotate(-50deg)"
              : "none",
          }}
          onClick={() => onMoleClick(idx)}
          draggable={false}
        />
      ))}
    </Box>
  );
} 