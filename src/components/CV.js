import * as React from "react"
import { Download } from "lucide-react"

const experience = [
  {
    period: "2024 - Today",
    role: "Co-founder & Outreach Director",
    institution: "Ligia - UFPE's Academic League of Artificial Intelligence",
    location: "Recife, PE",
  },
  {
    period: "2025",
    role: "Machine Learning Engineer",
    institution: "Freelancer",
    location: "Recife, PE",
  },
  {
    period: "2023–2024",
    role: "Data Scientist",
    institution: "redduo.ai",
    location: "Recife, PE",
  },
  {
    period: "2023–2024",
    role: "Undergraduate Research Assistant",
    institution: "National Institute of Software Engineering",
    location: "Remote/Recife, PE",
  },
]

const education = [
  {
    period: "2025 – Today",
    degree: "B.Sc. in Information Systems",
    institution: "Federal University of Pernambuco",
    location: "Recife, PE",
  },
  {
    period: "2022-2025",
    degree: "B.Sc. in Statistics (Transferred)",
    institution: "Federal University of Pernambuco",
    location: "Recife, PE",
  },
]

const teaching = [
  {
    course: "Introduction to Deep Learning",
    institution: "UFPE",
    roles: [
      { period: "2025", role: "Head Teaching Assistant" },
      { period: "2024", role: "Teaching Assistant" },
    ],
  },
  {
    course: "Computational Creativity",
    institution: "UFPE",
    roles: [
      { period: "2024–2025", role: "Teaching Assistant" },
    ],
  },
]

const awards = [
  {
    year: "2025",
    title: "Cohere Labs Catalyst Grants Program",
    venue: "Cohere Labs",
  },
]

const extracurricular = [
  {
    role: "Co-founder & Outreach Director",
    activity: "Ligia - UFPE's Academic League of Artificial Intelligence",
    description: "The league is a non‐profit initiative advised by professors from the CIn.AI research group at the Federal University of Pernambuco. Our mission is to promoting AI knowledge and projects among students through workshops, hackathons, and collaborative research.",
  },
  {
    role: "Co-organizer",
    activity: "II Advanced Summer School of Responsible AutoML",
    description: "Event made by the Center for Informatics (UFPE) and the Engineering Faculty of the University of Porto",
  },
  {
    role: "Volunteer",
    activity: "Vibe Hack",
    description: "Recife's 1st hackathon focused on vibe coding technology.",
  },
]

const skills = {
  "Programming Languages": ["Python", "R", "C++", "SQL"],
  "ML & Data Science": ["PyTorch", "JAX", "Scikit-Learn", "Keras", "Lightning", "NumPy", "Pandas", "Polars", "OpenCV"],
  "Data Visualization": ["Matplotlib", "Seaborn", "PowerBI"],
  "SWE & MLOps": ["FastAPI", "Django", "PostgreSQL", "Redis", "MLflow", "Weights & Biases"],
  "Tools & Platforms": ["AWS", "Docker", "Git", "Linux"],
}

const CVSection = ({ title, items, type }) => {
  return (
    <div className="mb-12 last:mb-0">
      <h3 className="font-display text-lg text-charcoal mb-6 pb-2 border-b-2 border-dashed border-light-gray">
        {">"} {title}
      </h3>
      {type === "experience" && (
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_140px] gap-6">
              <div>
                <p className="font-body font-medium text-charcoal text-base">{item.role}</p>
                <p className="text-medium-gray text-sm">{item.institution}</p>
                <p className="text-sm text-medium-gray">{item.location}</p>
              </div>
              <span className="text-sm text-medium-gray text-right font-body">{item.period}</span>
            </div>
          ))}
        </div>
      )}
      {type === "education" && (
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_140px] gap-6">
              <div>
                <p className="font-body font-medium text-charcoal text-base">{item.degree}</p>
                <p className="text-medium-gray text-sm">{item.institution}</p>
                <p className="text-sm text-medium-gray">{item.location}</p>
              </div>
              <span className="text-sm text-medium-gray text-right font-body">{item.period}</span>
            </div>
          ))}
        </div>
      )}
      {type === "teaching" && (
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index}>
              <p className="font-body font-medium text-charcoal text-base">{item.course}</p>
              <p className="text-sm text-medium-gray mb-2">{item.institution}</p>
              <div className="space-y-1 pl-4 border-l-2 border-light-gray">
                {item.roles.map((r, i) => (
                  <div key={i} className="flex items-baseline justify-between">
                    <p className="text-sm text-medium-gray">{r.role}</p>
                    <span className="text-sm text-medium-gray font-body">{r.period}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {type === "awards" && (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_80px] gap-6">
              <div>
                <p className="font-body font-medium text-charcoal text-base">{item.title}</p>
                <p className="text-sm text-medium-gray">{item.venue}</p>
              </div>
              <span className="text-sm text-medium-gray text-right font-body">{item.year}</span>
            </div>
          ))}
        </div>
      )}
      {type === "extracurricular" && (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index}>
              <p className="font-body font-medium text-charcoal text-base">{item.role} — {item.activity}</p>
              <p className="text-sm text-medium-gray">{item.description}</p>
            </div>
          ))}
        </div>
      )}
      {type === "skills" && (
        <div className="space-y-6">
          {Object.entries(items).map(([category, skillList]) => (
            <div key={category} className="flex flex-col md:grid md:grid-cols-[180px_1fr] gap-2 md:gap-6">
              <span className="text-sm font-medium md:font-normal text-charcoal md:text-medium-gray font-body">{category}</span>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {skillList.map((skill) => (
                  <span key={skill} className="text-charcoal text-sm font-body">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const CV = () => {
  return (
    <section id="cv" className="py-20">
      <div className="section-container">
        <h2 className="section-title">Curriculum Vitae</h2>
        <div className="max-w-3xl">
          <CVSection title="Experience" items={experience} type="experience" />
          <CVSection title="Education" items={education} type="education" />
          <CVSection title="Teaching" items={teaching} type="teaching" />
          <CVSection title="Awards" items={awards} type="awards" />
          <CVSection title="Extracurricular" items={extracurricular} type="extracurricular" />
          <CVSection title="Skills" items={skills} type="skills" />
        </div>
        <div className="mt-8">
          <a href="/cv/cv.pdf" className="btn-secondary">
            <Download className="w-4 h-4" />
            Check Full CV
          </a>
        </div>
      </div>
    </section>
  )
}

export default CV
