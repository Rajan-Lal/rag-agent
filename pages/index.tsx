import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const ask = async () => {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ask the AI Agent</h1>
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question here..."
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={ask}>
        Ask
      </button>
      {answer && (
        <pre className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap">{answer}</pre>
      )}
    </main>
  );
}
