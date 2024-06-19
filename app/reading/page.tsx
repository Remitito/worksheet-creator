import ReadingClient from "./ReadingClient";
import React from "react";

const page = () => {
  const CreateWorksheet = async (
    grammar: string,
    level: string,
    topic: string,
    wordCount: number
  ) => {
    "use server";
    const response = await fetch(process.env.BASE_URL + "/api/reading", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grammar,
        level,
        topic,
        wordCount,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Request failed with status:", response.status);
    }
  };

  return <ReadingClient createWorksheet={CreateWorksheet} />;
};

export default page;
