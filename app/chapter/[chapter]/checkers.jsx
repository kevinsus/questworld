"use client";

import React, { useState, useEffect } from "react";
import OpenAI from "openai";

const Checkers = ({ answer, solution, enteredSolution }) => {
  const [validation, setValidation] = useState(null);

  const validateAnswer = async () => {
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Determine if the following code correctly implements the logic of the provided solution. Respond with "true" if the code is correct and "false" if it is not.

            Code:
            ${answer}
            
            Solution Logic:
            ${solution}
            
            Note that if given solution is in array, it means that the solution can have either of the elements.
            Return "true" if the code fully matches the logic described, otherwise return "false".`,
          },
        ],
      });
      
      const result = completion.choices[0].message.content.trim();
      setValidation(result === "true");
    } catch (error) {
      console.error("Error occurred during validation:", error);
      setValidation(null);
    }
  };

  useEffect(() => {
      validateAnswer();
  }, [enteredSolution]);

  const handleClosePopup = () => {
    setValidation(null);
  };

  return (
    <div>
      {validation ? (
        <div>
          <h2>Correct!</h2>
          <button>Next Question</button>
        </div>
      ) : (
        <div>
          <h2>Incorrect!</h2>
          <button>Try again</button>
        </div>
      )}      
    </div>
  );
};

export default Checkers;
