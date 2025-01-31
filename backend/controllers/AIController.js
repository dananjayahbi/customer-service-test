const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// Pre-structured data (replace with your actual data)
const productData = [
  { id: 1, name: "Awesome Product 1", description: "This is a great product!" },
  { id: 2, name: "Fantastic Product 2", description: "This product is even better!" },
];

const siteData = {
  aboutUs: "We are a company that makes awesome products.",
  contactUs: "You can contact us at support@awesomecompany.com",
};

let chat = null; // Store chat instance

const aiBotController = async (req, res) => {
  try {
    const userMessage = req.body.message.toLowerCase(); // Convert to lowercase for case-insensitive matching

    if (!chat) {
      // Initialize chat if not already initialized
      chat = model.startChat({
        generationConfig: {
          temperature: 0.65, // Increased for creativity and exploration
          topK: 40, // Wider consideration for diverse possibilities
          topP: 0.95, // Favoring likely tokens while allowing some deviation
          maxOutputTokens: 30000, // Balanced length for code generation
        },
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
        ],
      });
    }

    // Check if user message matches pre-structured data keywords
    const isProductInquiry = productData.some(
      (product) => userMessage.includes(product.name.toLowerCase())
    );
    const isSiteInquiry = Object.keys(siteData).some((key) => userMessage.includes(key));

    // Handle product inquiries
    if (isProductInquiry) {
      const matchingProduct = productData.find((product) =>
        userMessage.includes(product.name.toLowerCase())
      );
      return res.status(200).send({ bot: matchingProduct.description });
    }

    // Handle site inquiries (about us, contact us)
    if (isSiteInquiry) {
      const matchingSiteData = siteData[
        Object.keys(siteData).find((key) => userMessage.includes(key))
      ];
      return res.status(200).send({ bot: matchingSiteData });
    }

    // Send user message to the chat for out-of-scope inquiries
    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    const botMessage = response.text();

    res.status(200).send({ bot: botMessage || "I don't know, but I'm still learning!" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
};

module.exports = { aiBotController };
