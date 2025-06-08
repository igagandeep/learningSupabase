'use client'

import { useEffect, useState, FormEvent } from 'react'
import { supabase } from '../lib/supabaseClient'

type Todo = {
  id: number
  title: string
  is_complete: boolean
  created_at: string
}

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Fetch all todos
  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setTodos(data as Todo[])
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // Insert new todo
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    const { error } = await supabase.from('todos').insert({ title })

    if (error) {
      setError(error.message)
    } else {
      setTitle('')
      fetchTodos()
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>My Todos</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '8px', width: '300px' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '8px 12px' }}>
          Add Todo
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>✅ {todo.title}</li>
        ))}
      </ul>
    </main>
  )
}
