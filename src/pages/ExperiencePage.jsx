import { useState } from "react";
import { useResume } from "../context/ResumeContext";

export default function ExperiencePage() {
  const { resume, setResume } = useResume();
  const [exp, setExp] = useState({ role: "", company: "", year: "" });

  const addExperience = () => {
    if (!exp.role || !exp.company) return;
    setResume({
      ...resume,
      experience: [...resume.experience, exp],
    });
    setExp({ role: "", company: "", year: "" });
  };

  const deleteExperience = (index) => {
    const updated = resume.experience.filter((_, i) => i !== index);
    setResume({ ...resume, experience: updated });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">💼 Experience</h1>

      <div className="max-w-xl space-y-3 mb-6">
        <input
          type="text"
          placeholder="Role"
          value={exp.role}
          onChange={(e) => setExp({ ...exp, role: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Company"
          value={exp.company}
          onChange={(e) => setExp({ ...exp, company: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Year (e.g. 2021–2024)"
          value={exp.year}
          onChange={(e) => setExp({ ...exp, year: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <button
          onClick={addExperience}
          className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700"
        >
          + Add Experience
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Added Experience</h2>
        {resume.experience.length === 0 && (
          <p className="text-gray-500">No experience added yet.</p>
        )}
        {resume.experience.map((exp, i) => (
          <div
            key={i}
            className="border-l-4 border-blue-600 pl-3 mb-3 flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
          >
            <div>
              <p className="font-semibold">{exp.role}</p>
              <p className="text-sm text-gray-600">
                {exp.company} ({exp.year})
              </p>
            </div>
            <button
              onClick={() => deleteExperience(i)}
              className="text-red-600 hover:underline"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
