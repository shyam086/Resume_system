import React from "react";

export default function ResumePreview({ data }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-gray-800">
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p className="text-blue-600">{data.title}</p>
      <div className="text-sm text-gray-600 mt-2">
        📧 {data.email} | 📞 {data.phone}
      </div>

      <hr className="my-4" />

      <section className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Profile Summary</h3>
        <p className="text-sm">{data.summary}</p>
      </section>

      <section className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
        <div className="flex gap-2 flex-wrap">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="text-xs bg-gray-200 px-2 py-1 rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-gray-700 mb-2">Experience</h3>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-2">
            <div className="font-medium">{exp.role}</div>
            <div className="text-sm text-gray-600">
              {exp.company} • {exp.period}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
