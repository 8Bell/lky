import React, { useEffect, useState } from 'react';
import { IconButton, Toolbar, Typography } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';

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

export default function NavBar({ open, setOpen }) {
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
				backgroundColor: '#fbfbfb',
				color: '#333',
				boxShadow: navShadow ? ' 0 3px 5px 5px rgba(100,100,100,0.3)' : 'none',

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
	);
}
