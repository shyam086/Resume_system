import React from "react";

export default function DetailsForm({ resume, setResume }) {
  const handleChange = (field, value) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Resume Details</h2>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={resume.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={resume.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full border rounded p-2"
          value={resume.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={resume.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Summary
        </label>
        <textarea
          className="w-full border rounded p-2"
          rows="3"
          value={resume.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
        />
      </div>
    </div>
  );
}
