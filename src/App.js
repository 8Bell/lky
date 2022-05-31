import { Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import './App.css';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Fade } from 'react-awesome-reveal';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const drawerWidth = 250;

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

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		//width: `calc(100% - ${drawerWidth}px)`,
		width: '100vw',
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		//marginRight: drawerWidth,
		marginRight: 0,
	}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 0),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

function App() {
	const [navShadow, setNavShadow] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 20) {
				setNavShadow(true);
			} else {
				setNavShadow(false);
			}
		});

		return () => {
			window.removeEventListener('scroll', () => {});
		};
	}, []);

	const arr = Array.from({ length: 20 }, (v, i) => i);

	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className='App'>
			<div id='page-loading-blocs-notifaction' class='page-preloader'></div>

			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar
					position='fixed'
					open={open}
					style={{
						backgroundColor: '#fbfbfb',
						color: '#333',
						boxShadow: navShadow
							? ' 0 3px 5px 5px rgba(100,100,100,0.3)'
							: 'none',

						transitionProperty: 'all',
						transitionDuration: '0.2s',
					}}>
					<Toolbar>
						<Typography
							variant='h5'
							noWrap
							sx={{
								flexGrow: 2,
								fontFamily: 'JejuMyeongjo',
								fontWeight: 'bold',
								color: 'rgba(0, 0, 0, 0.6)',
							}}
							component='div'
							align='left'>
							Leegyuyeon
						</Typography>
						<IconButton
							style={{ color: '#333' }}
							aria-label='open drawer'
							edge='end'
							onClick={handleDrawerOpen}
							sx={{ ...(open && { display: 'none' }) }}>
							<MenuRoundedIcon fontSize='large' />
						</IconButton>
					</Toolbar>
				</AppBar>
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
											}}>
											{idx + 1}
										</Paper>
									</Fade>
								</Grid>
							))}
							<Grid item xs={12}>
								<Button
									variant='contained'
									sx={[
										{
											'&:hover': {
												backgroundColor: '#2c362a',
												filter: 'brightness(1.8)',
											},
										},
										{
											margin: theme.spacing(
												10,
												0,
												0,
												0
											),
											borderRadius: '30px',
											padding: theme.spacing(
												1.6,
												2,
												1.6,
												2
											),
											fontSize: '17px',
											backgroundColor: '#2c362a',
										},
									]}>
									Contact
								</Button>
								<Typography
									sx={{
										margin: theme.spacing(10, 0, 0, 0),
										color: '#999',
									}}>
									Leegyuyeon
								</Typography>
								<Typography
									sx={[
										{
											'&:hover': {
												filter: 'brightness(0.5)',
											},
										},
										{
											margin: theme.spacing(2, 0, 0, 0),
											color: '#999',
										},
									]}>
									@analogyuyeon
								</Typography>
								<Typography
									sx={{
										margin: theme.spacing(2, 0, 0, 0),
										color: '#999',
									}}>
									{'© Leegyuyeon ' +
										new Date().getFullYear() +
										'. All rights reserved'}
								</Typography>
							</Grid>
						</Grid>
					</Container>
				</Main>
				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: drawerWidth,
							backgroundColor: '#2c362a',
							color: '#fbfbfb',
						},
					}}
					//variant='persistent'
					anchor='right'
					open={open}>
					<DrawerHeader>
						<IconButton
							onClick={handleDrawerClose}
							style={{ color: '#fbfbfb' }}>
							{theme.direction === 'rtl' ? (
								<ChevronLeftIcon fontSize='large' />
							) : (
								<ChevronRightIcon fontSize='large' />
							)}
						</IconButton>
					</DrawerHeader>

					<List
						style={{
							transition: 'all 0.2s linear',
						}}>
						{[
							'Leegyuyeon',
							'divider',
							'Portrait',
							'Landscape',
							'divider',
							'Studio Sorok',
							'Notice',
							'Contact ▾',
						].map((text, index) => (
							<div>
								<Fade
									direction='right'
									duration={900}
									delay={index * 100}
									cascade={true}
									damping={0.2}>
									{text !== 'divider' ? (
										<ListItem key={text} disablePadding>
											<ListItemButton>
												<ListItemText
													primary={text}
												/>
											</ListItemButton>
										</ListItem>
									) : (
										<Divider
											style={{
												backgroundColor: '#fbfbfb',
												marginLeft: '15px',
											}}
										/>
									)}
								</Fade>
							</div>
						))}
					</List>
				</Drawer>
			</Box>
		</div>
	);
}

export default App;
