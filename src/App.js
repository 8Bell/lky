import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { grey } from '@mui/material/colors';
import { createContext, useEffect, useMemo, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { authService } from './fbase';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Landscape from './pages/Landscape';
import Notice from './pages/Notice';
import Sorok from './pages/Sorok';
import './App.css';

const Layout = ({ isLoggedIn, setIsLoggedIn, ColorModeContext }) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const [mode, setMode] = useState(
		localStorage.getItem('mode')
			? localStorage.getItem('mode')
			: prefersDarkMode
			? 'dark'
			: 'light'
	);
	// const [mode, setMode] = useState('light');

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[]
	);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					...(mode === 'light'
						? {
								// palette values for light mode
								primary: {
									main: '#fbfbfb',
								},
								secondary: {
									main: '#ddd',
								},
								background: {
									default: '#fbfbfb',
									paper: '#fbfbfb',
								},
								divider: '#aaa',
								text: {
									primary: grey[900],
									secondary: grey[800],
								},
						  }
						: {
								// palette values for dark mode

								primary: {
									main: '#fbfbfb',
								},
								secondary: {
									main: '#ddd',
								},
								background: {
									default: '#fbfbfb',
									paper: '#fbfbfb',
								},
								divider: '#aaa',
								text: {
									primary: grey[900],
									secondary: grey[800],
								},
						  }),
				},
			}),
		[mode]
	);

	const appleThemeColor = document.getElementById('theme-color');
	useEffect(() => {
		mode === 'dark'
			? appleThemeColor.setAttribute('content', '#fbfbfb')
			: appleThemeColor.setAttribute('content', '#fbfbfb');
		localStorage.setItem('mode', mode);
	}, [appleThemeColor, mode]);

	return (
		<div>
			<CssBaseline />
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<Outlet />
				</ThemeProvider>
			</ColorModeContext.Provider>
		</div>
	);
};

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
	const [isDeleteMod, setIsDeleteMod] = useState(false);
	const ColorModeContext = createContext({ toggleColorMode: () => {} });
	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			console.log(user);
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});
	}, []);

	return (
		<Routes>
			<Route
				path='/'
				element={
					<Layout
						isLoggedIn={isLoggedIn}
						setIsLoggedIn={setIsLoggedIn}
						ColorModeContext={ColorModeContext}
					/>
				}>
				<Route
					index
					element={
						<Home
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn}
							isDeleteMod={isDeleteMod}
							setIsDeleteMod={setIsDeleteMod}
						/>
					}
				/>
				<Route
					path='/landscape'
					element={
						<Landscape
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn}
							isDeleteMod={isDeleteMod}
							setIsDeleteMod={setIsDeleteMod}
						/>
					}
				/>
				<Route
					path='/sorok'
					element={
						<Sorok
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn}
							isDeleteMod={isDeleteMod}
							setIsDeleteMod={setIsDeleteMod}
						/>
					}
				/>
				<Route
					path='/notice'
					element={
						<Notice
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn}
							isDeleteMod={isDeleteMod}
							setIsDeleteMod={setIsDeleteMod}
						/>
					}
				/>
				<Route path='/auth' element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
			</Route>
		</Routes>
	);
};

export default App;
