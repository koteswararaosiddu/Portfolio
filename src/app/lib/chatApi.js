export async function sendMessage(message) {
    const response = await fetch(
      "https://v8n.vyaktimetrics.com/webhook-test/portfolio-chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      }
    );
  
    return response.json();
  }