import React from 'react';

const Template3: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <header className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-light tracking-wide text-gray-900">{data.fullName}</h1>
          <div className="mt-2 text-gray-600">
            <p className="text-sm">{data.email}</p>
            <p className="text-sm">{data.phone}</p>
          </div>
        </div>
      </header>

      <section className="mb-8">
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-light tracking-wide text-gray-900 mb-4">Experience</h2>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-xl text-gray-800">{exp.position}</h3>
              <span className="text-gray-600 text-sm">{exp.duration}</span>
            </div>
            <p className="text-gray-700 mb-2">{exp.company}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-light tracking-wide text-gray-900 mb-4">Education</h2>
        {data.education.map((edu: any, index: number) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl text-gray-800">{edu.degree}</h3>
              <span className="text-gray-600 text-sm">{edu.year}</span>
            </div>
            <p className="text-gray-700">{edu.school}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-light tracking-wide text-gray-900 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-4">
          {data.skills.map((skill: string, index: number) => (
            <span
              key={index}
              className="text-sm text-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Template3;