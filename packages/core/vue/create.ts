import { render, createVNode } from "vue";
import { hanavContext } from "../index";
import TestVue from "@hanav/components/test/Test.vue";


export const create = (name: string, container: string) => {
    const comp =  hanavContext.getComponent('TestVue')
    if (comp) createVNode(comp)
    render(createVNode(TestVue), document.querySelector('#create')!, false)
}

const config = {
    type: 'layout',
    top: {

    },
    onRendered: () => {},
    onResize: () => {}
}