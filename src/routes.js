import MainPanel from './components/MainPanel';
import PublishClassPanel from './components/PublishClassPanel';
import TeacherClassPanel from './components/TeacherClassPanel';
import MarkPanel from './components/MarkPanel';
import OnlineCoursePanel from './components/OnlineCoursePanel';
import ExistedCoursePanel from './components/ExistedCoursePanel';
import LoginPanel from './components/LoginPanel';
import registerPanelForStudent from './components/registerPanelForStudent';
import registerPanelForTeacher from './components/registerPanelForTeacher';


const routes = [
	{
		path: '/',
		component: MainPanel,
		children: [
			{
				path: '/publish',
				component: PublishClassPanel,
				meta: {
					requireAuth: true,
				}
			},
			{
				path: '/teacherClass',
				component: TeacherClassPanel,
				meta: {
					requireAuth: true,
				}
			},
			{
				path: '/mark',
				component: MarkPanel,
				meta: {
					requireAuth: true,
				}
			},
			{
				path: '/course',
				component: OnlineCoursePanel,
				meta: {
					requireAuth: true,
				}
			},
			{
				path: '/mycourse',
				component: ExistedCoursePanel,
				meta: {
					requireAuth: true,
				}
			},
			{
				path: '/login',
				component: LoginPanel,
			},
			{
				path: '/register/student',
				component: registerPanelForStudent,
			},
			{
				path: '/register/teacher',
				component: registerPanelForTeacher,
			},
			{
				path: '/register',
				component: registerPanelForStudent,
			},
		]
	},
]

export default routes;
