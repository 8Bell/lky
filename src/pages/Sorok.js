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

function Sorok({ isLoggedIn, setIsLoggedIn, isDeleteMod, setIsDeleteMod }) {
	const [open, setOpen] = useState(false);
	console.log('현재 유저', authService.currentUser);

	const [soroks, setSoroks] = useState([]);
	const [noPic, setNoPic] = useState(false);

	useEffect(() => {
		dbService
			.collection('Sorok')
			.orderBy('createdAt', 'desc')
			.onSnapshot((snapshot) => {
				const Pics = snapshot.docs.map((pic) => ({
					...pic.data(),
					id: pic.uuid,
				}));
				console.log(Pics);
				setSoroks(Pics);
				Pics.length !== 0 ? setNoPic(false) : setNoPic(true);
			});

		console.log('nopic', noPic, soroks.length);
	}, []);

	const handleDelete = (title, uuid) => {
		window.confirm(`[${title}] 사진을 삭제하시겠습니까?`) &&
			dbService
				.collection('Sorok')
				.doc(`${title} : ${uuid}`)
				.delete()
				.then(() => {
					storageService.ref().child(`Sorok/${title} : ${uuid}`).delete();
					alert(`사진이 삭제되었습니다.`);
				})
				.catch((error) => {
					console.log(error);
					alert(`[${title}] 사진을 삭제하는 도중 오류가 발생했습니다.`);
				});
	};

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
							<Grid xs={12} color='#888' sx={{ mt: 3, mb: 3 }}>
								<Typography sx={{ mb: 1, fontFamily: 'LatoR' }}>
									Sorok
								</Typography>
								<Typography sx={{ fontFamily: 'Lato' }}>
									소록 [小綠:小録]
								</Typography>
								<Typography sx={{ fontFamily: 'Lato' }}>
									작은 숲과 작은 기록
								</Typography>
							</Grid>
							{soroks.map((pic, idx) => (
								<Grid xs={12} md={6} lg={3} key={idx}>
									<Fade>
										<Paper
											variant='outlined'
											style={{
												//height: '500px',
												//width: '400px',
												backgroundColor: '#fbfbfb',
												margin: '3px',
												borderRadius: 0,
												border: 'none',
												display: 'grid',
												gridAutoFlow: 'column',
												gridTemplateColumns: '1fr',
												overflow: 'hidden',
											}}>
											<div
												style={{
													position: 'relative',
													display: 'block',
													maxWidth: '100%',
													margin: 'auto',
												}}>
												{isDeleteMod && (
													<Fab
														aria-label='delete'
														size='small'
														onClick={() =>
															handleDelete(
																pic.title,
																pic.uuid
															)
														}
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
																position: 'absolute',

																width: 21,
																height: 21,
																minHeight: 0,
																right: 10,
																//marginLeft: 1,
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
												<img
													alt={pic.title}
													src={pic.fileUrl}
													//width='auto'
													height='auto'
													style={{
														position: 'relative',
														display: 'block',
														maxWidth: '100%',
														margin: 'auto',

														//maxHeight: '500px',
													}}
												/>
											</div>
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
					noPic={noPic}
				/>
			</Box>
			{isLoggedIn && (
				<AddBtn
					isDeleteMod={isDeleteMod}
					setIsDeleteMod={setIsDeleteMod}
					noPic={noPic}
				/>
			)}
		</div>
	);
}

export default Sorok;
