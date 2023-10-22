import React from "react";
import {
    FaGithub,
    FaLinkedin
  } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full p-4 z-50 border-t-2 items-end">
      <div className="flex justify-end space-x-4">
        <p className="text-slate-700">
            Social media:
        </p>
        <a
          href="https://www.linkedin.com/in/dmitriinikiforov/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-blue-500"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/nikkxll"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-gray-400"
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}
