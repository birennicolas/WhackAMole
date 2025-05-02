'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { increment } from '../store/scoreSlice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Stack, Button } from '@mui/material';

export default function WelcomePage() {
  const name = useSelector((state: RootState) => state.name.value);
  const score = useSelector((state: RootState) => state.score.value);
  const dispatch = useDispatch();
  const [gameRunning, setGameRunning] = useState(false);
  const [timer, setTimer] = useState(60);
  const [activeMoles, setActiveMoles] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!name) {
      router.push('/');
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
    setTimer(60);
    setGameRunning(true);
  };

  const handleMoleClick = (idx: number) => {
    if (!gameRunning) return;
    if (activeMoles.includes(idx)) {
      dispatch(increment());
      setActiveMoles((prev) => prev.filter((i) => i !== idx));
    }
  };

  if (!name) return null;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url(/images/WAM_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Stack width="100vw" height="100vh" flexDirection="column" justifyContent="center" alignItems="center" gap={4} color={"white"}>
        <Stack flexDirection="row" width="100%" justifyContent="space-between" alignItems="center" paddingX={8}>
          <span>Score: {score}</span>
          <span>Time: {timer}s</span>
        </Stack>
        <h1>Hi, {name}!</h1>
        <Stack gap={8} alignItems="center" justifyContent="center" height="100%">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(3, 24vw)', md: 'repeat(4, 10vw)' },
              gridTemplateRows: { xs: 'repeat(4, 18vw)', md: 'repeat(3, 10vw)' },
              gap: 4,
              justifyContent: 'center',
              alignItems: 'end',
              margin: '0 auto',
              cursor: 'url(/images/WAM_Hammer110.png), auto',
            }}
          >
            {[...Array(12)].map((_, idx) => (
              <Box
                key={`hole-${idx}`}
                component="img"
                src={activeMoles.includes(idx) ? "/images/WAM_Mole.png" : "/images/WAM_Hole.png"}
                alt={activeMoles.includes(idx) ? "WAM Mole" : "WAM Hole"}
                sx={{ width: 110, height: 'auto', transition: '0.2s' }}
                onClick={() => handleMoleClick(idx)}
                draggable={false}
              />
            ))}
          </Box>
          <Button variant="contained" color="primary" onClick={handleStart} disabled={gameRunning}>
            {gameRunning ? 'Game Running...' : 'Start Game'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}