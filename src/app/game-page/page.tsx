"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { increment, reset } from "../store/scoreSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import LeaderboardModal from "../components/LeaderboardModal";
import { saveScore, fetchLeaderboardData } from "../api/leaderboard";
import { LeaderboardEntry } from "../types/leaderboard";
import GameHeader from "../components/GameHeader";
import GameBoard from "../components/GameBoard";
import WelcomeMessage from "../components/WelcomeMessage";
import GameButton from "../components/GameButton";

export default function WelcomePage() {
  const [gameRunning, setGameRunning] = useState(false);
  const [timer, setTimer] = useState(120);
  const [activeMoles, setActiveMoles] = useState<number[]>([]);
  const [hitMoles, setHitMoles] = useState<number[]>([]);
  const [leaderboardOpen, setLeaderboardOpen] = useState<boolean>(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const name = useSelector((state: RootState) => state.name.value);
  const score = useSelector((state: RootState) => state.score.value);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!name) {
      router.push("/");
    }
  }, [name, router]);

  useEffect(() => {
    fetchLeaderboardData()
      .then(data => setLeaderboardData(data))
      .catch(error => console.error('Error fetching leaderboard data:', error));
  }, []);

  useEffect(() => {
    if (!gameRunning) return;
    if (timer === 0) {
      setGameRunning(false);
      setActiveMoles([]);
      saveScore(name, score)
        .then(() => fetchLeaderboardData())
        .then(data => setLeaderboardData(data))
        .then(() => setLeaderboardOpen(true))
        .catch(error => console.error('Error handling game end:', error));
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameRunning, timer, name, score]);

  useEffect(() => {
    if (!gameRunning) return;
    const moleInterval = setInterval(() => {
      const idx = Math.floor(Math.random() * 12);
      setActiveMoles([idx]);
    }, 700);
    return () => clearInterval(moleInterval);
  }, [gameRunning]);

  const handleStart = () => {
    dispatch(reset());
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
        <GameHeader
          score={score}
          timer={timer}
          onLeaderboardOpen={() => setLeaderboardOpen(true)}
        />
        <Stack
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
          color={"white"}
        >
          <WelcomeMessage name={name} />
          <Stack
            gap={8}
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <GameBoard
              activeMoles={activeMoles}
              hitMoles={hitMoles}
              onMoleClick={handleMoleClick}
            />
            <GameButton
              onClick={handleStart}
              disabled={gameRunning}
              isLoading={gameRunning}
            >
              Start Game
            </GameButton>
          </Stack>
        </Stack>
      </Stack>

      <LeaderboardModal
        open={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
        leaderboardData={leaderboardData}
      />
    </Box>
  );
}
