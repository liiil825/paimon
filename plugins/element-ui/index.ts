import Vue from 'vue';
import Element from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import './index.sass'

// set langueage
locale.use(lang);

Vue.use(Element, { locale });