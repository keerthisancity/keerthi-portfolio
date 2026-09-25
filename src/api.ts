import axios from 'axios'
import type { Bio, Skill, Experience, Education, Project, Achievement } from './types'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
export const api = axios.create({ baseURL: apiBaseUrl, timeout: 10000, headers: { Accept: 'application/json' } })
export const endpoints = {
  bio: '/bio', skills: '/skills', experience: '/experience', education: '/education', projects: '/projects', achievements: '/achievements',
}
const asRecord = (value: unknown): Record<string, unknown> => (typeof value === 'object' && value !== null ? value as Record<string, unknown> : {})
const value = (record: Record<string, unknown>, ...keys: string[]) => keys.map(key => record[key]).find(item => item !== undefined && item !== null)
const text = (record: Record<string, unknown>, ...keys: string[]) => String(value(record, ...keys) ?? '')
const number = (record: Record<string, unknown>, ...keys: string[]) => Number(value(record, ...keys) ?? 0)

export const getBio = () => api.get<unknown>(endpoints.bio).then(r => {
  const item = asRecord(r.data)
  return { bioID: number(item, 'bioID', 'id'), fullName: text(item, 'fullName', 'name'), shortName: text(item, 'shortName'), title: text(item, 'title'), email: text(item, 'email'), phone: text(item, 'phone'), aboutMe: text(item, 'aboutMe'), summary: text(item, 'summary'), linkedIn: text(item, 'linkedIn', 'linkedin'), gitHub: text(item, 'gitHub', 'github'), portfolioURL: text(item, 'portfolioURL', 'portfolioUrl'), resumeUrl: text(item, 'resumeUrl', 'ResumeUrl'), location: text(item, 'location') } satisfies Bio
})
export const getSkills = () => api.get<unknown[]>(endpoints.skills).then(r => r.data.flatMap((entry, index) => {
  if (typeof entry === 'string') {
    const [category, values = ''] = entry.split(':')
    return values.split(',').map((name, valueIndex) => ({ id: index * 100 + valueIndex, name: name.trim(), category: category.trim() })).filter(skill => skill.name)
  }
  const item = asRecord(entry)
  const skillName = text(item, 'name', 'skillName', 'technology')
  const category = text(item, 'category')
  const [embeddedCategory, values = ''] = skillName.split(':')
  const parsedCategory = values ? embeddedCategory.trim() : category
  return (values ? values.split(',') : [skillName])
    .map((name, valueIndex) => ({ id: (number(item, 'skillID', 'id') || index) * 100 + valueIndex, name: name.trim(), category: parsedCategory, proficiency: undefined }))
    .filter(skill => skill.name)
}))
const companyLogo = (company: string) => {
  const normalized = company.toLowerCase()
  if (normalized.includes('grant thornton')) return '/logos/grant-thornton.png'
  if (normalized.includes('d2l')) return '/logos/d2l.png'
  if (normalized.includes('neory')) return '/logos/neory.png'
  return undefined
}
export const getExperience = () => api.get<Record<string, unknown>[]>(endpoints.experience).then(r => r.data.map((item, index) => { const company = text(item, 'company', 'companyName', 'organization'); return { id: number(item, 'experienceID', 'id') || index, company, role: text(item, 'role', 'jobTitle', 'position'), startDate: text(item, 'startDate', 'fromDate'), endDate: value(item, 'endDate', 'toDate') as string | null | undefined, description: text(item, 'description', 'responsibilities'), location: text(item, 'location'), logoUrl: companyLogo(company) } }))
export const getEducation = () => api.get<Record<string, unknown>[]>(endpoints.education).then(r => r.data.map((item, index) => ({ id: number(item, 'educationID', 'id') || index, institution: text(item, 'institution', 'school', 'university'), degree: text(item, 'degree'), field: text(item, 'field', 'fieldOfStudy', 'major'), startDate: text(item, 'startDate', 'fromDate'), endDate: text(item, 'endDate', 'toDate'), description: text(item, 'description') })))
export const getProjects = () => api.get<Record<string, unknown>[]>(endpoints.projects).then(r => r.data.map((item, index) => ({ id: number(item, 'projectID', 'id') || index, title: text(item, 'title', 'name'), description: text(item, 'description'), technologies: text(item, 'technologies', 'technology', 'techStack').split(',').map(item => item.trim()).filter(Boolean), liveUrl: text(item, 'projectURL', 'projectUrl', 'liveUrl') || undefined, sourceUrl: text(item, 'repoURL', 'repoUrl', 'sourceUrl') || undefined, startDate: text(item, 'startDate'), endDate: text(item, 'endDate') })))
export const getAchievements = () => api.get<Record<string, unknown>[]>(endpoints.achievements).then(r => r.data.map((item, index) => ({ id: number(item, 'achievementID', 'id') || index, title: text(item, 'title', 'name'), description: text(item, 'description'), date: text(item, 'date', 'dateAchieved', 'achievementDate'), issuer: text(item, 'issuer') })))
