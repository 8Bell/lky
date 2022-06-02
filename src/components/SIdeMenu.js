import {
	Divider,
	Drawer,
	Fab,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import './SideMenu.css';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { authService } from '../fbase';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 0),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export default function SideMenu({ open, setOpen, isLoggedIn, setIsLoggedIn }) {
	const drawerWidth = 230;

	const theme = useTheme();

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const linkTo = (text) => {
		switch (text) {
			case 'Landscape':
				return '/landscape';
			case 'Studio Sorok':
				return '/sorok';
			case 'Notice':
				return '/notice';
			default:
				return '/';
		}
	};

	const handleSignOut = () => {
		setIsLoggedIn(false);
		authService.signOut();
		window.location.reload();
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
							{theme.direction === 'rtl' ? (
								<ChevronLeftIcon fontSize='large' />
							) : (
								<ChevronRightIcon fontSize='large' />
							)}
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
										<ListItemButton>
											<Link
												to={linkTo(text)}
												className='linkTo'>
												<ListItemText
													primary={text}
												/>
											</Link>
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
									color: '#fff',
									position: 'absolute',
									bottom: '10px',
									right: '10px',
								}}
							/>
						</Link>
					)}
				</IconButton>
			</Drawer>
			<Fab
				aria-label='add'
				sx={[
					{
						'&:hover': {
							backgroundColor: '#2c362a',
							filter: 'brightness(1.5)',
						},
					},
					{
						position: 'fixed',
						right: '20px',
						bottom: '20px',
						backgroundColor: '#2c362a',
						color: '#fbfbfb',
					},
				]}>
				<AddIcon />
			</Fab>
		</div>
	);
}
