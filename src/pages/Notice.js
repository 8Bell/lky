import { Badge, Fab, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import '../App.css';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';
import { Fade } from 'react-awesome-reveal';

import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SIdeMenu';
import { useTheme } from '@emotion/react';
import { authService, dbService, storageService } from '../fbase';
import AddBtn from '../components/AddBtn';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import '../components/closebutton.css';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3, 0),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		//marginRight: -drawerWidth,
		...(open && {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginRight: 0,
		}),
	})
);

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 0),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

function Notice({ isLoggedIn, setIsLoggedIn, isDeleteMod, setIsDeleteMod }) {
	const [open, setOpen] = useState(false);
	console.log('현재 유저', authService.currentUser);

	const [digital, setDigital] = useState([]);
	const [analog, setAnalog] = useState([]);

	useEffect(() => {
		dbService
			.collection('Portrait')
			.where('processing', '==', 'Digital')
			.onSnapshot((snapshot) => {
				const Pics = snapshot.docs.map((pic) => ({
					...pic.data(),
					id: pic.uuid,
				}));
				console.log(Pics);
				setDigital(Pics);
			});
		dbService
			.collection('Portrait')
			.where('processing', '==', 'Analog')
			.onSnapshot((snapshot) => {
				const Pics = snapshot.docs.map((pic) => ({
					...pic.data(),
					id: pic.uuid,
				}));
				console.log(Pics);
				setAnalog(Pics);
			});
	}, []);

	return (
		<div className='App'>
			{/* <div id='page-loading-blocs-notifaction' class='page-preloader'></div> */}

			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<NavBar open={open} setOpen={setOpen} isLoggedIn={isLoggedIn} />

				<Main open={open}>
					<DrawerHeader />
					<Container maxWidth={false} style={{ padding: (0, 3, 0, 3) }}>
						<Grid container>
							<Grid xs={12} md={12} lg={12}>
								<Typography>Option</Typography>
							</Grid>
							<Grid xs={12} md={12} lg={6}>
								<div
									style={{
										overflow: 'hidden',
										width: '500px',
										height: '500px',
									}}>
									{digital !== [] && (
										<img
											// src={digital[0].fileUrl}
											// alt={digital[0].title}
											sx={{
												maxHeight: '100%',
												width: 'auto',
												display: 'block',
											}}
										/>
									)}
								</div>
							</Grid>
							<Grid xs={12} md={12} lg={6}>
								<Typography>Digital</Typography>
								<Typography>Fuji x-pro2</Typography>
								<Typography>
									디지털 촬영은 장수와 상관 없이 2시간 이내로
									진행됩니다.
								</Typography>
								<Typography>
									13장의 보정본과 200컷 이상의 원본을
									제공해드립니다.
								</Typography>
							</Grid>
							<Grid xs={12} md={12} lg={6}>
								<img />
							</Grid>
							<Grid xs={12} md={12} lg={6}>
								<Typography>Film</Typography>
								<Typography>Bigmini / Minolta x700</Typography>
								<Typography>
									필름 촬영은 1롤(36컷)을 사용합니다.
								</Typography>
								<Typography>
									필름 가격과 현상 비용이 포함된 가격입니다.
								</Typography>
								<Typography>
									보정본 10장을 제공하며, 원본은 드리지
									않습니다.
								</Typography>
							</Grid>
							<Grid></Grid>
							<Grid></Grid>
							<Grid></Grid>
							<Footer />
						</Grid>
					</Container>
				</Main>
				<SideMenu
					open={open}
					setOpen={setOpen}
					isLoggedIn={isLoggedIn}
					setIsLoggedIn={setIsLoggedIn}
					isDeleteMod={isDeleteMod}
					setIsDeleteMod={setIsDeleteMod}
				/>
			</Box>
		</div>
	);
}

export default Notice;
