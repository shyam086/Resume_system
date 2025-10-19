import { useState } from "react";
import { useResume } from "../context/ResumeContext";

export default function EducationPage() {
  const { resume, setResume } = useResume();
  const [edu, setEdu] = useState({ degree: "", school: "", year: "" });

  const addEducation = () => {
    if (!edu.degree || !edu.school) return;
    setResume({
      ...resume,
      education: [...resume.education, edu],
    });
    setEdu({ degree: "", school: "", year: "" });
  };

  const deleteEducation = (index) => {
    const updated = resume.education.filter((_, i) => i !== index);
    setResume({ ...resume, education: updated });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🎓 Education</h1>

      <div className="max-w-xl space-y-3 mb-6">
        <input
          type="text"
          placeholder="Degree"
          value={edu.degree}
          onChange={(e) => setEdu({ ...edu, degree: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="School / College"
          value={edu.school}
          onChange={(e) => setEdu({ ...edu, school: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Year (e.g. 2018–2022)"
          value={edu.year}
          onChange={(e) => setEdu({ ...edu, year: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <button
          onClick={addEducation}
          className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700"
        >
          + Add Education
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Added Education</h2>
        {resume.education.length === 0 && (
          <p className="text-gray-500">No education added yet.</p>
        )}
        {resume.education.map((edu, i) => (
          <div
            key={i}
            className="border-l-4 border-blue-600 pl-3 mb-3 flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
          >
            <div>
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-sm text-gray-600">
                {edu.school} ({edu.year})
              </p>
            </div>
            <button
              onClick={() => deleteEducation(i)}
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
