import {
	Backdrop,
	Checkbox,
	Chip,
	CircularProgress,
	createTheme,
	Divider,
	FormControl,
	FormControlLabel,
	Grow,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	ThemeProvider,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SdStorageRoundedIcon from '@mui/icons-material/SdStorageRounded';
import CameraRollRoundedIcon from '@mui/icons-material/CameraRollRounded';
import NoPhotographyRoundedIcon from '@mui/icons-material/NoPhotographyRounded';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { dbService, storageService } from '../fbase';
import { v4 as uuidv4 } from 'uuid';
import { Fade } from 'react-awesome-reveal';
import './AddBtn.css';

const Input = styled('input')({
	display: 'none',
});

const theme = createTheme({
	palette: {
		primary: {
			main: '#2c362a',
		},
		secondary: {
			main: '#fbfbfb',
		},
	},
});

export default function AddBtn({ isDeleteMod, setIsDeleteMod, noPic }) {
	const [open, setOpen] = useState(false);
	const [openUploadDialog, setOpenUploadDialog] = useState(false);
	const [file, setFile] = useState('');
	const [tag, setTag] = useState('');
	const [processing, setProcessing] = useState('');
	const [title, setTitle] = useState('');
	const [uuid, setUuid] = useState('');
	const [backdrop, setBackdrop] = useState(false);
	const [selected, setSelected] = useState(false);
	const [notice, setNotice] = useState(false);

	useEffect(() => {
		!noPic && setIsDeleteMod(false);
	}, [noPic, setIsDeleteMod]);

	const handleClickOpen = (name) => {
		switch (name) {
			case '사진 업로드':
				setOpenUploadDialog(true);
				setUuid(uuidv4());
				break;
			case '사진 삭제':
				!noPic && setIsDeleteMod((prev) => !prev);
				break;
			// case '사진 수정':
			// 	break;
			default:
				break;
		}
		console.log(name, isDeleteMod);
	};
	const handleClickClose = () => {
		setOpenUploadDialog(false);
		setFile('');
		setTag('');
		setProcessing('');
		setTitle('');
		setNotice(false);
		setSelected(false);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleTagChange = (event) => {
		setTag(event.target.value);
		setNotice(false);
	};

	const handleOpen = () => setOpen(true);

	//photo upload

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const onFileChange = (e) => {
		const {
			target: { files },
		} = e;
		const theFile = files[0];
		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			const {
				currentTarget: { result },
			} = finishedEvent;
			setFile(result);
		};
		reader.readAsDataURL(theFile);
		setSelected(true);
	};

	const photoUpload = async (e) => {
		e.preventDefault();
		if (tag !== '' && title !== '' && file !== '' && processing !== '') {
			setBackdrop(true);
			const fileRef = storageService.ref().child(`${tag}/${title} : ${uuid}`);
			const response = await fileRef.putString(file, 'data_url');
			const fileUrl = await response.ref.getDownloadURL();
			const photo = {
				title,
				tag,
				createdAt: Date.now(),
				fileUrl,
				uuid,
				processing,
			};

			await dbService
				.collection(tag)
				.doc(`${title} : ${uuid}`)
				.set(photo)
				.then(() => {
					if (notice === true) {
						dbService
							.collection(`${processing}:notice`)
							.doc('notice')
							.set(photo);
					}
					setBackdrop(false);
				});

			handleClickClose();
			setUuid('');
		} else if (file === '') {
			alert('사진을 첨부해주세요.');
		} else if (title === '') {
			alert('사진의 제목을 입력해주세요.');
		} else if (tag === '') {
			alert('카테고리를 선택해주세요.');
		} else if (processing === '') {
			alert('디지털/아날로그 구분을 선택해주세요.');
		}
	};

	const choiceDigital = (e) => {
		setProcessing('Digital');
	};
	const choiceAnalog = (e) => {
		setProcessing('Analog');
	};

	const handleNotice = () => {
		setNotice(!notice);
	};
	console.log(notice);

	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					height: 320,
					transform: 'translateZ(0px)',
					flexGrow: 1,
					position: 'fixed',
					right: '20px',
					bottom: '20px',
				}}>
				<SpeedDial
					ariaLabel='SpeedDial'
					sx={{
						position: 'absolute',
						bottom: 0,
						right: 0,
					}}
					icon={<SpeedDialIcon sx={{ padding: 0, margin: 0 }} />}
					onClose={handleClose}
					onOpen={handleOpen}
					open={open}>
					<SpeedDialAction
						key='사진 업로드'
						icon={
							<label htmlFor='icon-button-file'>
								<Input
									accept='image/*'
									id='icon-button-file'
									type='file'
									onChange={onFileChange}
								/>
								<IconButton
									color='primary'
									aria-label='upload picture'
									component='span'>
									<AddAPhotoIcon />
								</IconButton>
							</label>
						}
						tooltipTitle='사진 업로드'
						onClick={() => handleClickOpen('사진 업로드')}
						sx={{
							color: '#2c362a',
						}}
					/>

					<SpeedDialAction
						key='사진 삭제'
						icon={<NoPhotographyRoundedIcon />}
						tooltipTitle='사진 삭제'
						onClick={() => handleClickOpen('사진 삭제')}
						sx={{
							color: '#2c362a',
							filter: `${
								isDeleteMod
									? 'drop-shadow(0px 0px 10px black) invert(100%) contrast(30%) grayscale(100%) '
									: 'brightness(2)'
							}`,
						}}
					/>
				</SpeedDial>
			</Box>
			<Grow in={selected}>
				<Dialog
					open={openUploadDialog}
					onClose={handleClickClose}
					className='Dialog'
					fullScreen={window.innerWidth <= '768'}>
					<DialogTitle
						sx={{
							fontWeight: 700,
							fontSize: '22px',
							color: 'primary',
						}}>
						사진 업로드
					</DialogTitle>
					{file !== '' && (
						<div>
							<Divider />
							<img
								alt='사진'
								src={file}
								width='90%'
								maxHeight='500px'
								style={{
									display: 'table',
									margin: '20px auto',
									borderRadius: '10px',
								}}
							/>
							<Divider />
						</div>
					)}
					<DialogContent sx={{ minHeight: '205px' }}>
						<TextField
							id='name'
							label='사진의 제목을 입력해주세요.'
							type='text'
							fullWidth
							variant='outlined'
							size='small'
							onChange={handleTitleChange}
							value={title}
							sx={[
								{
									'& label.Mui-focused': {
										color: '#2c362a',
									},
									'& .MuiInput-underline:after': {
										borderBottomColor: '#2c362a',
									},
									'& .MuiOutlinedInput-root': {
										'&.Mui-focused fieldset': {
											borderColor: '#2c362a',
										},
									},
								},
								{ marginTop: '5px' },
							]}
						/>

						<FormControl
							fullWidth
							size='small'
							sx={[
								{
									'& label.Mui-focused': {
										color: '#2c362a',
									},
									'& .MuiInput-underline:after': {
										borderBottomColor: '#2c362a',
									},
									'& .MuiOutlinedInput-root': {
										'&.Mui-focused fieldset': {
											borderColor: '#2c362a',
										},
									},
								},
								{ marginTop: '20px' },
							]}>
							<InputLabel id='tag'>카테고리를 선택하세요.</InputLabel>
							<Select
								labelId='tag'
								id='tag'
								value={tag}
								label='카테고리를 선택하세요.'
								onChange={handleTagChange}>
								<MenuItem value='Portrait'>Portrait</MenuItem>
								<MenuItem value='Landscape'>Landscape</MenuItem>
								<MenuItem value='Sorok'>Sorok</MenuItem>
								{/* <MenuItem value='Notice'>Notice</MenuItem> */}
							</Select>
						</FormControl>

						<Stack direction='row' spacing={1} sx={{ mt: 3 }}>
							<Chip
								icon={<SdStorageRoundedIcon />}
								label='Digital'
								color={
									processing === 'Digital'
										? 'primary'
										: 'default'
								}
								variant={
									processing === 'Digital'
										? 'filled'
										: 'outlined'
								}
								onClick={choiceDigital}
							/>
							<Chip
								icon={<CameraRollRoundedIcon />}
								label='Analog'
								color={
									processing === 'Analog'
										? 'primary'
										: 'default'
								}
								variant={
									processing === 'Analog'
										? 'filled'
										: 'outlined'
								}
								onClick={choiceAnalog}
							/>
							<Fade>
								<FormControlLabel
									sx={{
										transform: 'translate(20%,1px)',
										color: '#555',
										//backgroundColor: '#2c362a',
										border: 'solid 1px #aaa',
										paddingLeft: 2,
										lineHeight: 0,
										height: 31,
										borderRadius: 30,
										fontFamily: 'Lato',
										fontSize: '8px',
										display:
											tag === 'Portrait'
												? 'default'
												: 'none',
									}}
									control={
										<Checkbox
											checked={notice}
											onClick={handleNotice}
											icon={<BookmarkBorderIcon />}
											checkedIcon={<BookmarkIcon />}
										/>
									}
									label='Notice'
									labelPlacement='start'
								/>
							</Fade>
						</Stack>
					</DialogContent>
					<Divider />
					<DialogActions sx={{ mt: 2, mb: 3, mr: 2 }}>
						<Button
							onClick={handleClickClose}
							variant='outlined'
							color='primary'>
							취소
						</Button>
						<Button
							onClick={photoUpload}
							variant='contained'
							color='primary'>
							업로드
						</Button>
					</DialogActions>
				</Dialog>
			</Grow>
			<Backdrop
				sx={{ color: '#fff', zIndex: 9999 }}
				open={backdrop}
				// onClick={handleClose}
			>
				<CircularProgress color='inherit' />
			</Backdrop>
		</ThemeProvider>
	);
}
