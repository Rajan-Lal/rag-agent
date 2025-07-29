import type { NextApiRequest, NextApiResponse } from "next";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { loadKnowledgeBase } from "@/lib/rag";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { question } = req.body;
  const vectorStore = await loadKnowledgeBase();

  const results = await vectorStore.similaritySearch(question, 3);
  const context = results.map((r) => r.pageContent).join("\n");

  const model = new ChatOpenAI({ temperature: 0.2 });
  const response = await model.call([
    { role: "system", content: "You are a helpful assistant using the following document:" },
    { role: "user", content: `Context:\n${context}\n\nQuestion:\n${question}` },
  ]);

  res.status(200).json({ answer: response.text });
}
