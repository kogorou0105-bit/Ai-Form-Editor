import { GoogleGenerativeAI } from "@google/generative-ai";
// 引入 undici 的代理工具
import { setGlobalDispatcher, ProxyAgent } from "undici";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;

// ============================================================
// 核心修复代码：强制 Node.js 走本地代理
// ============================================================
if (process.env.NODE_ENV === "development") {
  // ⚠️ 注意：请将 7890 改为你实际的 VPN 代理端口
  const proxyUrl = "http://127.0.0.1:7890";

  const dispatcher = new ProxyAgent({ uri: proxyUrl });
  setGlobalDispatcher(dispatcher);

  console.log(`[Dev] Gemini SDK is using proxy: ${proxyUrl}`);
}
// ============================================================

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const AIChatSession = model.startChat({
  generationConfig,
  history: [],
});
