from fastapi import FastAPI
from pydantic import BaseModel
import requests, json

app = FastAPI()
OLLAMA_SERVER_URL = "http://localhost:11434"

class ChatPrompt(BaseModel):
    prompt: str

@app.post("/chat")
def chat(data: ChatPrompt):
    payload = {
        "model": "llama3.2",
        "keep_alive": -1,  # keep model always loaded
        "messages": [
            {"role": "user", "content": data.prompt}
        ]
    }

    try:
        # stream=True because Ollama streams JSON objects
        response = requests.post(f"{OLLAMA_SERVER_URL}/api/chat", json=payload, stream=True)
        response.raise_for_status()

        reply = ""
        for line in response.iter_lines():
            if line:
                parsed = json.loads(line.decode("utf-8"))
                if "message" in parsed:
                    reply += parsed["message"]["content"]

        return {"reply": reply}

    except requests.RequestException as e:
        return {"error": str(e)}
