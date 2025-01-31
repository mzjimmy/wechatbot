'use client';

import { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim()) {
      const newTask = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="container max-w-[800px] mt-[50px] mx-auto p-4">
      <h1 className="text-center mb-4 text-2xl font-bold">任务管理界面</h1>
      
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
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

      <div className="border rounded shadow-sm">
        <div className="bg-gray-100 p-3 border-b">
          当前任务列表
        </div>
        <ul className="divide-y">
          {tasks.map(task => (
            <li
              key={task.id}
              className="p-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
              onClick={() => toggleTask(task.id)}
            >
              <span className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.text}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
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

      <div className="mt-3 text-gray-600">
        总任务数: {tasks.length} | 已完成: {tasks.filter(t => t.completed).length}
      </div>
    </div>
  );
} 