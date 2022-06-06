import { Badge, Button, Fab, Grid, Typography } from '@mui/material';
import { Container, width } from '@mui/system';
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
			.collection('Notice')
			//.where('processing', '==', 'Digital')
			.orderBy('createdAt')
			.onSnapshot((snapshot) => {
				const Pics = snapshot.docs.filter(
					(pic) => pic.data().processing === 'Digital'
				);
				console.log(Pics);
				setDigital(Pics);
			});
		dbService
			.collection('Notice')
			//.where('processing', '==', 'Analog')
			.orderBy('createdAt', 'asc')
			.onSnapshot((snapshot) => {
				const Pics = snapshot.docs.filter(
					(pic) => pic.data().processing === 'Analog'
				);
				console.log(Pics);
				setAnalog(Pics);
			});
	}, []);

	return (
		<div className='App'>
			{/* <div id='page-loading-blocs-notifaction' class='page-preloader' /> */}

			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<NavBar open={open} setOpen={setOpen} isLoggedIn={isLoggedIn} />

				<Main open={open}>
					<DrawerHeader />
					<Container maxWidth={false} style={{ padding: (0, 3, 0, 3) }}>
						<Grid container>
							<Grid xs={12} md={12} lg={12}>
								<Typography
									sx={{
										fontSize: '22px',
										fontFamily: 'LatoR',
										fontWeight: 'bold',
										color: '#777',
										mt: 3,
										mb: 5,
									}}>
									Option
								</Typography>
							</Grid>
							<Grid xs={12} md={6} lg={6}>
								<div
									style={{
										overflow: 'hidden',
										width: '100%',
										minHeight: '50vw',
										maxHeight: '500px',
										position: 'relative',
										display: 'block',
										margin: '20px auto',
									}}>
									{digital.length !== 0 && (
										<img
											src={digital[0].data().fileUrl}
											alt={digital[0].data().title}
											style={{
												width: '100%',
												transform:
													'translateY(-20%)',
											}}
										/>
									)}
								</div>
							</Grid>
							<Grid
								xs={12}
								md={6}
								lg={6}
								sx={{ pl: '5%', pr: '5%', pt: '10%' }}>
								<Typography
									sx={{
										fontSize: '22px',
										fontFamily: 'LatoR',
										fontWeight: 'bold',
										color: '#777',
										mt: 3,
										mb: 3,
										textAlign: 'left',
									}}>
									Digital
								</Typography>
								<Typography
									sx={{
										fontSize: '18px',
										fontFamily: 'LatoR',
										color: '#777',
										mt: 3,
										mb: 3,
										textAlign: 'left',
									}}>
									Fuji x-pro2
								</Typography>
								<Typography
									sx={{
										fontSize: '15px',
										fontFamily: 'LatoR',

										color: '#777',
										mt: 1,
										mb: 1,
										textAlign: 'left',
									}}>
									디지털 촬영은 장수와 상관 없이 2시간 이내로
									진행됩니다.
								</Typography>
								<Typography
									sx={{
										fontSize: '15px',
										fontFamily: 'LatoR',

										color: '#777',
										mt: 1,
										mb: 1,
										textAlign: 'left',
									}}>
									13장의 보정본과 200컷 이상의 원본을
									제공해드립니다.
								</Typography>
								<Button
									variant='contained'
									fullWidth
									sx={{ mb: 10, mt: 3 }}>
									More info
								</Button>
							</Grid>
							<Grid xs={12} md={6} lg={6}>
								<div
									style={{
										overflow: 'hidden',
										width: '100%',
										minHeight: '50vw',
										maxHeight: '500px',
										position: 'relative',
										display: 'block',
										margin: '20px auto',
									}}>
									{analog.length !== 0 && (
										<img
											src={analog[0].data().fileUrl}
											alt={analog[0].data().title}
											style={{
												width: '100%',
												transform:
													'translateY(-20%)',
											}}
										/>
									)}
								</div>
							</Grid>
							<Grid
								xs={12}
								md={6}
								lg={6}
								sx={{ pl: '5%', pr: '5%', pt: '10%' }}>
								<Typography
									sx={{
										fontSize: '22px',
										fontFamily: 'LatoR',
										fontWeight: 'bold',
										color: '#777',
										mt: 3,
										mb: 3,
										textAlign: 'left',
									}}>
									Film
								</Typography>
								<Typography
									sx={{
										fontSize: '18px',
										fontFamily: 'LatoR',
										color: '#777',
										mt: 3,
										mb: 3,
										textAlign: 'left',
									}}>
									Konica Bigmini 301 / Minolta x700
								</Typography>
								<Typography
									sx={{
										fontSize: '15px',
										fontFamily: 'LatoR',

										color: '#777',
										mt: 1,
										mb: 1,
										textAlign: 'left',
									}}>
									필름 촬영은 1롤(36컷) 사용합니다.
								</Typography>
								<Typography
									sx={{
										fontSize: '15px',
										fontFamily: 'LatoR',

										color: '#777',
										mt: 1,
										mb: 1,
										textAlign: 'left',
									}}>
									필름 가격과 현상 비용이 포함된 가격입니다.
								</Typography>
								<Typography
									sx={{
										fontSize: '15px',
										fontFamily: 'LatoR',

										color: '#777',
										mt: 1,
										mb: 1,
										textAlign: 'left',
									}}>
									보정본 10장을 제공해드리며, 원본은 드리지
									않습니다.
								</Typography>
								<Button
									variant='contained'
									fullWidth
									sx={{ mb: 10, mt: 3 }}>
									More info
								</Button>
							</Grid>
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
