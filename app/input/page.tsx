"use client";
import React, { useEffect, useState } from "react";
import tecnologias from '@/app/data/tecnologias.json';

type Task = {
  id: string;
  text: string;
  category?: string;
};

export default function InputPage() {
  const [typed, setTyped] = useState<string>("");
  const [selectedTech, setSelectedTech] = useState<string>(tecnologias?.[0]?.title ?? "");

  const [taskText, setTaskText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem("input-tasks");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  useEffect(() => {
    try {
      localStorage.setItem("input-tasks", JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  // Add a new task
  function addTask() {
    const text = taskText.trim();
    if (!text) return;
    const newTask: Task = {
      id: String(Date.now()),
      text,
      category: selectedTech,
    };
    setTasks((t) => [...t, newTask]);
    setTaskText("");
  }

  function deleteTask(id: string) {
    setTasks((t) => t.filter((x) => x.id !== id));
  }

  function startEdit(task: Task) {
    setEditingId(task.id);
    setEditingText(task.text);
  }

  function saveEdit() {
    if (!editingId) return;
    const text = editingText.trim();
    if (!text) return;
    setTasks((t) => t.map((item) => (item.id === editingId ? { ...item, text } : item)));
    setEditingId(null);
    setEditingText("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Página Input</h1>

      {/* Texto controlado */}
      <section className="mb-6">
        <label className="block font-medium mb-1">Digite texto (aparece em baixo):</label>
        <input
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-lg"
          placeholder="Escreve algo..."
        />
        <p className="mt-2 text-gray-700">Digitado: <span className="font-mono">{typed}</span></p>
      </section>

      {/* Seletor de tecnologias */}
      <section className="mb-6">
        <label className="block font-medium mb-1">Escolhe uma tecnologia / categoria:</label>
        <select
          value={selectedTech}
          onChange={(e) => setSelectedTech(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-xs"
        >
          {tecnologias.map((t) => (
            <option key={t.title} value={t.title}>{t.title}</option>
          ))}
        </select>
        <p className="mt-2 text-sm text-gray-600">Selecionado: <strong>{selectedTech}</strong></p>
      </section>

      {/* Lista de tarefas */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Lista de Tarefas</h2>

        <div className="flex gap-2 mb-3">
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Nova tarefa..."
            className="border px-3 py-2 rounded flex-1"
          />

          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Inserir
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-sm text-gray-500">Ainda sem tarefas.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-start gap-3 p-3 border rounded">
                <div className="flex-1">
                  {editingId === task.id ? (
                    <input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                    />
                  ) : (
                    <>
                      <div className="text-sm font-medium">{task.text}</div>
                      <div className="text-xs text-gray-500">Categoria: {task.category}</div>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {editingId === task.id ? (
                    <>
                      <button
                        onClick={saveEdit}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(task)}
                        className="px-3 py-1 bg-yellow-400 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Apagar
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
