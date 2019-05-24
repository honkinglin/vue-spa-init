import Vue from 'vue';
import App from './App';

window.$vm = new Vue({
    render: h => h(App)
}).$mount('#root');
