"use client"
import { supabase } from "@/lib/supabaseClient"
import { useEffect, useState } from "react"


type Todo = {
  id: number
  title: string
  is_complete: boolean
  created_at: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from("todos").select("*");

      if (error) {
        console.error("Error fetching todos:", error)
        return
      }

      setTodos(data)
    }

    fetchTodos()
  }, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {todos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.title}</p>
            <p>{todo.is_complete ? "Complete" : "Not Complete"}</p>
            <p>{todo.created_at}</p>
          </div>
        ))}
      </main>

    </div>
  );
}
