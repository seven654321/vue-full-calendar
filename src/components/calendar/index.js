import calen from './calendar.vue';
import Vue from 'vue';
function $broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        var name = child.$options.componentName;

        if (name == componentName) {


            child.$emit.call(child, eventName, params);

        } else {
            $broadcast.call(child, componentName, eventName, params);
        }
    });
}
function $dispatch(componentName, eventName, params) {
    var parent = this.$parent || this.$root;
    var name = parent.$options.componentName;

    while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
            name = parent.$options.componentName;
        }
    }
    if (parent) {
        parent.$emit.call(parent, eventName, params);
    }
}
Vue.prototype.$dispatch=$dispatch;
Vue.prototype.$broadcast=$broadcast;

export default {
    install: function (Vue) {
        Vue.component('classCalen', calen);
    },
};
