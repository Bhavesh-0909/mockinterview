import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { SYSTEM_PROMPT } from "../constant.js";
import { app } from "../app.js";

export const chatAPI = async (req, res) => {
  const { input } = req.body; 
  const messages = [];
  messages.push(new SystemMessage(SYSTEM_PROMPT));
  messages.push(new HumanMessage(input));
  try {
    const result = await app.invoke({ messages });
    const lastMessage = result.messages[result.messages.length - 1];
    res.json({ reply: lastMessage.content });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message });
  }
};