import Vue from "vue";
import {BootstrapVue} from "bootstrap-vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import {Form, HasError,} from 'vform';
import moment from 'moment'

Vue.prototype.moment = moment
Vue.use(BootstrapVue);
Vue.use(Antd);
Vue.component(HasError.name, HasError);
window.Form = Form;

/*============================================
// npm install --save vue-scrollto
============================================= */
const VueScrollTo = require('vue-scrollto')
Vue.use(VueScrollTo,{duration: 2500})

import {Swiper as SwiperClass, Pagination, Navigation} from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import 'swiper/swiper-bundle.css'

SwiperClass.use([Pagination, Navigation])
Vue.use(getAwesomeSwiper(SwiperClass))
