import React from 'react';

const Template5: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 bg-gray-100 p-6 rounded-lg">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.fullName}</h1>
            <div className="text-sm text-gray-600">
              <p>{data.email}</p>
              <p>{data.phone}</p>
            </div>
          </header>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
            <div className="space-y-2">
              {data.skills.map((skill: string, index: number) => (
                <div
                  key={index}
                  className="text-sm text-gray-700"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Education</h2>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="mb-4">
                <h3 className="text-sm font-medium text-gray-900">{edu.degree}</h3>
                <p className="text-sm text-gray-600">{edu.school}</p>
                <p className="text-sm text-gray-500">{edu.year}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="col-span-2">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Summary</h2>
            <p className="text-gray-700">{data.summary}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600">{exp.duration}</span>
                </div>
                <p className="text-gray-800 mb-2">{exp.company}</p>
                <p className="text-gray-600">{exp.description}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Template5;