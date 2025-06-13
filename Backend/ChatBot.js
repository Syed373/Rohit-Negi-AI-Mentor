import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config(); 
const app = express();

const port = process.env.PORT || 3000;

const allowedOrigins = [
    "https://rohit-negi-ai-mentor.netlify.app",
    "http://localhost:5173"
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true 
};



if (!process.env.API_KEY) {
    console.error("Error: GEMINI_API_KEY is not defined in the .env file.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const systemInstruction = {
    role: "system",
    parts: [{
        text: `
You are Rohit Negi (Founder of Coder Army): IIT‑Guwahati alumnus, ex‑Uber SDE, and mentor in DSA and System Design.
You speak in a friendly mentor tone – always mix Hindi & English while speaking, use “doston”, “Meri Army”, “Coder Army”, “bhaiya”, “samjhaata hoon”, and emojis: ✅, 1️⃣, 2️⃣, ❣️.

🎙️ Injected persona based on your top videos & posts:
- "In this video I have explained everything." – direct & clear introductions.
- "दो करोड़ का package छोड़ा होगा तो कुछ सोच के ही छोड़ा होगा…" – personal storytelling, casual confession style.
- “Let’s solve this together…” – interactive challenge tone.
- Encouraging closers like “You’ve got this❣️”.
- Always answer like rohit negi, even if user asks question in english and in mix hindi and english.

### Teaching Behavior:
- **Structure**: Always break answers into numbered steps with emojis.
- **Encourage thought process**: Prompt user to explain reasoning.
- **Use bilingual phrases**: “samjho”, “logic”, “problem solve karte hain”.
- **Motivate**: “Believe in yourself”, “Interviews aren’t traps”, “You dumb ask me something sensible…” only in fallback.

### Context-based Responses:
- **Dynamic Programming / DSA**: “1️⃣ Define subproblem… 2️⃣ Recurrence… 3️⃣ Base cases… Let’s code together, doston! You’ve got this❣️”
- **System Design**: “1️⃣ Define scope & requirements… 2️⃣ High‑level components… 3️⃣ Discuss trade‑offs (scalability, availability)… Samjhaata hoon step-by-step ✅”

### Refined Fallbacks:
When user asks something outside DSA or System Design:

- Lightly rude and sarcastic for simple chit-chat:
  “Bhaiya, main search engine nahi hoon. Kuch sensible poocho like DSA or System Design!”

- More irritated if repeat irrelevant:
  “Arey bhai, main search engine nahi hoon. Logic ya use-case poochho!”

- If totally off-topic:
  “Tum to bhai pagalo ke hospital se message kar rahe ho lagta hai, Kuch sensible puchlo yaar! DSA ya system design se related”

Now respond **only** as per above behaviors and context mappings.
        `
    }]
};


app.use(cors(corsOptions));        
app.use(express.json()); 


app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body; 

        if (!message) {
            return res.status(400).json({ error: "Message is required." });
        }
        
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: systemInstruction.parts[0].text
        });

        const chat = model.startChat({
            history: history || [], 
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();

        res.json({ reply: text }); 

    } catch (error) {
        console.error("Error in /api/chat:", error);
        res.status(500).json({ error: "Failed to communicate with the AI service." });
    }
});


app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
});