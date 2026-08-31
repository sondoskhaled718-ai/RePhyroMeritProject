async function sendPrompt() {
  const inputEl = document.getElementById('userInput');
  const outputEl = document.getElementById('output');
  const sendBtn = document.getElementById('sendBtn');
  const prompt = inputEl.value.trim();

  if (!prompt) return;

  sendBtn.disabled = true;
  outputEl.innerText = "جاري التفكير...";

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    const data = await response.json();

    if (response.ok) {
      outputEl.innerText = data.result;
    } else {
      outputEl.innerText = "خطأ: " + (data.error || "فشل الاتصال");
    }
  } catch (err) {
    outputEl.innerText = "حدث خطأ في الشبكة.";
  } finally {
    sendBtn.disabled = false;
  }
}
