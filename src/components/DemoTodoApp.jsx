import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMoon, FiSun, FiCheck, FiTrash2, FiX } from 'react-icons/fi'

export default function DemoTodoApp() {
  // Theme state
  const [darkMode, setDarkMode] = useState(true)
  
  // Todo items state
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('todoapp.items') || '[]')
    } catch {
      return []
    }
  })
  
  // Input and filter state
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState('all') // all, active, completed
  
  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('todoapp.items', JSON.stringify(todos))
  }, [todos])
  
  // Add new todo
  const addTodo = (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    
    setTodos(prev => [...prev, {
      id: crypto.randomUUID(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }])
    setNewTodo('')
  }
  
  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }
  
  // Delete todo
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }
  
  // Clear completed todos
  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }
  
  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })
  
  // Count remaining active todos
  const activeTodoCount = todos.filter(todo => !todo.completed).length

  return (
    <div className={`mx-auto max-w-md transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        {/* Header with theme toggle */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Todo List
          </h2>
          <button
            onClick={() => setDarkMode(d => !d)}
            className="rounded-lg p-2 hover:bg-white/10"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <FiSun className="text-white" /> : <FiMoon className="text-gray-900" />}
          </button>
        </div>

        {/* Add todo form */}
        <form onSubmit={addTodo} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/40 focus:border-cyan-400 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 px-4 py-2 font-semibold text-white"
            >
              Add
            </button>
          </div>
        </form>

        {/* Filter tabs */}
        <div className="mb-4 flex justify-center gap-2">
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1 text-sm font-medium capitalize transition ${
                filter === f
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Todo list */}
        <div className="space-y-2">
          <AnimatePresence>
            {filteredTodos.map(todo => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      todo.completed
                        ? 'border-green-500 bg-green-500'
                        : 'border-white/30'
                    }`}
                  >
                    {todo.completed && <FiCheck className="text-white" size={12} />}
                  </button>
                  <span className={`${todo.completed ? 'text-white/50 line-through' : 'text-white'}`}>
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-white/40 hover:text-white"
                  aria-label="Delete todo"
                >
                  <FiTrash2 />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-white/60">
            <div>{activeTodoCount} items left</div>
            <button
              onClick={clearCompleted}
              className="hover:text-white"
            >
              Clear completed
            </button>
          </div>
        )}

        {todos.length === 0 && (
          <div className="py-8 text-center text-white/40">
            No todos yet. Add some!
          </div>
        )}
      </div>
    </div>
  )
}