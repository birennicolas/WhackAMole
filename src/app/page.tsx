'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setName } from './store/nameSlice';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
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
    <Stack width="100vw" height="100vh" justifyContent="center" alignItems="center">
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
