import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import fbase, { authService, cuttentUser } from '../fbase';
import { Router, useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Auth({ setIsLoggedIn }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const onChange = (e) => {
		const {
			target: { id, value },
		} = e;
		if (id === 'email') {
			setEmail(value);
		} else if (id === 'password') {
			setPassword(value);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let data = await authService.signInWithEmailAndPassword(email, password);
			setIsLoggedIn(true);
			navigate('/');
			data();
		} catch (error) {
			console.log(error);
			switch (error.code) {
				case 'auth/wrong-password':
					alert('아이디 혹은 비밀번호가 틀렸습니다.');
					break;
				case 'auth/user-not-found':
					alert('아이디 혹은 비밀번호가 틀렸습니다.');
					break;
				case 'auth/invalid-email':
					alert('이메일 양식이 올바르지 않습니다.');
					break;
				case 'auth/too-many-requests':
					alert('잠시 뒤 다시 시도해주세요');
					break;
				default:
					break;
			}
		}
	};

	useEffect(() => {
		if (authService.currentUser) {
			setIsLoggedIn(true);
			navigate('/');
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	return (
		<ThemeProvider theme={theme} sx={{ bgcolor: '#2c362a' }}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 15,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Avatar sx={{ m: 1, bgcolor: '#2c362a' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						소록 관리자 로그인
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='아이디'
							name='email'
							autoComplete='email'
							autoFocus
							value={email}
							onChange={onChange}
							sx={[
								{
									'& label.Mui-focused': {
										color: '#2c362a',
									},
									'& .MuiInput-underline:after': {
										borderBottomColor: '#2c362a',
									},
									'& .MuiOutlinedInput-root': {
										'&.Mui-focused fieldset': {
											borderColor: '#2c362a',
										},
									},
								},
							]}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='비밀번호'
							type='password'
							id='password'
							autoComplete='current-password'
							value={password}
							onChange={onChange}
							sx={[
								{
									'& label.Mui-focused': {
										color: '#2c362a',
									},
									'& .MuiInput-underline:after': {
										borderBottomColor: '#2c362a',
									},
									'& .MuiOutlinedInput-root': {
										'&.Mui-focused fieldset': {
											borderColor: '#2c362a',
										},
									},
								},
							]}
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={[
								{
									'&:hover': {
										bgcolor: '#2c362a',
										filter: 'brightness(1.8)',
									},
								},
								{ mt: 2, mb: 2, height: 50, bgcolor: '#2c362a' },
							]}>
							로그인
						</Button>
						<Grid container></Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
