import { Fab, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import '../App.css';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';
import { Fade } from 'react-awesome-reveal';

import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import SideMenu from '../components/SIdeMenu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

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

function Landscape({ isLoggedIn, setIsLoggedIn, isDeleteMod, setIsDeleteMod }) {
	const arr = Array.from({ length: 20 }, (v, i) => i);

	const [open, setOpen] = useState(false);

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
							{arr.map((a, idx) => (
								<Grid xs={12} md={6} lg={3} key={idx}>
									<Fade>
										<Paper
											variant='outlined'
											style={{
												height: '500px',
												backgroundColor: 'grey',
												margin: '3px',
												borderRadius: 0,
												display: 'grid',
												gridAutoFlow: 'column',
												gridTemplateColumns: '1fr',
											}}>
											{isLoggedIn && (
												<Fab
													aria-label='close'
													size='small'
													sx={[
														{
															'&:hover':
																{
																	backgroundColor:
																		'#2c362a',
																	filter: 'brightness(1.5)',
																},
														},
														{
															backgroundColor:
																'#2c362a',
															color: '#fbfbfb',
														},
														{
															width: 21,
															height: 21,
															minHeight: 0,
															marginLeft: 1,
															marginTop: 1,
														},
													]}>
													<CloseRoundedIcon
														sx={{
															width: 15,
															height: 15,
															margin: 0,
															padding: 0,
														}}
													/>
												</Fab>
											)}
										</Paper>
									</Fade>
								</Grid>
							))}
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

export default Landscape;
