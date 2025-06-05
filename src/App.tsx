import { generateResumeContent } from './lib/gemini'; // adjust path if needed
import React, { useState } from 'react';
import { usePDF } from 'react-to-pdf';
import { Document, Packer, Paragraph } from 'docx';
import { saveAs } from 'file-saver';
import ResumeForm from './components/ResumeForm';
import Template1 from './templates/Template1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';
import Template4 from './templates/Template4';
import Template5 from './templates/Template5';

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    year: string;
  }>;
  skills: string[];
}

const initialData: ResumeData = {
  fullName: '',
  email: '',
  phone: '',
  summary: '',
  experience: [],
  education: [],
  skills: []
};

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const { toPDF, targetRef } = usePDF({ filename: 'resume.pdf' });

  const templates = {
    1: Template1,
    2: Template2,
    3: Template3,
    4: Template4,
    5: Template5
  };

  const SelectedTemplate = templates[selectedTemplate as keyof typeof templates];

  const exportToDocx = () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({ text: resumeData.fullName }),
          new Paragraph({ text: resumeData.email }),
          new Paragraph({ text: resumeData.phone }),
          new Paragraph({ text: resumeData.summary })
        ]
      }]
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, 'resume.docx');
    });
  };

  const exportToHtml = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resumeData.fullName}'s Resume</title>
        </head>
        <body>
          ${targetRef.current?.innerHTML || ''}
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    saveAs(blob, 'resume.html');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Resume Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <ResumeForm 
              data={resumeData} 
              onChange={setResumeData}
              onTemplateChange={setSelectedTemplate}
              selectedTemplate={selectedTemplate}
            />
    <div className="mt-6 flex flex-col gap-4">
  <button
    onClick={async () => {
      const prompt = `
        Write a professional summary for a ${resumeData.fullName || 'UX Designer'} 
        with experience in ${resumeData.skills.join(", ") || "Figma and usability testing"}.
        Make it 3 sentences and suitable for a resume.
      `;
      const aiSummary = await generateResumeContent(prompt);
      setResumeData(prev => ({ ...prev, summary: aiSummary }));
    }}
    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
  >
    ✨ AI Generate Summary
  </button>

  <div className="flex gap-4">
    <button
      onClick={() => toPDF()}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Export PDF
    </button>
    <button
      onClick={exportToDocx}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Export DOCX
    </button>
    <button
      onClick={exportToHtml}
      className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
    >
      Export HTML
    </button>
  </div>
</div>

  );
}

          <div className="bg-white rounded-lg shadow p-6" ref={targetRef}>
            <SelectedTemplate data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

