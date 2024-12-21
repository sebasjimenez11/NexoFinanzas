export class GeminiAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
  }

  async llamarGemini(prompt) {
    const url = `${this.baseUrl}?key=${this.apiKey}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      const textoGenerado = data.candidates[0].content.parts[0].text;

      console.log(textoGenerado);
      return textoGenerado;
    } catch (error) {
      console.error("Error al llamar a la API de Gemini:", error);
      throw error; // Vuelves a lanzar el error si necesitas manejarlo en otro lugar
    }
  }
}

// Uso de la clase
