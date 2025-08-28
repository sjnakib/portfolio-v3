import { NextResponse } from 'next/server'
import experienceData from '@/data/experience.json'
import academicData from '@/data/academic.json'

export async function GET() {
  try {
    // Combine the data from different JSON files to create a structured resume
    const resumeData = {
      personalInfo: {
        name: "Shafaat Jamil Nakib",
        title: "Full-stack & Robotics Engineer",
        email: "shafaat@example.com",
        location: "Available for remote work",
        summary: "Full-stack developer and robotics engineer with expertise in modern web technologies and autonomous systems."
      },
      education: academicData.education,
      experience: experienceData.experiences,
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
