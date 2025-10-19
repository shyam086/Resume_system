import { useResume } from "../context/ResumeContext";
import { useState } from "react";

export default function TemplatePage() {
  const { resume } = useResume();
  const [template, setTemplate] = useState("modern");

  const templates = [
    { id: "modern", name: "Modern (Blue Accent)" },
    { id: "classic", name: "Classic (Simple Borders)" },
    { id: "minimal", name: "Minimalist (Black & White)" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🎨 Choose Template</h1>

      <div className="flex gap-4 mb-8">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`px-4 py-2 rounded-lg border ${
              template === t.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-2">Preview ({template})</h2>
        <div
          className={`p-4 ${
            template === "modern"
              ? "border-l-4 border-blue-600"
              : template === "classic"
              ? "border border-gray-400"
              : "border-0 text-black"
          }`}
        >
          <p className="font-semibold text-xl">{resume.name || "Your Name"}</p>
          <p className="text-blue-600">{resume.title || "Your Title"}</p>
          <p className="text-sm mt-2">{resume.profile || "Profile summary..."}</p>
        </div>
      </div>
    </div>
  );
}
