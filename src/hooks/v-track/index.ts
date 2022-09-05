interface _value {
    count: number,//被点击的次数
    time: number,//用户停留的时长
    times: number,//用户浏览的次数
    eventArr: unknown[],//被点击的元素
}
interface _binding {
    value: _value
    arg: string
    modifiers: Record<string, boolean>
}
let begTime = 0
export default {
    mounted(el: HTMLElement, binding: _binding) {
        const { value } = binding
        begTime = Date.now()//本次浏览的开始时间
        const localTimes = localStorage.getItem("track-times")
        value.times = 1 + (localTimes ? Number(localTimes) : 0)
        localStorage.setItem("track-times", value.times.toString())
        el.addEventListener("click", (event: Event) => {
            value.count || (value.count = 0)
            value.count++
            Array.isArray(value.eventArr) || (value.eventArr = [])
            value.eventArr?.push((event.target as HTMLElement).innerText)
        })
    },
    beforeUnmount(el: HTMLElement, binding: _binding) {
        const { value } = binding
        value.time = Date.now() - begTime
        console.log(value)
    }
}