import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import locale from 'element-plus/es/locale/lang/zh-cn'
import * as icons from "@element-plus/icons-vue"
import store from "@/plugins/store"
import router from "@/router/router"
import HelloWorld from "@/components/HelloWorld.vue"
interface App {
    use(plugin: unknown, option?: unknown): void
    component(name: string, component: unknown): void
}
export default {
    install(app: App) {
        app.use(ElementPlus, {
            locale,
        })
        Object.keys(icons).forEach((key) => {
            Reflect.has(icons, key) && app.component(key, icons[<keyof typeof icons>key])
        })
        app.use(store)
        app.use(router)
        app.component("HelloWorld", HelloWorld)
    }
}