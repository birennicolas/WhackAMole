'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setName } from './store/nameSlice';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import GameButton from './components/GameButton';

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
              xs: '1.2rem',
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
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px' }}>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your name"
            variant="outlined"
            inputProps={{ maxLength: 24 }}
            helperText={input.length === 24 ? "Max. 24 characters" : " "}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover fieldset': {
                  borderColor: '#FF0000',
                },
              },
              '& .MuiFormHelperText-root': {
                color: input.length === 24 ? '#FF0000' : 'transparent',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                marginLeft: 0,
                textAlign: 'right',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '0.7rem'
              }
            }}
          />
          <GameButton type="submit">
            Submit
          </GameButton>
        </Box>
    </Stack>
  );
}
