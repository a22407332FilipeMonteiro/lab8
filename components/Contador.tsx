
"use client";
import React, { useEffect, useState } from "react";

export default function Contador() {
  const [count, setCount] = useState<number>(0);
    const [historico, setHistorico] = useState<number[]>([]);

  
  // manter dentro do intervalo [0, 10] e evitar duplicados consecutivos no histórico
  const clamp = (v: number) => Math.max(0, Math.min(10, v));

  const incrementar = () => {
    const novoValor = clamp(count + 1);
    setCount(novoValor);
    setHistorico((h) => (h[h.length - 1] === novoValor ? h : [...h, novoValor]));
  };

  const decrementar = () => {
    const novoValor = clamp(count - 1);
    setCount(novoValor);
    setHistorico((h) => (h[h.length - 1] === novoValor ? h : [...h, novoValor]));
  };

  const reset = () => {
    const novoValor = 0;
    setCount(novoValor);
    setHistorico((h) => (h[h.length - 1] === novoValor ? h : [...h, novoValor]));
  };


  useEffect(() => {

    const savedValor = localStorage.getItem("contador-valor");
    const savedHist = localStorage.getItem("contador-historico");

    if (savedValor) {
      setCount(Number(savedValor));
    }
    
    if (savedHist) {
        setHistorico(JSON.parse(savedHist));
    }

  }, []);

  useEffect(() => {
    localStorage.setItem("contador-valor", String(count));
    localStorage.setItem("contador-historico", JSON.stringify(historico));
    }, [count, historico]);

  return (
    <div>
      <h2>Contador</h2>

      <p className="mb-4">
        Valor: <span className={`font-mono ${
          count <= 3 ? 'text-red-600' : count <= 7 ? 'text-yellow-600' : 'text-green-600'
        }`}>
          {count}
        </span>
      </p>

      <div className="flex gap-2">
        <button onClick={incrementar}>+</button>
        <button onClick={decrementar}>-</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Histórico:</h3>
        {historico.length === 0 ? (
          <p className="text-sm text-gray-500">Ainda sem histórico.</p>
        ) : (
          <ul className="list-disc pl-6 space-y-1">
            {historico.map((c, i) => (
              <li key={i} className="text-sm">
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
