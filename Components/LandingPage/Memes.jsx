import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const memes = [
  "Your crush won't remember you. We will—every 1-2-4-7-15 days.",
  "Because logging in is the only thing that works on the first try.",
  "Trying to debug at 3 AM like: maybe the bug is in me.",
  "Procrastination level: added TODOs in TODO list.",
  "I solved one DP question... now I'm the CEO of Confidence.",
  "If I had a rupee for every WA, I'd fund OpenAI.",
  "Sign-up to track your progress... not your heartbreaks.",
  "Segmentation fault? Nah, it's just my heart again.",
  "Signed in to code. Ended up staring at the screen for 2 hours.",
  "Me solving problems: 10% logic, 90% Stack Overflow.",
  "Therapist: what do you do when you're stressed? Me: I console.log my feelings.",
  "Running code at 2 AM is a personality trait.",
  "I have a better chance of understanding pointers than understanding her",
  "My code gets compiled more than I do in conversations.",
  "Why cry in love when you can cry in front of your IDE?"
];

const Memes = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % memes.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + memes.length) % memes.length);
  };

  return (
    <section className="bg-blue-50 py-20 px-6 text-center">
      <h2 className="text-4xl font-bold italic text-gray-800 mb-10">Meme Therapy</h2>

      <div className="relative max-w-3xl mx-auto bg-white rounded-3xl shadow-md p-10 ">
        <p className="text-xl font-medium italic text-gray-700 leading-relaxed max-w-10/12 mx-auto text-center">
          “{memes[current]}”
        </p>

        <div className="flex justify-between absolute top-1/2 left-0 right-0 px-6 -translate-y-1/2">
          <button
            onClick={prevSlide}
            className="bg-white hover:bg-gray-100 rounded-full p-3 shadow-md transition"
          >
            <FaArrowLeft className="text-gray-500 hover:text-gray-700" size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white hover:bg-gray-100 rounded-full p-3 shadow-md transition"
          >
            <FaArrowRight className="text-gray-500 hover:text-gray-700" size={20} />
          </button>
        </div>
      </div>

      <p className="mt-8 text-gray-500 italic text-sm">Swipe through your coding trauma with a smile.</p>
    </section>
  );
};

export default Memes;
