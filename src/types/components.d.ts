declare module "@vue/runtime-core" {
  // 全局组件需通过 GlobalComponents 接口定义(Volar文档中说明)
  export interface GlobalComponents {
    // 全局组件名: 组件类型;
    // vue-router 的两个全局组件，添加类型声明
    RouterLink: typeof import("vue-router")["RouterLink"];
    RouterView: typeof import("vue-router")["RouterView"];
    // 自己的全局组件注册类型声明, typeof 表示基于获取组件的TS类型
    XtxButton: typeof Button;
    XtxSkeleton: typeof Skeleton;
  }
}
export {};
