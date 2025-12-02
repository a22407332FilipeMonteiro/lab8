"use client";
import React, { useEffect, useState } from "react";

export default function Relogio() {
  const [time, setTime] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTime(new Date().toLocaleTimeString());
    const id = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!isMounted) return <div className="text-sm text-gray-700">--:--:--</div>;

  return (
    <div className="text-sm text-gray-700">
      {time}
    </div>
  );
}
