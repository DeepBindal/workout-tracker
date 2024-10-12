"use client";
import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Image from "next/image";
import toast from "react-hot-toast";
import { buttonVariants } from "@/components/ui/button";

function AiAssist() {
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("You don't have a response yet.");

  // On component mount, check if there is a response saved in localStorage
  useEffect(() => {
    const savedResponse = localStorage.getItem("aiResponse");
    if (savedResponse) {
      setResponse(savedResponse);
    }
  }, []);

  const checkPrompt = () => {
    const arr = prompt.split(" ");
    return arr.includes("workout") || arr.includes("Workout");
  };

  const onSubmit = async () => {
    try {
      const isPromptOk = checkPrompt();
      if (!isPromptOk) {
        toast.error("Prompt should include keywords like 'Workout'");
        return;
      }
      setLoading(true);

      // Call the Google Generative AI API
      const genAi = new GoogleGenerativeAI(API_KEY);
      const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const res = await result.response;

      const promptResponse = res.text();
      let finalResponse = formatResponse(promptResponse);
      Response = formatMarkdownResponse(finalResponse);

      // Save the response in state and localStorage
      setResponse(Response);
      localStorage.setItem("aiResponse", Response);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const formatMarkdownResponse = (text) => {
    // Replace the markdown headers (##) with <h2> tags
    let formattedText = text.replace(/##/g, "<h2>").replace(/\*\*/g, "<p>").replace(/\*/g, "</p>");
  
    // Optional: You might also want to remove excess spaces or adjust any other symbols
    // For example, replacing new lines with <br> if necessary
    formattedText = formattedText.replace(/\n/g, "<br>");
    
    return formattedText;
  };
  
  const formatResponse = (text) => {
    // Split the response into an array by new lines, assuming the response is line-by-line.
    const lines = text.split("\n");

    // Initialize an empty formatted string
    let formattedText = "";

    // Loop through each line and apply formatting
    lines.forEach((line) => {
      // Remove any extra spaces at the beginning or end
      line = line.trim();

      // Check for important keywords to add emphasis (e.g., headers)
      if (line.toLowerCase().includes("warm-up")) {
        formattedText += `<h3>Warm-up</h3><p>${line}</p>`;
      } else if (line.toLowerCase().includes("cool-down")) {
        formattedText += `<h3>Cool-down</h3><p>${line}</p>`;
      } else if (line.toLowerCase().includes("pro tip")) {
        formattedText += `<h4>Pro Tip</h4><p>${line}</p>`;
      } else {
        // Add the rest as normal paragraphs
        formattedText += `<p>${line}</p>`;
      }
    });

    return formattedText;
  };

  return (
    <div className="p-6 shadow-lg rounded-lg w-full mx-auto">
      <h1 className="text-3xl font-semibold mb-4">
        Design your workout with AI
      </h1>
      <Input
        type="text"
        placeholder="Eg: give me a push workout."
        onChange={(e) => setPrompt(e.target.value)}
        className="border-gray-300 my-4 focus:ring-blue-500 focus:border-blue-500 rounded-xl"
      />

      <Button
        type="submit"
        onClick={onSubmit}
        className="rounded"
        variant="secondary"
      >
        Submit
      </Button>

      <div className="bg-zinc-900 p-4 mt-4 rounded-xl">
        {loading && (
          <Image
            src="/assets/spinner.svg"
            width={50}
            height={50}
            alt="spinner-svg"
          />
        )}
        {!loading && <div dangerouslySetInnerHTML={{ __html: response }} />}
      </div>
    </div>
  );
}

export default AiAssist;
