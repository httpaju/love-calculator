import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateLovePercentage = () => {
    const combined = (name1 + name2).toLowerCase().replace(/\s/g, "");
    let score = 0;
    for (let char of combined) {
      score += char.charCodeAt(0);
    }
    return (score % 100) + 1;
  };

  const handleCalculate = () => {
    if (!name1 || !name2) {
      alert("Please enter both names!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setPercentage(calculateLovePercentage());
      setLoading(false);
    }, 1500); // Simulate delay for animation
  };

  const getLoveMessage = (score) => {
    if (score < 50) return "Love is a journey—keep exploring!";
    if (score < 75) return "Sparks are flying—could this be fate?";
    return "A match made in heaven!";
  };

  const shareText = `${name1} & ${name2}: ${percentage}% Love Match! Test yours at love-calculator.onrender.com ❤️`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-romantic-pink to-soft-white flex items-center justify-center p-4">
      <Head>
        <title>Love Calculator | AJ APPLICATIONS</title>
      </Head>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-romantic-red mb-4 font-[Pacifico]">
          ❤️ Love Calculator
        </h1>
        <p className="text-gray-600 mb-6 font-[Poppins]">
          Find out your love match with AJ APPLICATIONS!
        </p>
        <input
          type="text"
          placeholder="Your Name"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-romantic-pink font-[Poppins]"
        />
        <input
          type="text"
          placeholder="Crush's Name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-romantic-pink font-[Poppins]"
        />
        <button
          onClick={handleCalculate}
          disabled={loading || !name1 || !name2}
          className="bg-romantic-red text-white py-2 px-6 rounded-full font-[Poppins] hover:bg-romantic-pink transition disabled:opacity-50 flex items-center justify-center mx-auto"
        >
          {loading ? (
            <span className="animate-heartbeat">❤️ Calculating...</span>
          ) : (
            "Calculate Love"
          )}
        </button>

        {percentage && (
          <div className="mt-6">
            <div className="text-5xl font-bold text-romantic-red animate-heartbeat">
              {percentage}%
            </div>
            <p className="text-gray-600 mt-2 font-[Poppins]">
              {name1} & {name2}
            </p>
            <p className="text-lg text-gray-700 mt-4 mb-6 font-[Poppins]">
              {getLoveMessage(percentage)}
            </p>
            <button
              onClick={() =>
                navigator.share({
                  text: shareText,
                  url: "https://love-calculator.onrender.com",
                })
              }
              className="bg-romantic-red text-white py-2 px-6 rounded-full font-[Poppins] hover:bg-romantic-pink transition"
            >
              Share Result
            </button>
          </div>
        )}
        <p className="mt-4 text-sm text-gray-500 font-[Poppins]">
          Powered by AJ APPLICATIONS
        </p>
      </div>
    </div>
  );
}