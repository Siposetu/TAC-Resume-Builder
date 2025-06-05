import React from 'react';
import { improveResume, generateSummary } from '../lib/gemini';

interface ResumeFormProps {
  data: any;
  onChange: (data: any) => void;
  onTemplateChange: (template: number) => void;
  selectedTemplate: number;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ 
  data, 
  onChange, 
  onTemplateChange,
  selectedTemplate 
}) => {
  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { company: '', position: '', duration: '', description: '' }
      ]
    });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        { school: '', degree: '', year: '' }
      ]
    });
  };

  const addSkill = () => {
    onChange({
      ...data,
      skills: [...data.skills, '']
    });
  };

  const handleImproveDescription = async (index: number) => {
    const improved = await improveResume(data.experience[index].description);
    const newExp = [...data.experience];
    newExp[index] = { ...newExp[index], description: improved };
    onChange({ ...data, experience: newExp });
  };

  const handleGenerateSummary = async () => {
    const experiences = data.experience.map((exp: any) => exp.description);
    const summary = await generateSummary(experiences);
    onChange({ ...data, summary });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Template</label>
        <select
          value={selectedTemplate}
          onChange={(e) => onTemplateChange(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value={1}>Modern</option>
          <option value={2}>Classic</option>
          <option value={3}>Minimalist</option>
          <option value={4}>Professional</option>
          <option value={5}>Creative</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => onChange({ ...data, fullName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
          <button
            type="button"
            onClick={handleGenerateSummary}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Generate with AI
          </button>
        </div>
        <textarea
          value={data.summary}
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Experience</label>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => {
                const newExp = [...data.experience];
                newExp[index] = { ...exp, company: e.target.value };
                onChange({ ...data, experience: newExp });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Position"
              value={exp.position}
              onChange={(e) => {
                const newExp = [...data.experience];
                newExp[index] = { ...exp, position: e.target.value };
                onChange({ ...data, experience: newExp });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => {
                const newExp = [...data.experience];
                newExp[index] = { ...exp, duration: e.target.value };
                onChange({ ...data, experience: newExp });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <div className="relative">
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => {
                  const newExp = [...data.experience];
                  newExp[index] = { ...exp, description: e.target.value };
                  onChange({ ...data, experience: newExp });
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => handleImproveDescription(index)}
                className="absolute right-2 bottom-2 text-sm text-indigo-600 hover:text-indigo-500"
              >
                Improve with AI
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addExperience}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          + Add Experience
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Education</label>
        {data.education.map((edu: any, index: number) => (
          <div key={index} className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="School"
              value={edu.school}
              onChange={(e) => {
                const newEdu = [...data.education];
                newEdu[index] = { ...edu, school: e.target.value };
                onChange({ ...data, education: newEdu });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
                const newEdu = [...data.education];
                newEdu[index] = { ...edu, degree: e.target.value };
                onChange({ ...data, education: newEdu });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Year"
              value={edu.year}
              onChange={(e) => {
                const newEdu = [...data.education];
                newEdu[index] = { ...edu, year: e.target.value };
                onChange({ ...data, education: newEdu });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addEducation}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          + Add Education
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skills</label>
        {data.skills.map((skill: string, index: number) => (
          <input
            key={index}
            type="text"
            value={skill}
            onChange={(e) => {
              const newSkills = [...data.skills];
              newSkills[index] = e.target.value;
              onChange({ ...data, skills: newSkills });
            }}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        ))}
        <button
          type="button"
          onClick={addSkill}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          + Add Skill
        </button>
      </div>
    </div>
  );
};

export default ResumeForm;