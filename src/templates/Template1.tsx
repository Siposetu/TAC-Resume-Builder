import React from 'react';

const Template1: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{data.fullName}</h1>
        <div className="text-gray-600 mt-2">
          <p>{data.email} | {data.phone}</p>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Professional Summary</h2>
        <p className="text-gray-600">{data.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Experience</h2>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-medium text-gray-800">{exp.position}</h3>
            <div className="text-gray-600">
              <p>{exp.company} | {exp.duration}</p>
              <p className="mt-2">{exp.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Education</h2>
        {data.education.map((edu: any, index: number) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-medium text-gray-800">{edu.degree}</h3>
            <p className="text-gray-600">{edu.school} | {edu.year}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill: string, index: number) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Template1;