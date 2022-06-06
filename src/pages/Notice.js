import { Button, Divider, Fab, Grid, Typography } from '@mui/material';
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
import { authService, dbService, storageService } from '../fbase';
import AddBtn from '../components/AddBtn';
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
	const [digitalMain, setDigitalMain] = useState([]);
	const [analogMain, setAnalogMain] = useState([]);

	const [digitalOpen, setDigitalOpen] = useState(false);
	const [analogOpen, setAnalogOpen] = useState(false);

	useEffect(() => {
		dbService
			.collection('Portrait')
			//.where('processing', '==', 'Digital')
			.orderBy('createdAt', 'desc')
			.onSnapshot((snapshot) => {
				const Pics = snapshot.docs.filter(
					(pic) => pic.data().processing === 'Digital'
				);
				console.log(Pics);
				setDigital(Pics);
			});
		dbService
			.collection('Portrait')
			//.where('processing', '==', 'Analog')
			.orderBy('createdAt', 'desc')
			.onSnapshot((snapshot) => {
				const Pics = snapshot.docs.filter(
					(pic) => pic.data().processing === 'Analog'
				);
				console.log(Pics);
				setAnalog(Pics);
			});

		dbService.collection('Digital:notice').onSnapshot((snapshot) => {
			const Pics = snapshot.docs;
			console.log(Pics);
			setDigitalMain(Pics);
		});

		dbService.collection('Analog:notice').onSnapshot((snapshot) => {
			const Pics = snapshot.docs;
			console.log(Pics);
			setAnalogMain(Pics);
		});
	}, []);

	const handleDelete = (title, uuid) => {
		window.confirm(`[${title}] 사진을 삭제하시겠습니까?`) &&
			dbService
				.collection('Portrait')
				.doc(`${title} : ${uuid}`)
				.delete()
				.then(() => {
					storageService.ref().child(`Portrait/${title} : ${uuid}`).delete();
					// alert(`사진이 삭제되었습니다.`);
				})
				.catch((error) => {
					console.log(error);
					alert(`[${title}] 사진을 삭제하는 도중 오류가 발생했습니다.`);
				});
	};

	const handleAnalogOpen = () => {
		setAnalogOpen(!analogOpen);
		console.log(analogOpen, 'analogOpen');
	};

	const handleDigitalOpen = () => {
		setDigitalOpen(!digitalOpen);
		console.log(digitalOpen, 'digitalOpen');
	};

	return (
		<div className='App'>
			{/* <div id='page-loading-blocs-notifaction' class='page-preloader' /> */}

			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<NavBar open={open} setOpen={setOpen} isLoggedIn={isLoggedIn} />

				<Main open={open}>
					<DrawerHeader />
					<Container maxWidth={false} style={{ padding: (0, 15, 0, 15) }}>
						<Grid container>
							<Grid xs={12} md={12} lg={12}>
								<Fade>
									<Typography
										sx={{
											fontSize: '22px',
											fontFamily: 'LatoR',
											fontWeight: 'bold',
											color: '#777',
											mt: 3,
										}}>
										Option
									</Typography>
								</Fade>
							</Grid>
							<Grid xs={12} md={12} lg={12} sx={{ mt: 5, mb: 5 }}>
								<Divider />
							</Grid>

							<Grid xs={12} md={6} lg={6}>
								<Fade>
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
										{isDeleteMod && (
											<Fab
												aria-label='delete'
												size='small'
												onClick={() =>
													handleDelete(
														digital[0].data()
															.title,
														digital[0].data()
															.uuid
													)
												}
												sx={[
													{
														'&:hover': {
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
										{digital.length !== 0 && (
											<img
												src={
													digitalMain[0].data()
														.fileUrl
												}
												alt={
													digitalMain[0].data()
														.title
												}
												style={{
													width: '100%',
													transform:
														'translateY(-20%)',
												}}
											/>
										)}
									</div>
								</Fade>
							</Grid>
							<Grid
								xs={12}
								md={6}
								lg={6}
								sx={{ pl: '5%', pr: '5%', pt: '10%' }}>
								<Fade>
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
										디지털 촬영은 장수와 상관 없이 2시간
										이내로 진행됩니다.
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
										onClick={handleDigitalOpen}
										sx={[
											{
												mb: 10,
												mt: 5,
												backgroundColor: '#eee',
												color: '#888',
												borderRadius: '20px',
											},
											{
												'&:hover': {
													backgroundColor:
														'#eee',
													filter: 'brightness(0.98)',
												},
											},
										]}>
										More info
									</Button>
								</Fade>
							</Grid>

							<Grid
								container
								sx={{
									display: digitalOpen ? 'default' : 'none',
								}}>
								<Grid xs={12} md={12} lg={12}>
									<Fade>
										<Typography
											sx={{
												fontSize: '22px',
												fontFamily: 'LatoR',
												fontWeight: 'bold',
												color: '#777',
												mt: 3,
												mb: 5,
											}}>
											Digital Example
										</Typography>
									</Fade>
								</Grid>
								{digital.map(
									(pic, idx) =>
										idx > 0 &&
										idx <= 4 && (
											<Grid
												xs={6}
												md={3}
												lg={3}
												key={idx}>
												<Fade>
													<Paper
														variant='outlined'
														style={{
															//height: '500px',
															//width: '400px',
															backgroundColor:
																'#fbfbfb',
															margin: '3px',
															borderRadius: 0,
															border: 'none',
															display: 'grid',
															gridAutoFlow:
																'column',
															gridTemplateColumns:
																'1fr',
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
																			pic.data()
																				.title,
																			pic.data()
																				.uuid
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
																alt={
																	pic.data()
																		.title
																}
																src={
																	pic.data()
																		.fileUrl
																}
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
										)
								)}
							</Grid>
							<Grid xs={12} md={12} lg={12} sx={{ mt: 5, mb: 5 }}>
								<Divider />
							</Grid>
							<Grid xs={12} md={6} lg={6}>
								<Fade>
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
										{isDeleteMod && (
											<Fab
												aria-label='delete'
												size='small'
												onClick={() =>
													handleDelete(
														analog[0].data()
															.title,
														analog[0].data()
															.uuid
													)
												}
												sx={[
													{
														'&:hover': {
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
										{analog.length !== 0 && (
											<img
												src={
													analogMain[0].data()
														.fileUrl
												}
												alt={
													analogMain[0].data()
														.title
												}
												style={{
													width: '100%',
													transform:
														'translateY(-20%)',
												}}
											/>
										)}
									</div>
								</Fade>
							</Grid>

							<Grid
								xs={12}
								md={6}
								lg={6}
								sx={{ pl: '5%', pr: '5%', pt: '10%' }}>
								<Fade>
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
										필름 가격과 현상 비용이 포함된
										가격입니다.
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
										보정본 10장을 제공해드리며, 원본은
										드리지 않습니다.
									</Typography>
									<Button
										variant='contained'
										fullWidth
										onClick={handleAnalogOpen}
										sx={[
											{
												mb: 10,
												mt: 5,
												backgroundColor: '#eee',
												color: '#888',
												borderRadius: '20px',
											},
											{
												'&:hover': {
													backgroundColor:
														'#eee',
													filter: 'brightness(0.98)',
												},
											},
										]}>
										More info
									</Button>
								</Fade>
							</Grid>

							<Grid
								container
								sx={{
									display: analogOpen ? 'default' : 'none',
								}}>
								<Grid xs={12} md={12} lg={12}>
									<Fade>
										<Typography
											sx={{
												fontSize: '22px',
												fontFamily: 'LatoR',
												fontWeight: 'bold',
												color: '#777',
												mt: 3,
												mb: 5,
											}}>
											Analog Example
										</Typography>
									</Fade>
								</Grid>
								{analog.map(
									(pic, idx) =>
										idx > 0 &&
										idx <= 4 && (
											<Grid
												xs={6}
												md={3}
												lg={3}
												key={idx}>
												<Fade>
													<Paper
														variant='outlined'
														style={{
															//height: '500px',
															//width: '400px',
															backgroundColor:
																'#fbfbfb',
															margin: '3px',
															borderRadius: 0,
															border: 'none',
															display: 'grid',
															gridAutoFlow:
																'column',
															gridTemplateColumns:
																'1fr',
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
																			pic.data()
																				.title,
																			pic.data()
																				.uuid
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
																alt={
																	pic.data()
																		.title
																}
																src={
																	pic.data()
																		.fileUrl
																}
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
										)
								)}
							</Grid>
							<Grid xs={12} md={12} lg={12} sx={{ mt: 5, mb: 5 }}>
								<Divider />
							</Grid>
							<Grid container>
								<Grid xs={12} md={12} lg={12}>
									<Fade>
										<Typography
											sx={{
												fontSize: '22px',
												fontFamily: 'LatoR',
												fontWeight: 'bold',
												color: '#777',
												mt: 3,
											}}>
											Notice
										</Typography>
									</Fade>
								</Grid>
								<Grid xs={12} md={12} lg={12} sx={{ mt: 5, mb: 5 }}>
									<Divider />
								</Grid>
								<Grid
									xs={12}
									md={6}
									lg={6}
									sx={{
										pl: '5%',
										pr: '5%',
										pt: '5%',
										pb: '5%',
									}}>
									<Fade>
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
											Photograph
										</Typography>

										<Typography
											sx={{
												fontSize: '15px',
												fontFamily: 'LatoR',

												color: '#777',
												mt: 1,
												mb: 1,
												textAlign: 'left',
												lineHeight: 2,
											}}>
											사진은 개인 소장, 배우 프로필,
											아티스트 프로필, 앨범 커버 등으로
											사용 가능합니다.
											<br />
											상업적 용도로 사용하시는 경우 미리
											말씀해 주시기 바랍니다.
											<br />
											(상업촬영의 경우 장당으로 금액이
											책정됩니다. *)
											<br />
											실내 촬영은 개인 작업실 [소록]에서
											진행됩니다.
											<br />
											작가와 협의 후 외부 스튜디오
											촬영도 가능합니다.
											<br />
											헤어 & 메이크업은 제공해드리지
											않습니다.
											<br />
											얼굴을 과도하게 변형시키는 보정은
											하지 않고 있습니다.
										</Typography>
									</Fade>
								</Grid>

								<Grid
									xs={12}
									md={6}
									lg={6}
									sx={{
										pl: '5%',
										pr: '5%',
										pt: '5%',
										pb: '5%',
									}}>
									<Fade>
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
											Booking & Refund
										</Typography>

										<Typography
											sx={{
												fontSize: '15px',
												fontFamily: 'LatoR',

												color: '#777',
												mt: 1,
												mb: 1,
												textAlign: 'left',
												lineHeight: 2,
											}}>
											촬영 날짜는 예약금(30,000 원) 입금
											확인 후 예약이 확정됩니다.
											<br />
											예약금은 환불이 불가능하므로
											신중하게 결정 후 입금
											부탁드립니다.
											<br />
											예약 날짜 변경은 최초 결정된
											촬영일로부터 ±30일 범위 내에서 1회
											가능합니다.
											<br />
											(폭우 등 자연재해로 인한 변경은
											횟수에 포함되지 않습니다. )
										</Typography>
									</Fade>
								</Grid>
							</Grid>
							<Grid xs={12} md={12} lg={12} sx={{ mt: 5, mb: 5 }}>
								<Divider />
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
			{isLoggedIn && (
				<AddBtn isDeleteMod={isDeleteMod} setIsDeleteMod={setIsDeleteMod} />
			)}
		</div>
	);
}

export default Notice;
