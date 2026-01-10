import * as React from "react"
import { Download } from "lucide-react"

const experience = [
  {
    period: "2024–Present",
    role: "Co-founder & Outreach Director",
    institution: "Ligia - UFPE's Academic League of Artificial Intelligence",
    location: "Recife, PE",
  },
  {
    period: "2025-2025",
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
    period: "2025–Today",
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
    period: "2025",
    role: "Head Teaching Assistant",
    course: "Introduction to Deep Learning",
    institution: "UFPE",
  },
  {
    period: "2024",
    role: "Teaching Assistant",
    course: "Introduction to Deep Learning",
    institution: "UFPE",
  },
  {
    period: "2024-2025",
    role: "Teaching Assistant",
    course: "Computational Creativity",
    institution: "UFPE",
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
  "ML & Data Science": ["NumPy", "Pandas", "Polars", "Matplotlib", "Seaborn", "PyTorch", "JAX","Scikit-Learn", "Keras", "Lightining", "PowerBI", "OpenCV"],
  
  "SWE & MLOps": ["FastAPI", "Django", "PostgreSQL", "Redis", "MLflow", "Weights & Biases"],
  "Tools & Platforms": ["AWS", "Docker", "Git", "Linux"],
}

const CVSection = ({ title, items, type }) => {
  return (
    <div className="mb-12 last:mb-0">
      <h3 className="font-display font-semibold text-lg text-charcoal mb-6 pb-2 border-b border-light-gray">
        {title}
      </h3>
      {type === "experience" && (
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_140px] gap-6">
              <div>
                <p className="font-medium text-charcoal">{item.role}</p>
                <p className="text-medium-gray">{item.institution}</p>
                <p className="text-sm text-medium-gray">{item.location}</p>
              </div>
              <span className="text-sm text-medium-gray text-right">{item.period}</span>
            </div>
          ))}
        </div>
      )}
      {type === "education" && (
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_140px] gap-6">
              <div>
                <p className="font-medium text-charcoal">{item.degree}</p>
                <p className="text-medium-gray">{item.institution}</p>
                <p className="text-sm text-medium-gray">{item.location}</p>
              </div>
              <span className="text-sm text-medium-gray text-right">{item.period}</span>
            </div>
          ))}
        </div>
      )}
      {type === "teaching" && (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_100px] gap-6">
              <div>
                <p className="font-medium text-charcoal">{item.role}</p>
                <p className="text-medium-gray text-sm">{item.course}</p>
                <p className="text-sm text-medium-gray">{item.institution}</p>
              </div>
              <span className="text-sm text-medium-gray text-right">{item.period}</span>
            </div>
          ))}
        </div>
      )}
      {type === "awards" && (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_80px] gap-6">
              <div>
                <p className="font-medium text-charcoal">{item.title}</p>
                <p className="text-sm text-medium-gray">{item.venue}</p>
              </div>
              <span className="text-sm text-medium-gray text-right">{item.year}</span>
            </div>
          ))}
        </div>
      )}
      {type === "extracurricular" && (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index}>
              <p className="font-medium text-charcoal">{item.role} — {item.activity}</p>
              <p className="text-sm text-medium-gray">{item.description}</p>
            </div>
          ))}
        </div>
      )}
      {type === "skills" && (
        <div className="space-y-6">
          {Object.entries(items).map(([category, skillList]) => (
            <div key={category} className="flex flex-col md:grid md:grid-cols-[180px_1fr] gap-2 md:gap-6">
              <span className="text-sm font-medium md:font-normal text-charcoal md:text-medium-gray">{category}</span>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {skillList.map((skill) => (
                  <span key={skill} className="text-charcoal text-sm">
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
    <section id="cv" className="py-20 border-t border-light-gray">
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
