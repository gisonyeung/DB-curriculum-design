import Userbar from './components/Userbar';
const Menubar = { template: '<div>Menubar</div>' };
const Main = { template: '<div>Main</div>' };


const routes = [
	{
		path: '/',
		components: {
			userbar: Userbar,
			menubar: Menubar,
			main: Main,
		}
	},
]

export default routes;
