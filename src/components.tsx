import type { ReactNode } from 'react'
import { RefreshCw, ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import type { Skill, Experience, Education, Project, Achievement } from './types'

const formatDate = (date?: string | null) => {
  if (!date) return 'Present'
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? date : parsed.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
const formatAchievementDate = (date?: string) => {
  if (!date) return ''
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? date : parsed.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function SectionError({ retry }: { retry: () => void }) { return <div className="section-error"><p>We couldn't retrieve this information.</p><button onClick={retry}><RefreshCw size={16}/> Try again</button></div> }
export function Skeleton({ lines = 3 }: { lines?: number }) { return <div className="skeleton">{Array.from({ length: lines }, (_, i) => <span key={i}/>)}</div> }
export function Section({ id, eyebrow, title, children }: { id?: string; eyebrow: string; title: string; children: ReactNode }) { return <section id={id} className="section"><div className="section-heading"><span>{eyebrow}</span><h2>{title}</h2></div>{children}</section> }
export function Timeline({ items, education = false, compact = false }: { items: Experience[] | Education[]; education?: boolean; compact?: boolean }) { return <div className={`timeline${education ? ' timeline-education' : ''}${compact ? ' timeline-compact' : ''}`}>{items.map((item, i) => { const experience = item as Experience; const company = education ? (item as Education).institution : experience.company; return <article className="timeline-item" key={item.id ?? i}><div className="timeline-dot"/>{!education && <div className="company-logo" aria-hidden="true">{experience.logoUrl ? <img src={experience.logoUrl} alt="" onError={event => { event.currentTarget.hidden = true }} /> : company.slice(0, 2).toUpperCase()}</div>}<div className="timeline-content"><p className="timeline-date">{formatDate(item.startDate)} — {formatDate(item.endDate)}</p><h3>{education ? (item as Education).degree : experience.role}</h3><h4>{company}</h4><p>{item.description}</p></div></article> })}</div> }
export function SkillCloud({ skills }: { skills: Skill[] }) { const uniqueSkills = skills.filter((skill, index, list) => index === list.findIndex(other => other.name.trim().toLowerCase() === skill.name.trim().toLowerCase())); return <div className="skill-grid">{uniqueSkills.map((skill, i) => <div className="skill" key={skill.id ?? i}><div className="skill-top"><strong>{skill.name}</strong><span>{skill.proficiency ? `${skill.proficiency}%` : skill.category}</span></div><div className="bar"><i style={{ width: `${skill.proficiency ?? 75}%` }}/></div></div>)}</div> }
export function ProjectCard({ project, index }: { project: Project; index: number }) { return <article className="project-card">{project.imageUrl && <img className="project-image" src={project.imageUrl} alt={`${project.title} preview`} loading="lazy" />}<div className="project-content"><span className="project-number">{String(index + 1).padStart(2, '0')}</span><h3>{project.title}</h3><p>{project.description}</p><p className="project-tech">{project.technologies?.join(' · ')}</p><div className="project-links">{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">View project <ArrowUpRight size={14}/></a>}{project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noreferrer" aria-label="View source"><Github size={16}/></a>}</div></div></article> }
export function AchievementList({ items }: { items: Achievement[] }) { return <div className="achievement-list">{items.map((a, i) => <article key={a.id ?? i}><div className="achievement-mark">✦</div><div><h3>{a.title}</h3><p>{a.description || a.issuer}</p><small>{formatAchievementDate(a.date)}</small></div>{a.link && <a href={a.link} target="_blank" rel="noreferrer" aria-label={`Open ${a.title}`}><ExternalLink size={17}/></a>}</article>)}</div> }
