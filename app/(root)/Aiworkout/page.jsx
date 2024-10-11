// import OpenAI from "openai";
import AiAssist from "@/components/AiAssist";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function page() {
  //   const openai = new OpenAI({apiKey: process.env.OPEN_AI_KEY});

  //   const completion = await openai.chat.completions.create({
  //     model: "gpt-4o-mini",
  //     messages: [
  //     //   { role: "system", content: "You are a helpful assistant." },
  //       {
  //         role: "user",
  //         content: "Write a haiku about recursion in programming.",
  //       },
  //     ],
  //   });

  //   console.log(completion.choices[0].message);

  //   const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
  //   const prompt = "Give me a push Workout";

  //   const result = await model.generateContent(prompt);
  //   console.log(result.response.text());
  return <AiAssist />;
}

export default page;
