"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { increment } from "../store/scoreSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Stack, Button } from "@mui/material";

export default function WelcomePage() {
  const name = useSelector((state: RootState) => state.name.value);
  const score = useSelector((state: RootState) => state.score.value);
  const dispatch = useDispatch();
  const [gameRunning, setGameRunning] = useState(false);
  const [timer, setTimer] = useState(120);
  const [activeMoles, setActiveMoles] = useState<number[]>([]);
  const [hitMoles, setHitMoles] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!name) {
      router.push("/");
    }
  }, [name, router]);

  useEffect(() => {
    if (!gameRunning) return;
    if (timer === 0) {
      setGameRunning(false);
      setActiveMoles([]);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameRunning, timer]);

  useEffect(() => {
    if (!gameRunning) return;
    const moleInterval = setInterval(() => {
      const idx = Math.floor(Math.random() * 12);
      setActiveMoles([idx]);
    }, 700);
    return () => clearInterval(moleInterval);
  }, [gameRunning]);

  const handleStart = () => {
    setTimer(120);
    setGameRunning(true);
  };

  const handleMoleClick = (idx: number) => {
    if (!gameRunning) return;
    if (activeMoles.includes(idx)) {
      dispatch(increment());
      setHitMoles([idx]);
      setTimeout(() => {
        setHitMoles([]);
      }, 100);
      setActiveMoles((prev) => prev.filter((i) => i !== idx));
    }
  };

  if (!name) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: "url(/images/WAM_bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack>
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
        </Stack>
        <Stack
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
          color={"white"}
        >
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
            Let's Play, {name}!
          </Box>
          <Stack
            gap={8}
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Box
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
                  onClick={() => handleMoleClick(idx)}
                  draggable={false}
                />
              ))}
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStart}
              disabled={gameRunning}
            >
              {gameRunning ? "Game Running..." : "Start Game"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
