import { Grid } from '@mui/material';
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

function Sorok() {
	const arr = Array.from({ length: 20 }, (v, i) => i);

	const [open, setOpen] = useState(false);

	return (
		<div className='App'>
			{/* <div id='page-loading-blocs-notifaction' class='page-preloader'></div> */}

			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<NavBar open={open} setOpen={setOpen} />
				<Main open={open}>
					<DrawerHeader />
					<Container maxWidth={false}>
						<Grid container>
							{arr.map((a, idx) => (
								<Grid xs={12} md={6} lg={3} key={idx}>
									<Fade>
										<Paper
											variant='outlined'
											style={{
												height: '500px',
												backgroundColor: 'grey',
												margin: '2px',
												borderRadius: 0,
											}}>
											{idx + 1}
										</Paper>
									</Fade>
								</Grid>
							))}
							<Footer />
						</Grid>
					</Container>
				</Main>
				<SideMenu open={open} setOpen={setOpen} />
			</Box>
		</div>
	);
}

export default Sorok;
