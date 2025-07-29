import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

let vectorStore: MemoryVectorStore;

export const loadKnowledgeBase = async () => {
  if (vectorStore) return vectorStore;

  const loader = new PDFLoader("docs/knowledge.pdf");
  const docs = await loader.load();

  const embeddings = new OpenAIEmbeddings();
  vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

  return vectorStore;
};
