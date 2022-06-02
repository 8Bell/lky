import { useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import SideMenu from './components/SIdeMenu';
import { authService } from './fbase';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Landscape from './pages/Landscape';
import Sorok from './pages/Sorok';

const Layout = ({ isLoggedIn, setIsLoggedIn }) => {
	return (
		<div>
			<Outlet />
		</div>
	);
};

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			console.log(user);
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});
	}, []);

	return (
		<Routes>
			<Route
				path='/'
				element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
				<Route
					index
					element={
						<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
					}
				/>
				<Route
					path='/landscape'
					element={
						<Landscape
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn}
						/>
					}
				/>
				<Route
					path='/sorok'
					element={
						<Sorok isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
					}
				/>
			</Route>

			<Route path='/auth' element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
		</Routes>
	);
};

export default App;
