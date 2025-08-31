import { NextResponse } from 'next/server'
import experienceData from '@/data/experience.json'
import academicData from '@/data/academic.json'

export async function GET() {
  try {
    // Format experience data for ATS compatibility
    const formattedExperience = experienceData.companies.flatMap(company => 
      company.roles.map(role => ({
        company: company.name,
        position: role.title,
        location: company.location,
        startDate: role.startDate,
        endDate: role.endDate,
        responsibilities: role.responsibilities,
        technologies: role.technologies
      }))
    );
    
    // Format education data for ATS compatibility
    const formattedEducation = academicData.institutions.flatMap(institution => 
      institution.degrees.map(degree => ({
        institution: institution.name,
        degree: degree.name,
        gpa: degree.gpa,
        location: institution.location,
        startDate: degree.startDate,
        endDate: degree.endDate,
        highlights: degree.highlights
      }))
    );
    
    // Combine the data from different JSON files to create a structured resume
    const resumeData = {
      personalInfo: {
        name: "Shafaat Jamil Nakib",
        title: "Frontend & UI/UX Developer",
        email: "shafaat@example.com",
        location: "Available for remote work",
        summary: "Frontend developer and UI/UX designer with expertise in modern web technologies and creating engaging user experiences."
      },
      education: formattedEducation,
      experience: formattedExperience,
      skills: experienceData.skills,
      certifications: experienceData.certifications,
      publications: academicData.publications,
      research: academicData.researchProjects
    }
    
    // Return the structured data for ATS compatibility
    return NextResponse.json(resumeData)
    
  } catch (error) {
    console.error("Resume API error:", error)
    return NextResponse.json(
      { error: "Failed to retrieve resume data" },
      { status: 500 }
    )
  }
}
