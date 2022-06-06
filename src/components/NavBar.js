import React, { useEffect, useState } from 'react';
import { IconButton, Toolbar, Typography } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';

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

export default function NavBar({ open, setOpen, isLoggedIn }) {
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

	const [navShadow, setNavShadow] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	return (
		<AppBar
			position='fixed'
			open={open}
			style={{
				backgroundColor: 'rgba(251,251,251,0.3)',
				backdropFilter: 'blur(7px)',
				WebkitBackdropFilter: 'blur(7px)',
				boxShadow: navShadow ? ' 0 2px 2px 2px rgba(100,100,100,0.2)' : 'none',
				transitionProperty: 'all',
				transitionDuration: '0.2s',
			}}>
			<Toolbar>
				{isLoggedIn && (
					<SettingsIcon
						sx={{
							color: '#2c362a',
							marginRight: '10px',
						}}
					/>
				)}
				<Typography
					variant='h6'
					noWrap
					sx={{
						flexGrow: 2,
						fontFamily: 'JejuMyeongjo',
						fontWeight: 'bold',
						color: '#2c362a',
					}}
					component='div'
					align='left'>
					Leegyuyeon
				</Typography>

				<IconButton
					aria-label='open drawer'
					edge='end'
					onClick={handleDrawerOpen}
					sx={{ ...(open && { display: 'none' }) }}>
					<MenuRoundedIcon
						sx={{ width: '30px', height: 'auto', color: '#888' }}
					/>
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
