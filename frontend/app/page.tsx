"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Chargement...");

  useEffect(() => {
    fetch("http://localhost:8080/api/test")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("Erreur connexion backend"));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-blue-600">{message}</h1>
    </div>
  );
}