import request from "@/api/request"
class Meta {
    id = Date.now()
    actions: unknown[] = []
}
interface _binding {
    value: unknown
    arg?: string
    modifier: Record<string, boolean>
    instance: Record<string, any>
}
// 要收集的数据
const localMeta = localStorage.getItem("$track__meta")
export let meta = localMeta ? JSON.parse(localMeta) as unknown as Meta : new Meta()
// 收集事件的方法
const track = (data = meta) => {
    meta.actions = meta.actions?.filter(item => item)
    request({ url: "/track", data })
    meta = new Meta()
}
setInterval(track, 10000)
// 浏览器关闭时缓存数据
window.addEventListener("unload", () => {
    localStorage.setItem("$track__meta", JSON.stringify(meta))
})
// 自定义指令
export default {
    // 组件挂载时
    mounted(el: HTMLElement, binding: _binding, vnode: any) {
        const { arg, value } = binding
        switch (arg) {
            case undefined:
                vnode.$track__item = {
                    beginTime: Date.now(),
                    mes: value,
                }
                vnode.$track__controller = new AbortController()
                const signal = vnode.$track__controller.signal
                window.addEventListener("unload", () => {
                    vnode.$track__item.endTime = Date.now()
                    meta.actions.push(vnode.$track__item)
                    localStorage.setItem("$track__meta", JSON.stringify(meta))
                }, { signal })
                break
            default:
                // 绑定点击事件
                el.addEventListener(arg, (event: Event) => {
                    const item = {
                        time: Date.now(),
                        mes: "",
                    }
                    item.mes = typeof value === "function" ? value(event) : value
                    meta.actions.push(item)
                })
        }
    },
    beforeUnmount(el: HTMLElement, binding: _binding, vnode: any) {
        const { arg } = binding
        switch (arg) {
            case undefined:
                console.log(0)
                vnode.$track__controller.abort()
                vnode.$track__item.endTime = Date.now()
                meta.actions.push(vnode.$track__item)
                break
            default:
        }
    },
}