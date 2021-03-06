import {
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled } from '@mui/material/styles';
import { Fade } from 'react-awesome-reveal';
import { Link, Navigate } from 'react-router-dom';
import './SideMenu.css';
import SettingsIcon from '@mui/icons-material/Settings';

import LogoutIcon from '@mui/icons-material/Logout';
import { authService } from '../fbase';
import { useState } from 'react';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 0),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export default function SideMenu({
	open,
	setOpen,
	isLoggedIn,
	setIsLoggedIn,
	isDeleteMod,
	setIsDeleteMod,
	noPic,
}) {
	const drawerWidth = 230;
	const [contactMenu, setContactMenu] = useState(false);

	const handleDrawerClose = () => {
		setOpen(false);
		setContactMenu(false);
	};

	const linkTo = (text) => {
		switch (text) {
			case 'Landscape':
				return '/landscape';
			case 'Studio Sorok':
				return '/sorok';
			case 'Notice':
				return '/notice';
			// case 'Contact ▾':
			// 	break;
			default:
				return '/';
		}
	};

	const handleSignOut = () => {
		setIsLoggedIn(false);
		authService.signOut();
		window.location.reload();
	};

	const handleContactMenuOpen = () => {
		setContactMenu((prev) => !prev);
	};

	console.log(isLoggedIn);
	return (
		<div>
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
					<Fade direction='right'>
						<IconButton
							onClick={handleDrawerClose}
							style={{ color: '#fbfbfb' }}>
							<ChevronRightIcon fontSize='large' />
						</IconButton>
					</Fade>
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
						<div key={index}>
							<Fade
								direction='right'
								duration={900}
								delay={index * 80}
								cascade={true}
								damping={0.2}>
								{text !== 'divider' ? (
									<ListItem disablePadding>
										<ListItemButton
											sx={{ pl: 2, pt: 0.5, pb: 0.5 }}>
											{index === 7 ? (
												<ListItemText
													primary={text}
													primaryTypographyProps={{
														fontFamily:
															'Lato',
														fontSize: '17px',
													}}
													onClick={
														handleContactMenuOpen
													}
												/>
											) : (
												<Link
													to={linkTo(text)}
													className='linkTo'
													onClick={() =>
														Navigate(
															linkTo(
																text
															)
														)
													}>
													<ListItemText
														primary={text}
														primaryTypographyProps={{
															fontFamily:
																'Lato',
															fontSize: '17px',
														}}
													/>
												</Link>
											)}
										</ListItemButton>
									</ListItem>
								) : (
									<Divider
										sx={{
											backgroundColor: '#bbb',
											ml: 2,
											mt: 1,
											mb: 1,
										}}
									/>
								)}
							</Fade>
						</div>
					))}
				</List>
				<Fade
					direction='down'
					duration={800}
					cascade={true}
					damping={0.2}
					style={{ display: `${contactMenu ? 'block' : 'none'}` }}>
					<Typography
						sx={{
							ml: 2,
							pt: 0.5,
							pb: 0.5,
							fontFamily: 'Lato',
							fontSize: '17px',
						}}>
						<a href='https://pf.kakao.com/_KDiHb/chat' className='linkTo'>
							Kakao
						</a>
					</Typography>
					<Typography
						sx={{
							ml: 2,
							pt: 0.5,
							pb: 0.5,
							fontFamily: 'Lato',
							fontSize: '17px',
						}}>
						<a
							href='https://www.instagram.com/analogyuyeon'
							className='linkTo'>
							Instagram
						</a>
					</Typography>
				</Fade>

				<IconButton
					sx={{
						color: '#fff',
						position: 'absolute',
						bottom: '10px',
						right: '10px',
					}}>
					{isLoggedIn ? (
						<Link to='/'>
							<LogoutIcon
								fontSize='small'
								onClick={() => handleSignOut()}
								sx={{
									color: '#fff',
									position: 'absolute',
									bottom: '10px',
									right: '10px',
								}}
							/>
						</Link>
					) : (
						<Link to='/auth'>
							<SettingsIcon
								fontSize='small'
								sx={{
									color: '#2c362a',
									position: 'absolute',
									bottom: '10px',
									right: '10px',
									filter: 'brightness(1.04)',
								}}
							/>
						</Link>
					)}
				</IconButton>
			</Drawer>
		</div>
	);
}
