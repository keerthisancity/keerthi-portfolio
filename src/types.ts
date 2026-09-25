export interface Bio {
  bioID: number
  fullName: string
  shortName: string
  title: string
  email: string
  phone: string
  summary: string
  aboutMe: string
  linkedIn: string
  gitHub: string
  portfolioURL: string
  resumeUrl: string
  location: string
}
export interface Skill { id?: number; name: string; category?: string; proficiency?: number }
export interface Experience { id?: number; company: string; role: string; startDate?: string; endDate?: string | null; description?: string; location?: string; logoUrl?: string }
export interface Education { id?: number; institution: string; degree: string; field?: string; startDate?: string; endDate?: string; description?: string }
export interface Project { id?: number; title: string; description?: string; imageUrl?: string; technologies?: string[]; liveUrl?: string; sourceUrl?: string; startDate?: string; endDate?: string }
export interface Achievement { id?: number; title: string; description?: string; date?: string; issuer?: string; link?: string }
