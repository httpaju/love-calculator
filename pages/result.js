import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Result() {
  const router = useRouter();
  const { name1, name2 } = router.query;
  const [percentage, setPercentage] = useState(null);

  useEffect(() => {
    if (name1 && name2) {
      const calcPercentage = () => {
        const combined = (name1 + name2).toLowerCase().replace(/\s/g, "");
        let score = 0;
        for (let char of combined) {
          score += char.charCodeAt(0);
        }
        return (score % 100) + 1;
      };
      setPercentage(calcPercentage());
    }
  }, [name1, name2]);

  const getLoveMessage = (score) => {
    if (score < 50) return "Love is a journey—keep exploring!";
    if (score < 75) return "Sparks are flying—could this be fate?";
    return "A match made in heaven!";
  };

  const shareText = `${name1} & ${name2}: ${percentage}% Love Match! Test yours at love-calculator.vercel.app ❤️`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-romantic-pink to-soft-white flex items-center justify-center p-4">
      <Head>
        <title>Love Result | AJ APPLICATIONS</title>
      </Head>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-romantic-red mb-4 font-[Pacifico]">
          ❤️ Your Love Score
        </h1>
        {percentage ? (
          <>
            <div className="relative mb-6">
              <div className="text-5xl font-bold text-romantic-red animate-heartbeat">
                {percentage}%
              </div>
              <p className="text-gray-600 mt-2 font-[Poppins]">
                {name1} & {name2}
              </p>
            </div>
            <p className="text-lg text-gray-700 mb-6 font-[Poppins]">
              {getLoveMessage(percentage)}
            </p>
            <button
              onClick={() =>
                navigator.share({
                  text: shareText,
                  url: "https://love-calculator.vercel.app",
                })
              }
              className="bg-romantic-red text-white py-2 px-6 rounded-full font-[Poppins] hover:bg-romantic-pink transition"
            >
              Share Result
            </button>
          </>
        ) : (
          <p className="text-gray-600 font-[Poppins]">Calculating...</p>
        )}
        <p className="mt-4 text-sm text-gray-500 font-[Poppins]">
          Powered by AJ APPLICATIONS
        </p>
      </div>
    </div>
  );
}