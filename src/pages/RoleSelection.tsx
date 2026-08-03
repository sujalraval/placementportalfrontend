import { useNavigate } from 'react-router-dom';
import { User, Briefcase, GraduationCap, Building } from 'lucide-react';

const ROLES = [
  {
    id: 'student',
    title: "I'm a Candidate",
    description: 'Compete, learn, mentor and apply for jobs and internships',
    icon: User,
    color: 'bg-[#FFF9EE]',
    iconColor: 'text-gold',
  },
  {
    id: 'recruiter',
    title: "I'm an Employer",
    description: 'Post jobs, hire talent and offer career opportunities',
    icon: Briefcase,
    color: 'bg-[#F0F6FF]',
    iconColor: 'text-[#0A66C2]', // matching the blue
  },
  {
    id: 'faculty',
    title: "I'm a Faculty",
    description: 'Guide students, monitor progress and approve applications',
    icon: GraduationCap,
    color: 'bg-[#F4F0FF]',
    iconColor: 'text-[#7e14ff]',
  },
  {
    id: 'department',
    title: "I'm a Coordinator",
    description: 'Manage department placement activities and verify students',
    icon: Building,
    color: 'bg-[#F0FFF4]',
    iconColor: 'text-[#34A853]',
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper p-4 sm:p-8">
      <div className="flex w-full max-w-[900px] overflow-hidden rounded-[20px] bg-white shadow-xl max-md:flex-col">
        {/* Left Side Branding */}
        <div className="flex flex-1 flex-col items-center justify-center bg-gold p-10 text-center text-white max-md:p-8">
          <img
            src="/gu-logo.png"
            alt="Gujarat University"
            className="mb-6 h-[100px] w-auto drop-shadow-md rounded bg-white p-2"
          />
          <h2 className="mb-2 font-serif text-3xl font-bold text-navy">Placement Portal</h2>
          <p className="max-w-[280px] text-sm text-navy/80 font-medium">
            Where Gujarat University talent meets opportunity.
          </p>
        </div>

        {/* Right Side Role Selection */}
        <div className="flex flex-1 flex-col justify-center p-10 max-md:p-8">
          <h2 className="mb-2 text-2xl font-bold text-navy">Identify your account type</h2>
          <p className="mb-8 text-sm text-muted">
            Join the Gujarat University Placement Portal to find your dream job or hire talented candidates.
          </p>

          <div className="flex flex-col gap-4">
            {ROLES.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => navigate(`/${role.id}/login`)}
                  className={`group flex items-start gap-4 rounded-xl p-5 text-left transition-all hover:-translate-y-1 hover:shadow-md ${role.color}`}
                >
                  <div className={`mt-0.5 ${role.iconColor}`}>
                    <Icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-ink group-hover:text-navy">
                      {role.title}
                    </h3>
                    <p className="text-xs text-muted/80">{role.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
