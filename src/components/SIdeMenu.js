import {
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';
import { Fade } from 'react-awesome-reveal';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 0),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export default function SideMenu({ open, setOpen }) {
	const drawerWidth = 250;

	const theme = useTheme();

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
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
				<IconButton onClick={handleDrawerClose} style={{ color: '#fbfbfb' }}>
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
										<ListItemText primary={text} />
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
	);
}
