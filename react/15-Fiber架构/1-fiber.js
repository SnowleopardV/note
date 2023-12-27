/* 
React从16版本开始引入Fiber架构
一、Fiber内部属性 
*/
// 1. tag Fiber类型, 如FunctionComponent、ClassComponent、HostComponent (原生DOM元素)

// 2. type HostComponent类型的Fiber
//    对于原生DOM元素来说, type属性表示原生DOM的类型, 如div、span
//    对于函数组件或者类组件, 该属性通常指向构造函数或函数组件的引用

// 3. key 通常用于列表中作为唯一标识, 来优化列表的渲染和更新 (并非每一个fiber都有key属性)

// 4. stateNode 如果是类组件或者函数组件, stateNode指向组件的实例, 对于DOM元素而言, 该属性指向DOM元素

// 5. child 指向第一个子Fiber

// 6. sibling 指向同一层级下一个Fiber

// 7. return 指向父Fiber

// 8. props 一个对象, 包含传递给组件的所有属性

// 9. alternate 指向当前Fiber的交替版本, 用于重新渲染时保存旧的或待比较的Fiber

// 10. lanes 用于调度和优先级管理

// 11. effectTag 标记Fiber是否需要进行某种类型的副作用, 如插入、更新、删除、执行生命周期等

/*
二、在更新的过程中, 会维护两套Fiber树
*/
// 1. Current Fiber Tree
// 2. WorkInProgress Fiber Tree

/*
三、Fiber架构在React中实现了以下关键步骤
*/
// 1. 初始化渲染(initial Render)
//   React应用初始化的时候, 会递归的创建一个Fiber, 并将其链接为一个Fiber Tree

// 2. 更新调度(Update Schedule)
//   当重新渲染时, React将这个更新任务放到队列中, 根据更新的优先级和任务性质, React会选择立即更新还是延迟到某个时间再执行

// 3. WorkInProProgress Tree创建
//   生成一个新的Fiber树

// 4. 更新Reconciliation
//   React会遍历WorkInProgess Fiber tree, 比较每个节点和当前Fiber节点的差异, 觉得是否需要更新DOM节点

// 5. 副作用处理
//  在Reconciliation的过程中, React会记录所有需要进行副作用操作的Fiber节点, 如更新DOM、执行生命周期等. 这些标记在Fiber的EffectTag属性上

// 6. 提交Commit
//  当所有需要的更新和副作用操作都被记录下来之后, React会在下一个事务中批量执行这些操作, 这个阶段包括更新实际的DOM节点、调用生命周期方法等.
//  完成提交后, WorkINProgress Tree将变为当前的Fiber树

// 7. 垃圾回收
//  React需要清理不再使用的Fiber节点, 这个过程通常发生在组件卸载的场景中

/*
四、遍历规则
// 1. 先自己, 然后儿子, 再弟弟, 再叔叔
// 2. 自己所有子节点完成后, 自己完成
*/
