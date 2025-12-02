"use client";
import React, { useEffect, useState } from "react";

interface Props {
  title: string;
}

export default function ContadorPersonalizado({ title }: Props) {
  const storageKey = `likes:${title}`;
  const [likes, setLikes] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  // Carregar valor inicial do localStorage quando monta ou quando o title muda
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      setLikes(raw ? Number(raw) : 0);
    } catch {}
    setMounted(true);
  }, [storageKey]);

  // Guardar likes no localStorage sempre que muda
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(storageKey, String(likes));
    } catch {}
  }, [likes, storageKey, mounted]);

  // Sincronizar com outras abas/componentes em tempo real
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        setLikes(Number(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [storageKey]);

  const handleClick = () => setLikes((l) => l + 1);

  return (
    <button
      onClick={handleClick}
      className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition inline-flex items-center gap-2"
      aria-label={`Curtir ${title}`}
      title={`Curtir ${title}`}
    >
      👍 {likes}
    </button>
  );
}
