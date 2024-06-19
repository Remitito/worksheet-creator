"use client";

import React, { useState } from "react";
import { grammar } from "../(files)/grammar";

interface ReadingClientProps {
  createWorksheet: (
    grammar: string,
    level: string,
    topic: string,
    wordCount: number
  ) => Promise<void>;
}

const ReadingClient: React.FC<ReadingClientProps> = ({ createWorksheet }) => {
  const rowStyle = "flex flex-row justify-between items-center m-8";
  const leftLabelStyle = "text-2xl w-1/2 font-bold";
  const selectStyle = "text-lg w-3/5 p-2";
  const inputStyle = "text-lg w-3/5 p-2";
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const wordCounts = [50, 150, 300, 500, 700, 1000];

  const [chosenGrammar, setChosenGrammar] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [level, setLevel] = useState<string>("A1");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (chosenGrammar.length > 0 && topic.length > 0 && level.length > 0) {
      const wordCountIndex = levels.indexOf(level);
      const wordCount = wordCounts[wordCountIndex];
      const worksheet = await createWorksheet(
        chosenGrammar,
        level,
        topic,
        wordCount
      );
    }
  };

  return (
    <div className="w-screen h-5/6 flex justify-center mt-8">
      <div className="h-full w-3/5 bg-gray-200">
        <form onSubmit={handleSubmit}>
          <div className={rowStyle}>
            <label className={leftLabelStyle} htmlFor="grammar">
              Target Grammar:
            </label>
            <select
              value={chosenGrammar}
              onChange={(e) => setChosenGrammar(e.target.value)}
              className={selectStyle}
              name="grammar"
              id="grammar"
            >
              {grammar.map((item, index) => (
                <option
                  key={"grammar" + index}
                  value={item
                    .toLowerCase()
                    .replace(/ (\w)/g, (_, c) => c.toUpperCase())}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className={rowStyle}>
            <label className={leftLabelStyle} htmlFor="level">
              Language Level:
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className={selectStyle}
              name="level"
              id="level"
            >
              {levels.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className={rowStyle}>
            <label className={leftLabelStyle}>Topic:</label>
            <input
              placeholder="Elon Musk? Mental health? Japanese food?"
              className={inputStyle}
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="mb-8 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReadingClient;
