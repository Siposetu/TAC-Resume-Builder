import React from 'react';

const Template2: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <header className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-serif text-gray-900">{data.fullName}</h1>
        <div className="text-gray-600 mt-2 font-serif">
          <p>{data.email} • {data.phone}</p>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-serif text-gray-800 mb-3 border-b border-gray-200 pb-1">
          Professional Summary
        </h2>
        <p className="text-gray-700 font-serif">{data.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-serif text-gray-800 mb-3 border-b border-gray-200 pb-1">
          Professional Experience
        </h2>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-medium font-serif">{exp.position}</h3>
              <span className="text-gray-600 font-serif">{exp.duration}</span>
            </div>
            <p className="text-gray-700 font-serif">{exp.company}</p>
            <p className="mt-2 text-gray-600 font-serif">{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-serif text-gray-800 mb-3 border-b border-gray-200 pb-1">
          Education
        </h2>
        {data.education.map((edu: any, index: number) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-medium font-serif">{edu.degree}</h3>
              <span className="text-gray-600 font-serif">{edu.year}</span>
            </div>
            <p className="text-gray-700 font-serif">{edu.school}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-serif text-gray-800 mb-3 border-b border-gray-200 pb-1">
          Skills
        </h2>
        <div className="flex flex-wrap gap-3">
          {data.skills.map((skill: string, index: number) => (
            <span
              key={index}
              className="text-gray-700 font-serif"
            >
              • {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Template2;