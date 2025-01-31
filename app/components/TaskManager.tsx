'use client'; // 声明这是一个客户端组件

import { useState } from 'react';

// 定义任务类型接口
interface Task {
  id: number;      // 任务唯一标识
  text: string;    // 任务内容
  completed: boolean; // 任务完成状态
}

export default function TaskManager() {
  // 使用 useState 钩子管理任务列表状态
  const [tasks, setTasks] = useState<Task[]>([]);
  // 使用 useState 钩子管理输入框的值
  const [inputValue, setInputValue] = useState('');

  // 添加任务的函数
  const addTask = () => {
    // 检查输入值是否为空（去除首尾空格后）
    if (inputValue.trim()) {
      // 创建新任务对象
      const newTask = {
        id: Date.now(), // 使用时间戳作为唯一ID
        text: inputValue.trim(),
        completed: false
      };
      // 更新任务列表，将新任务添加到现有任务数组中
      setTasks([...tasks, newTask]);
      // 清空输入框
      setInputValue('');
    }
  };

  // 切换任务完成状态的函数
  const toggleTask = (taskId: number) => {
    // 使用 map 方法遍历任务数组，找到对应ID的任务并切换其完成状态
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // 删除任务的函数
  const deleteTask = (taskId: number) => {
    // 使用 filter 方法过滤掉要删除的任务
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // 处理键盘按键事件的函数
  const handleKeyPress = (e: React.KeyboardEvent) => {
    // 当按下回车键时添加任务
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // 组件的渲染部分
  return (
    <div className="container max-w-[800px] mt-[50px] mx-auto p-4">
      {/* 标题 */}
      <h1 className="text-center mb-4 text-2xl font-bold">任务管理界面</h1>
      
      {/* 输入区域 */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // 输入框值变化时更新状态
          onKeyPress={handleKeyPress} // 处理按键事件
          className="flex-1 p-2 border rounded"
          placeholder="输入新任务..."
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          添加任务
        </button>
      </div>

      {/* 任务列表区域 */}
      <div className="border rounded shadow-sm">
        <div className="bg-gray-100 p-3 border-b">
          当前任务列表
        </div>
        <ul className="divide-y">
          {/* 使用 map 方法渲染任务列表 */}
          {tasks.map(task => (
            <li
              key={task.id}
              className="p-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
              onClick={() => toggleTask(task.id)} // 点击切换任务状态
            >
              {/* 任务文本，完成时添加删除线样式 */}
              <span className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.text}
              </span>
              {/* 删除按钮 */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 阻止事件冒泡，防止触发任务切换
                  deleteTask(task.id);
                }}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 统计信息 */}
      <div className="mt-3 text-gray-600">
        总任务数: {tasks.length} | 已完成: {tasks.filter(t => t.completed).length}
      </div>
    </div>
  );
} 