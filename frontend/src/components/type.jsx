// import React from "react";
// import Typewriter from "typewriter-effect";

// function Type() {
//   return (
//     <Typewriter
//       options={{
//         strings: ["please signin to continue"],
//         autoStart: true,
//         loop: true,
//         typeSpeed: 200,
//         deleteSpeed: 50,
//       }}
//     />
//   );
// }

// export default Type;
import React from "react";
import Typewriter from "typewriter-effect";

const Type = () => {
  return (
    <div className="flex justify-center items-center min-h-[120px] bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6 shadow-2xl">
      <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 tracking-wide">
        <Typewriter
          options={{
            strings: [
              "Please sign in to continue...",
              "Welcome back!",
              "Secure authentication required",
              "Please verify your identity",
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 50,
            typeSpeed: 50,
            delay: 50,
            cursor: "|",
            pauseFor: 1500,
          }}
        />
      </div>
    </div>
  );
};

// Example usage in a page/component
const TypewriterContainer = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="relative">
        {/* Optional decorative elements */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

        {/* Main component */}
        <Type />

        {/* Optional subtitle */}
        {/* <p className="text-center mt-4 text-gray-500 italic">
          Ensuring a secure experience for all users
        </p> */}
      </div>
    </div>
  );
};

export default TypewriterContainer;
