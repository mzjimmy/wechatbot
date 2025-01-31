import TaskManager from './components/TaskManager';

// 主页面组件
export default function Home() {
  return (
    // 创建一个最小高度为屏幕高度的容器，支持深色模式
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* 引入任务管理组件 */}
      <TaskManager />
    </div>
  );
}
