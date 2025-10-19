import { useResume } from "../context/ResumeContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PreviewPage() {
  const { resume } = useResume();

  const downloadPDF = async () => {
    const input = document.getElementById("resume-preview");
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`${resume.name || "resume"}.pdf`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📄 Resume Preview</h1>
      <div
        id="resume-preview"
        className="bg-white p-8 rounded-lg shadow max-w-3xl mx-auto"
      >
        <div className="text-center mb-4">
          {resume.photo ? (
            <img
              src={resume.photo}
              alt="Profile"
              className="mx-auto w-24 h-24 rounded-full object-cover mb-3"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 mx-auto mb-3 rounded-full" />
          )}
          <h2 className="text-2xl font-bold">{resume.name || "Your Name"}</h2>
          <p className="text-blue-600">{resume.title || "Your Title"}</p>
        </div>

        <section className="text-left text-gray-700 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900">Profile</h3>
            <p>{resume.profile}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Experience</h3>
            {resume.experience.map((exp, i) => (
              <div key={i}>
                <p className="font-medium">
                  {exp.role} — {exp.company}
                </p>
                <p className="text-xs text-gray-500">{exp.year}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Education</h3>
            {resume.education.map((edu, i) => (
              <div key={i}>
                <p className="font-medium">{edu.degree}</p>
                <p className="text-xs text-gray-500">
                  {edu.school} ({edu.year})
                </p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Skills</h3>
            <p>{resume.skills}</p>
          </div>
        </section>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
