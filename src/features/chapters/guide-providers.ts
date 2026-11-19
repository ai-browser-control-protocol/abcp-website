// Display names used in the guide's configuration demo.
const gpt = "GPT-6.2 Sol";
const claude = "Claude Opus 5.5";
const deepseek = "DeepSeek V4.1-flash";
const kimi = "Kimi K3.1-pro";
const qwen = "Qwen4-Max";
const gemini = "gemini-4-carbon";
const glm = "GLM-5.3";

// Desktop provider presets and the model families illustrated for each.
export const guideProviders: Record<string, readonly string[]> = {
  "deepseek": [deepseek],
  "amazon-bedrock": [claude, glm],
  "ant-ling": [],
  "anthropic": [claude],
  "azure": [],
  "baseten": [deepseek, glm],
  "cerebras": [],
  "cloudflare-ai-gateway": [claude, glm],
  "cloudflare-workers-ai": [glm],
  "fireworks": [deepseek, glm],
  "github-copilot": [claude],
  "google-vertex": [gemini],
  "google": [gemini],
  "groq": [],
  "huggingface": [deepseek, glm],
  "kimi-coding": [kimi],
  "meta": [],
  "minimax-cn": [],
  "minimax": [],
  "mistral": [glm],
  "moonshotai-cn": [kimi],
  "moonshotai": [kimi],
  "nvidia": [deepseek, glm],
  "openai-codex": [gpt],
  "openai": [gpt],
  "opencode-go": [deepseek, glm],
  "opencode": [claude, deepseek, glm],
  "openrouter": [gpt, claude, deepseek, kimi, qwen, gemini, glm],
  "qwen-token-plan-cn": [deepseek, qwen, glm],
  "qwen-token-plan-individual": [qwen],
  "qwen-token-plan": [deepseek, qwen, glm],
  "radius": [claude, deepseek, glm],
  "together": [deepseek, glm],
  "vercel-ai-gateway": [claude, deepseek, glm],
  "xai": [],
  "xiaomi-token-plan-ams": [],
  "xiaomi-token-plan-cn": [],
  "xiaomi-token-plan-sgp": [],
  "xiaomi": [],
  "zai-coding-cn": [glm],
  "zai": [glm],
};
