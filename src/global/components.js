import Vue from 'vue';

import Userbar from '../components/Userbar';
import TextInput from '../components/TextInput';
import ClassBox from '../components/ClassBox';
import TipRecord from '../components/TipRecord';

/* <user-header> 顶部菜单栏 */
Vue.component('user-header', Userbar);

/* <text-input> 文本输入框 */
Vue.component('text-input', TextInput);

/* <class-box> 课程盒子 */
Vue.component('class-box', ClassBox);

/* <tip-record> 提示item */
Vue.component('tip-record', TipRecord);



