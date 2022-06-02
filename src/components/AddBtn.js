import { Fab, FormControl, Grid, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import PhotoSizeSelectLargeIcon from '@mui/icons-material/PhotoSizeSelectLarge';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import NoPhotographyRoundedIcon from '@mui/icons-material/NoPhotographyRounded';
import './AddBtn.css';
import { BreakfastDiningOutlined } from '@mui/icons-material';
import { color } from '@mui/system';

const Input = styled('input')({
	display: 'none',
});

const actions = [
	{ icon: <AddAPhotoIcon />, name: '사진 업로드' },
	{ icon: <NoPhotographyRoundedIcon />, name: '사진 삭제' },
	{ icon: <PhotoSizeSelectLargeIcon />, name: '사진 수정' },
];

export default function AddBtn({ isDeleteMod, setIsDeleteMod }) {
	const [open, setOpen] = useState(false);
	const [openUploadDialog, setOpenUploadDialog] = useState(false);

	const handleClickOpen = (name) => {
		switch (name) {
			case '사진 업로드':
				setOpenUploadDialog(true);
				break;
			case '사진 삭제':
				setIsDeleteMod((prev) => !prev);
				break;
			case '사진 수정':
				break;
			default:
				break;
		}
		console.log(name, isDeleteMod);
	};
	const handleClickClose = () => {
		setOpenUploadDialog(false);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [tag, setTag] = React.useState('');

	const handleChange = (event) => {
		setTag(event.target.value);
	};

	const handleOpen = () => setOpen(true);

	return (
		<div>
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
					ariaLabel='SpeedDial controlled open example'
					sx={{
						position: 'absolute',
						bottom: 0,
						right: 0,
					}}
					icon={<SpeedDialIcon />}
					onClose={handleClose}
					onOpen={handleOpen}
					open={open}>
					{actions.map((action, index) => (
						<SpeedDialAction
							key={action.name}
							icon={action.icon}
							tooltipTitle={action.name}
							onClick={() => handleClickOpen(action.name)}
							sx={{
								color: '#2c362a',
								filter: `${
									isDeleteMod && index == 1
										? 'drop-shadow(0px 0px 10px black) invert(100%) contrast(30%) grayscale(100%) '
										: 'brightness(2)'
								}`,
							}}
						/>
					))}
				</SpeedDial>
			</Box>

			<Dialog open={openUploadDialog} onClose={handleClickClose} fullWidth>
				<DialogTitle>사진 업로드</DialogTitle>
				<DialogContent>
					<label htmlFor='contained-button-file'>
						<Input
							accept='image/*'
							id='contained-button-file'
							multiple
							type='file'
						/>
					</label>
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
							onChange={handleChange}>
							<MenuItem value='Portrait'>Portrait</MenuItem>
							<MenuItem value='Landscape'>Landscape</MenuItem>
							<MenuItem value='Sorok'>Sorok</MenuItem>
						</Select>
					</FormControl>
					<Grid container>
						<Grid item xs={10}>
							<TextField
								id='name'
								label='사진의 제목을 입력해주세요.'
								type='text'
								fullWidth
								variant='outlined'
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
								]}
							/>
						</Grid>
						<Grid item xs={2}>
							<label htmlFor='icon-button-file'>
								<Input
									accept='image/*'
									id='icon-button-file'
									type='file'
								/>
								<IconButton
									color='primary'
									aria-label='upload picture'
									component='span'
									style={{}}>
									<PhotoCamera
										sx={{
											fontSize: 35,
											marginTop: '15px',
											marginLeft: '5px',
											color: '#2c362a',
										}}
									/>
								</IconButton>
							</label>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClickClose} sx={{ color: '#2c362a' }}>
						취소
					</Button>
					<Button onClick={handleClickClose} sx={{ color: '#2c362a' }}>
						업로드
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
