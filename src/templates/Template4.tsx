import React from 'react';

const Template4: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <header className="bg-gray-900 text-white p-6 -mx-8 -mt-8 mb-8">
        <h1 className="text-4xl font-bold">{data.fullName}</h1>
        <div className="mt-2 text-gray-300">
          <p>{data.email} | {data.phone}</p>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-8 h-0.5 bg-gray-900 mr-3"></span>
          Professional Summary
        </h2>
        <p className="text-gray-700">{data.summary}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-8 h-0.5 bg-gray-900 mr-3"></span>
          Experience
        </h2>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
            <div className="text-gray-600 mb-2">
              <span className="font-medium">{exp.company}</span> | {exp.duration}
            </div>
            <p className="text-gray-700">{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-8 h-0.5 bg-gray-900 mr-3"></span>
          Education
        </h2>
        {data.education.map((edu: any, index: number) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
            <div className="text-gray-600">
              <span className="font-medium">{edu.school}</span> | {edu.year}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-8 h-0.5 bg-gray-900 mr-3"></span>
          Skills
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {data.skills.map((skill: string, index: number) => (
            <div
              key={index}
              className="bg-gray-100 px-4 py-2 rounded"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Template4;