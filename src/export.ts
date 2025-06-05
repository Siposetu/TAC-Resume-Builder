import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '../types';

// Export resume to PDF
export const exportToPDF = async (resumeRef: React.RefObject<HTMLDivElement>, resumeData: ResumeData): Promise<void> => {
  if (!resumeRef.current) return;

  try {
    // Create a canvas from the resume div
    const canvas = await html2canvas(resumeRef.current, {
      scale: 2, // Increase resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Calculate PDF dimensions based on canvas aspect ratio
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw new Error('Failed to export resume as PDF');
  }
};

// Export resume to DOCX
export const exportToDOCX = async (resumeData: ResumeData): Promise<void> => {
  try {
    const { personalInfo, experiences, educations, skillCategories } = resumeData;
    
    // Create a new document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Header with name and contact info
            new Paragraph({
              text: `${personalInfo.firstName} ${personalInfo.lastName}`,
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 200,
              },
            }),
            
            new Paragraph({
              text: personalInfo.title,
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 200,
              },
            }),
            
            new Paragraph({
              children: [
                new TextRun({ text: `${personalInfo.email} | ${personalInfo.phone}` }),
                new TextRun({ text: ` | ${personalInfo.city}, ${personalInfo.state}` }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 400,
              },
            }),
            
            // Summary
            new Paragraph({
              text: 'PROFESSIONAL SUMMARY',
              heading: HeadingLevel.HEADING_2,
              thematicBreak: true,
              spacing: {
                after: 200,
              },
            }),
            
            new Paragraph({
              text: personalInfo.summary,
              spacing: {
                after: 400,
              },
            }),
            
            // Experience
            new Paragraph({
              text: 'PROFESSIONAL EXPERIENCE',
              heading: HeadingLevel.HEADING_2,
              thematicBreak: true,
              spacing: {
                after: 200,
              },
            }),
            
            ...experiences.flatMap(experience => [
              new Paragraph({
                text: experience.position,
                heading: HeadingLevel.HEADING_3,
                spacing: {
                  after: 100,
                },
              }),
              
              new Paragraph({
                children: [
                  new TextRun({ text: experience.company, bold: true }),
                  new TextRun({ text: ` | ${experience.location} | ` }),
                  new TextRun({ 
                    text: `${experience.startDate} - ${experience.current ? 'Present' : experience.endDate}`
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
              
              new Paragraph({
                text: experience.description,
                spacing: {
                  after: 200,
                },
              }),
              
              ...experience.achievements.map(achievement => 
                new Paragraph({
                  text: `• ${achievement}`,
                  spacing: {
                    after: 100,
                  },
                })
              ),
              
              new Paragraph({
                text: '',
                spacing: {
                  after: 200,
                },
              }),
            ]),
            
            // Education
            new Paragraph({
              text: 'EDUCATION',
              heading: HeadingLevel.HEADING_2,
              thematicBreak: true,
              spacing: {
                after: 200,
              },
            }),
            
            ...educations.flatMap(education => [
              new Paragraph({
                text: education.degree,
                heading: HeadingLevel.HEADING_3,
                spacing: {
                  after: 100,
                },
              }),
              
              new Paragraph({
                children: [
                  new TextRun({ text: education.institution, bold: true }),
                  new TextRun({ text: ` | ${education.location} | ` }),
                  new TextRun({ 
                    text: `${education.startDate} - ${education.current ? 'Present' : education.endDate}`
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
              
              new Paragraph({
                text: education.description,
                spacing: {
                  after: 200,
                },
              }),
            ]),
            
            // Skills
            new Paragraph({
              text: 'SKILLS',
              heading: HeadingLevel.HEADING_2,
              thematicBreak: true,
              spacing: {
                after: 200,
              },
            }),
            
            ...skillCategories.flatMap(category => [
              new Paragraph({
                text: category.name,
                heading: HeadingLevel.HEADING_3,
                spacing: {
                  after: 100,
                },
              }),
              
              new Paragraph({
                text: category.skills.map(skill => skill.name).join(', '),
                spacing: {
                  after: 200,
                },
              }),
            ]),
          ],
        },
      ],
    });
    
    // Generate the document as a Blob instead of Buffer
    const blob = await Packer.toBlob(doc);
    
    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${personalInfo.firstName}_${personalInfo.lastName}_Resume.docx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error exporting to DOCX:', error);
    throw new Error('Failed to export resume as DOCX');
  }
};

// Export resume to HTML
export const exportToHTML = (resumeRef: React.RefObject<HTMLDivElement>, resumeData: ResumeData): void => {
  if (!resumeRef.current) return;

  try {
    // Clone the resume div
    const resumeClone = resumeRef.current.cloneNode(true) as HTMLElement;
    
    // Create a new HTML document
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} - Resume</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          ${window.getComputedStyle(resumeRef.current).cssText}
        </style>
      </head>
      <body>
        ${resumeClone.outerHTML}
      </body>
      </html>
    `;
    
    // Create a blob and download link
    const blob = new Blob([html], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error exporting to HTML:', error);
    throw new Error('Failed to export resume as HTML');
  }
};