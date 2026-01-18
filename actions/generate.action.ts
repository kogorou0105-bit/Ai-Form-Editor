"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
// 这里的 import 是安全的，因为这个文件只在服务器运行
import { setGlobalDispatcher, ProxyAgent } from "undici";

// 1. 配置代理 (仅在开发环境或需要时)
// ⚠️ 请确保这里的端口 7890 是你 VPN 的实际端口 (Clash通常是7890, v2rayN是10809)
const PROXY_URL = "http://127.0.0.1:11808";

if (process.env.NODE_ENV === "development") {
  try {
    const dispatcher = new ProxyAgent({ uri: PROXY_URL });
    setGlobalDispatcher(dispatcher);
    console.log(`[Server Action] Proxy set to ${PROXY_URL}`);
  } catch (error) {
    console.error("Failed to set proxy:", error);
  }
}

// 2. 初始化 Gemini
const apiKey =
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function generateFormWithAI(prompt: string) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();

    return { success: true, data: responseText };
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return { success: false, error: error.message };
  }
}
