import MainPanel from './components/MainPanel';
import PublishClassPanel from './components/PublishClassPanel';
import TeacherClassPanel from './components/TeacherClassPanel';
import MarkPanel from './components/MarkPanel';
import OnlineCoursePanel from './components/OnlineCoursePanel';
import ExistedCoursePanel from './components/ExistedCoursePanel';
import LoginPanel from './components/LoginPanel';
import registerPanel from './components/registerPanel';


const routes = [
	{
		path: '/',
		component: MainPanel,
		children: [
			{
				path: '/publish',
				component: PublishClassPanel,
			},
			{
				path: '/teacherClass',
				component: TeacherClassPanel,
			},
			{
				path: '/mark',
				component: MarkPanel,
			},
			{
				path: '/course',
				component: OnlineCoursePanel,
			},
			{
				path: '/mycourse',
				component: ExistedCoursePanel,
			},
			{
				path: '/login',
				component: LoginPanel,
			},
			{
				path: '/register',
				component: registerPanel,
			},

		]
	},
]

export default routes;
