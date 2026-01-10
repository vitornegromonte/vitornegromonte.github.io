import * as React from "react"

const teaching = [
  {
    period: "2024",
    role: "Teaching Assistant",
    course: "Introduction to Machine Learning",
    institution: "MIT",
  },
  {
    period: "2023",
    role: "Guest Lecturer",
    course: "Deep Learning for NLP",
    institution: "Stanford University",
  },
  {
    period: "2022–2023",
    role: "Course Instructor",
    course: "Python for Data Science",
    institution: "Online (Coursera)",
  },
]

const awards = [
  {
    year: "2024",
    title: "Best Paper Award",
    venue: "NeurIPS 2024",
  },
  {
    year: "2023",
    title: "Outstanding Reviewer",
    venue: "ACL 2023",
  },
  {
    year: "2022",
    title: "Google Research Scholar",
    venue: "Google",
  },
  {
    year: "2019",
    title: "Best Dissertation Award",
    venue: "MIT CSAIL",
  },
]

const extracurricular = [
  {
    role: "Organizer",
    activity: "ML Reading Group",
    description: "Weekly paper discussions on recent ML advances",
  },
  {
    role: "Mentor",
    activity: "AI4ALL",
    description: "Mentoring underrepresented students in AI",
  },
  {
    role: "Volunteer",
    activity: "Code.org",
    description: "Teaching coding to K-12 students",
  },
]

const Misc = () => {
  return (
    <section id="misc" className="py-20 border-t border-light-gray">
      <div className="section-container">
        <h2 className="section-title">Miscellaneous</h2>
        <div className="max-w-3xl space-y-12">
          {/* Teaching */}
          <div>
            <h3 className="font-display font-semibold text-lg text-charcoal mb-6 pb-2 border-b border-light-gray">
              Teaching
            </h3>
            <div className="space-y-4">
              {teaching.map((item, index) => (
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
          </div>

          {/* Awards */}
          <div>
            <h3 className="font-display font-semibold text-lg text-charcoal mb-6 pb-2 border-b border-light-gray">
              Awards
            </h3>
            <div className="space-y-4">
              {awards.map((item, index) => (
                <div key={index} className="grid grid-cols-[1fr_80px] gap-6">
                  <div>
                    <p className="font-medium text-charcoal">{item.title}</p>
                    <p className="text-sm text-medium-gray">{item.venue}</p>
                  </div>
                  <span className="text-sm text-medium-gray text-right">{item.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Extracurricular */}
          <div>
            <h3 className="font-display font-semibold text-lg text-charcoal mb-6 pb-2 border-b border-light-gray">
              Extracurricular
            </h3>
            <div className="space-y-4">
              {extracurricular.map((item, index) => (
                <div key={index}>
                  <p className="font-medium text-charcoal">{item.role} — {item.activity}</p>
                  <p className="text-sm text-medium-gray">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Misc
