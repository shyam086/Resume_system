import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./index.css";

function App() {
  const [resume, setResume] = useState(() => {
    const saved = localStorage.getItem("resumeData");
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          title: "",
          profile: "",
          skills: "",
          experience: [],
          education: [],
          photo: "",
          template: "modern",
        };
  });

  const [exp, setExp] = useState({ role: "", company: "", year: "" });
  const [edu, setEdu] = useState({ degree: "", school: "", year: "" });

  // ✅ Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resume));
  }, [resume]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResume({ ...resume, [name]: value });
  };

  // ✅ Add Experience
  const addExperience = () => {
    if (exp.role && exp.company) {
      setResume({
        ...resume,
        experience: [...resume.experience, exp],
      });
      setExp({ role: "", company: "", year: "" });
    }
  };

  // ✅ Remove Experience
  const removeExperience = (index) => {
    const newExp = resume.experience.filter((_, i) => i !== index);
    setResume({ ...resume, experience: newExp });
  };

  // ✅ Add Education
  const addEducation = () => {
    if (edu.degree && edu.school) {
      setResume({
        ...resume,
        education: [...resume.education, edu],
      });
      setEdu({ degree: "", school: "", year: "" });
    }
  };

  // ✅ Remove Education
  const removeEducation = (index) => {
    const newEdu = resume.education.filter((_, i) => i !== index);
    setResume({ ...resume, education: newEdu });
  };

  // ✅ Upload Profile Photo
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setResume({ ...resume, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // ✅ Template Change
  const changeTemplate = (template) => {
    setResume({ ...resume, template });
  };

  // ✅ PDF Download
  const downloadPDF = async () => {
    const resumeElement = document.getElementById("resume-preview");
    const canvas = await html2canvas(resumeElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resume.name || "resume"}.pdf`);
  };

  // ✅ Template Styles
  const getTemplateStyles = () => {
    switch (resume.template) {
      case "classic":
        return "bg-white text-black border border-gray-300";
      case "minimalist":
        return "bg-gray-50 text-gray-800";
      default:
        return "bg-white text-gray-800 shadow";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold p-6 border-b border-blue-700">
            Resume Builder
          </h2>

          {/* Template Selector */}
          <div className="p-4 space-y-2">
            <p className="text-sm mb-2 text-gray-300">🎨 Select Template</p>
            {["modern", "classic", "minimalist"].map((t) => (
              <button
                key={t}
                onClick={() => changeTemplate(t)}
                className={`w-full py-2 rounded-lg text-sm capitalize ${
                  resume.template === t
                    ? "bg-white text-blue-900 font-bold"
                    : "bg-blue-800 hover:bg-blue-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-blue-800">
          <button
            onClick={downloadPDF}
            className="w-full bg-white text-blue-900 font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
          >
            📄 Download PDF
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="flex justify-between items-center bg-white px-8 py-4 border-b">
          <h1 className="text-lg font-semibold text-gray-800">
            Resume Editor
          </h1>
          <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        </header>

        <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ✅ Resume Preview */}
          <section
            id="resume-preview"
            className={`${getTemplateStyles()} rounded-xl p-8 overflow-auto`}
          >
            <div className="text-center">
              {resume.photo ? (
                <img
                  src={resume.photo}
                  alt="Profile"
                  className="mx-auto w-24 h-24 rounded-full object-cover mb-3"
                />
              ) : (
                <div className="mx-auto w-24 h-24 rounded-full bg-gray-200 mb-3"></div>
              )}
              <h2 className="text-2xl font-bold">{resume.name}</h2>
              <p className="text-blue-600">{resume.title}</p>
            </div>

            <div className="mt-6 text-left space-y-5">
              <div>
                <h3 className="font-bold">Profile</h3>
                <p>{resume.profile}</p>
              </div>

              <div>
                <h3 className="font-bold">Experience</h3>
                {resume.experience.length === 0 && (
                  <p className="text-sm text-gray-500">No experience added.</p>
                )}
                {resume.experience.map((item, i) => (
                  <div key={i} className="border-l-2 pl-3 mb-2">
                    <p className="font-medium">
                      {item.role} - {item.company}
                    </p>
                    <p className="text-xs text-gray-500">{item.year}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-bold">Education</h3>
                {resume.education.length === 0 && (
                  <p className="text-sm text-gray-500">No education added.</p>
                )}
                {resume.education.map((item, i) => (
                  <div key={i} className="border-l-2 pl-3 mb-2">
                    <p className="font-medium">{item.degree}</p>
                    <p className="text-xs text-gray-500">
                      {item.school} ({item.year})
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-bold">Skills</h3>
                <p>{resume.skills}</p>
              </div>
            </div>
          </section>

          {/* ✅ Form Editor */}
          <section className="bg-white rounded-xl shadow p-8">
            <h2 className="text-xl font-semibold mb-4">Edit Resume</h2>

            {/* Basic Info */}
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={resume.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="text"
                name="title"
                value={resume.title}
                onChange={handleChange}
                placeholder="Job Title"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <textarea
                name="profile"
                rows="3"
                value={resume.profile}
                onChange={handleChange}
                placeholder="Profile Summary"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              ></textarea>
              <input
                type="text"
                name="skills"
                value={resume.skills}
                onChange={handleChange}
                placeholder="Skills (comma separated)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            {/* Experience */}
            <div className="mt-6">
              <h3 className="font-bold mb-2">Experience</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Role"
                  value={exp.role}
                  onChange={(e) => setExp({ ...exp, role: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => setExp({ ...exp, company: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Year (e.g. 2021-2024)"
                  value={exp.year}
                  onChange={(e) => setExp({ ...exp, year: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <button
                  onClick={addExperience}
                  className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700"
                >
                  + Add Experience
                </button>

                {resume.experience.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded"
                  >
                    <span className="text-sm">
                      {item.role} @ {item.company}
                    </span>
                    <button
                      onClick={() => removeExperience(i)}
                      className="text-red-500 text-xs"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mt-6">
              <h3 className="font-bold mb-2">Education</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => setEdu({ ...edu, degree: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="School / University"
                  value={edu.school}
                  onChange={(e) => setEdu({ ...edu, school: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Year (e.g. 2018-2022)"
                  value={edu.year}
                  onChange={(e) => setEdu({ ...edu, year: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <button
                  onClick={addEducation}
                  className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700"
                >
                  + Add Education
                </button>

                {resume.education.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded"
                  >
                    <span className="text-sm">
                      {item.degree} - {item.school}
                    </span>
                    <button
                      onClick={() => removeEducation(i)}
                      className="text-red-500 text-xs"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
