import { useResume } from "../context/ResumeContext";

export default function EditorPage() {
  const { resume, setResume } = useResume();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResume({ ...resume, [name]: value });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🧾 Basic Information</h1>
      <div className="space-y-3 max-w-xl">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={resume.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={resume.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <textarea
          name="profile"
          rows="3"
          placeholder="Profile Summary"
          value={resume.profile}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        ></textarea>
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={resume.skills}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        />
      </div>
    </div>
  );
}
