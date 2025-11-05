
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

// FIX: Correctly initialize the GoogleGenAI client. The API key must be passed within an object.
const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

if (!ai) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

interface PromotionalProductResponse {
  productId: string;
  reason: string;
}

export async function highlightPromotionalProduct(
  products: Product[],
  categoryName: string
): Promise<PromotionalProductResponse | null> {
  if (!ai) {
    // Fallback for when API key is not available
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    return {
      productId: randomProduct.id,
      reason: "¡Nuestro favorito de hoy! No te lo pierdas.",
    };
  }

  const productListText = products
    .map((p) => `- ID: ${p.id}, Nombre: ${p.name}, Precio: ${p.price}`)
    .join("\n");

  const prompt = `
    Eres un asistente de ventas experto para una cafetería. Dada la siguiente lista de productos en la categoría '${categoryName}', selecciona el mejor producto para promocionar. Devuelve un objeto JSON con dos claves: 'productId' (el ID del producto seleccionado) y 'reason' (una razón corta y atractiva para la promoción en español, máximo 15 palabras).

    Productos:
    ${productListText}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productId: {
              type: Type.STRING,
              description: "El ID del producto a promocionar."
            },
            reason: {
              type: Type.STRING,
              description: "La razón para la promoción."
            }
          },
          required: ["productId", "reason"]
        }
      }
    });

    // FIX: According to Gemini API guidelines, get the text response and then parse it.
    const text = response.text;
    const data = JSON.parse(text);

    if (data.productId && data.reason) {
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching promotional product from Gemini API:", error);
    // Fallback in case of API error
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    return {
      productId: randomProduct.id,
      reason: "¡Recomendación especial del día!",
    };
  }
}
