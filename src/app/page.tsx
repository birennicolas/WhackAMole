'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setName } from './store/nameSlice';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import styles from "./page.module.css";

export default function Home() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(setName(input));
      router.push('/game-page');
    }
  };

  return (
    <Stack width="100vw" height="100vh" justifyContent="center" alignItems="center" gap={4} sx={{
      backgroundImage: "url(/images/WAM_bg.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
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
            textShadow: '2px 2px 4px rgba(247, 241, 241, 0.3)',
            fontFamily: '"Press Start 2P", cursive',
            margin: 0,
            marginBottom: 4
          }}
        >
          Whack a Mole
        </Box>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your name"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
    </Stack>
  );
}
