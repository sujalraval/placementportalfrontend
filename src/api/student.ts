import { apiClient } from './client';
import type { StudentProfile } from '../data/mock/me';


export const mapBackendStudentToFrontend = (data: any): StudentProfile => {
  const getLink = (label: string) => data.links?.find((l: any) => l.label.toLowerCase() === label.toLowerCase())?.url || '';
  
  return {
    name: data.user?.fullName || '',
    en: data.enrollmentNo || '',
    dept: data.department?.name || '',
    batch: `${data.batchStartYear || ''}–${(data.batchEndYear || '').toString().slice(-2)}`,
    cgpa: data.cgpa?.toString() || '0.0',
    email: data.user?.email || '',
    phone: data.user?.phone || '',
    dob: data.dateOfBirth ? new Date(data.dateOfBirth).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
    gender: data.gender || '',
    category: data.category || '',
    city: data.city || '',
    address: data.addressLine || '',
    linkedin: getLink('LinkedIn'),
    github: getLink('GitHub'),
    status: data.placementStatus ? data.placementStatus.charAt(0) + data.placementStatus.slice(1).toLowerCase().replace('_', ' ') : 'Unplaced',
    completeness: data.profileCompleteness || 0,
    verified: data.documents?.some((d: any) => d.status === 'APPROVED') || false,
    coordinator: 'Coordinator', // Could be fetched from department if added to include
    backlogs: data.activeBacklogs || 0,
    headline: data.headline || '',
    summary: data.bio || '',
    preferences: {
      roles: data.preference?.preferredRoles?.join(' · ') || '',
      type: data.preference?.preferredKinds?.join(' · ') || 'Full-time',
      locations: data.preference?.preferredLocations?.join(' · ') || '',
      ctc: data.preference?.minExpectedCtc ? `₹${data.preference.minExpectedCtc} LPA (expected)` : '',
      relocate: data.preference?.openToRelocate ? 'Open to relocate' : 'Not open to relocate',
      avail: 'Available'
    },
    links: (data.links || []).map((l: any) => ({ id: l.id, label: l.label, url: l.url, ic: 'link' })),
    internships: (data.experiences || []).map((e: any) => ({
      id: e.id,
      role: e.role,
      co: e.organisation,
      dur: `${new Date(e.startedOn).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} – ${e.isCurrent ? 'Present' : e.endedOn ? new Date(e.endedOn).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}`,
      loc: e.location || '',
      desc: e.description || '',
      tech: e.employmentType || ''
    })),
    achievements: (data.achievements || []).map((a: any) => ({
      id: a.id,
      t: a.title,
      y: a.achievedOn ? new Date(a.achievedOn).getFullYear().toString() : '',
      d: a.description || ''
    })),
    positions: (data.positions || []).map((p: any) => ({
      id: p.id,
      role: p.title,
      org: p.organisation,
      dur: p.startedOn ? new Date(p.startedOn).getFullYear().toString() : '',
      d: p.description || ''
    })),
    semesters: Array.from({ length: 8 }).map((_, i) => {
      const record = (data.semesterRecords || []).find((s: any) => s.semester === i + 1);
      if (record) {
        return {
          s: `Semester ${record.semester}`,
          sgpa: record.sgpa?.toString() || '',
          cr: record.credits || 0,
          res: record.backlogs > 0 ? 'Backlog' : 'Passed'
        };
      }
      return { s: `Semester ${i + 1}`, sgpa: '', cr: 0, res: 'Passed' };
    }),
    skills: (data.skills || []).map((s: any) => ({
      id: s.skillId,
      n: s.skill?.name || '',
      lv: (s.proficiency || 3) * 20 // scale 1-5 to 20-100
    })),
    soft: [],
    languages: [],
    interests: [],
    projects: (data.projects || []).map((p: any) => ({
      id: p.id,
      name: p.title,
      stack: (p.techStack || []).join(' · '),
      desc: p.description || '',
      repo: p.repoUrl || '',
      demo: p.liveUrl || ''
    })),
    certs: (data.certifications || []).map((c: any) => ({
      id: c.id,
      name: c.name,
      by: c.issuer,
      year: c.issuedOn ? new Date(c.issuedOn).getFullYear().toString() : ''
    })),
    docs: (data.documents || []).map((d: any) => ({
      id: d.id,
      name: d.title,
      type: d.type,
      status: d.status.charAt(0) + d.status.slice(1).toLowerCase(),
      url: d.fileUrl
    }))
  };
};

export const studentApi = {
  getMe: async () => {
    const response = await apiClient.get('/students/me');
    return response.data;
  },

  updateMe: async (data: any) => {
    const response = await apiClient.patch('/students/me', data);
    return response.data;
  },

  updatePlacementStatus: async (status: string) => {
    const response = await apiClient.patch('/students/me/placement-status', { status });
    return response.data;
  },

  upsertPreference: async (data: any) => {
    const response = await apiClient.put('/students/me/preference', data);
    return response.data;
  },

  // Links
  listLinks: async () => {
    const response = await apiClient.get('/students/me/links');
    return response.data;
  },
  addLink: async (data: { label: string; url: string }) => {
    const response = await apiClient.post('/students/me/links', data);
    return response.data;
  },
  deleteLink: async (id: string) => {
    const response = await apiClient.delete(`/students/me/links/${id}`);
    return response.data;
  },

  // Skills
  listSkills: async () => {
    const response = await apiClient.get('/students/me/skills');
    return response.data;
  },
  addSkill: async (data: { name: string; proficiency?: number }) => {
    const response = await apiClient.post('/students/me/skills', data);
    return response.data;
  },
  updateSkill: async (id: string, data: { proficiency: number }) => {
    const response = await apiClient.patch(`/students/me/skills/${id}`, data);
    return response.data;
  },
  deleteSkill: async (id: string) => {
    const response = await apiClient.delete(`/students/me/skills/${id}`);
    return response.data;
  },

  // Projects
  listProjects: async () => {
    const response = await apiClient.get('/students/me/projects');
    return response.data;
  },
  addProject: async (data: any) => {
    const response = await apiClient.post('/students/me/projects', data);
    return response.data;
  },
  updateProject: async (id: string, data: any) => {
    const response = await apiClient.patch(`/students/me/projects/${id}`, data);
    return response.data;
  },
  deleteProject: async (id: string) => {
    const response = await apiClient.delete(`/students/me/projects/${id}`);
    return response.data;
  },

  // Experience
  listExperiences: async () => {
    const response = await apiClient.get('/students/me/experience');
    return response.data;
  },
  addExperience: async (data: any) => {
    const response = await apiClient.post('/students/me/experience', data);
    return response.data;
  },
  updateExperience: async (id: string, data: any) => {
    const response = await apiClient.patch(`/students/me/experience/${id}`, data);
    return response.data;
  },
  deleteExperience: async (id: string) => {
    const response = await apiClient.delete(`/students/me/experience/${id}`);
    return response.data;
  },

  // Certifications
  listCertifications: async () => {
    const response = await apiClient.get('/students/me/certifications');
    return response.data;
  },
  addCertification: async (data: any) => {
    const response = await apiClient.post('/students/me/certifications', data);
    return response.data;
  },
  updateCertification: async (id: string, data: any) => {
    const response = await apiClient.patch(`/students/me/certifications/${id}`, data);
    return response.data;
  },
  deleteCertification: async (id: string) => {
    const response = await apiClient.delete(`/students/me/certifications/${id}`);
    return response.data;
  },

  // Achievements
  listAchievements: async () => {
    const response = await apiClient.get('/students/me/achievements');
    return response.data;
  },
  addAchievement: async (data: any) => {
    const response = await apiClient.post('/students/me/achievements', data);
    return response.data;
  },
  updateAchievement: async (id: string, data: any) => {
    const response = await apiClient.patch(`/students/me/achievements/${id}`, data);
    return response.data;
  },
  deleteAchievement: async (id: string) => {
    const response = await apiClient.delete(`/students/me/achievements/${id}`);
    return response.data;
  },

  // Positions
  listPositions: async () => {
    const response = await apiClient.get('/students/me/positions');
    return response.data;
  },
  addPosition: async (data: any) => {
    const response = await apiClient.post('/students/me/positions', data);
    return response.data;
  },
  updatePosition: async (id: string, data: any) => {
    const response = await apiClient.patch(`/students/me/positions/${id}`, data);
    return response.data;
  },
  deletePosition: async (id: string) => {
    const response = await apiClient.delete(`/students/me/positions/${id}`);
    return response.data;
  },

  // Semester Records
  listSemesterRecords: async () => {
    const response = await apiClient.get('/students/me/semester-records');
    return response.data;
  },
  upsertSemesterRecord: async (data: any) => {
    const response = await apiClient.put('/students/me/semester-records', data);
    return response.data;
  },
  deleteSemesterRecord: async (semester: number) => {
    const response = await apiClient.delete(`/students/me/semester-records/${semester}`);
    return response.data;
  },

  // Documents
  listDocuments: async () => {
    const response = await apiClient.get('/students/me/documents');
    return response.data;
  },
  uploadDocument: async (formData: FormData) => {
    const response = await apiClient.post('/students/me/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deleteDocument: async (id: string) => {
    const response = await apiClient.delete(`/students/me/documents/${id}`);
    return response.data;
  },
};
