const fs = require('fs');
const path = 'd:/files/office/3/placementportal/placementportalfrontend/src/context/PortalDataContext.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `  updatePersonal(fields: Partial<Pick<StudentProfile, 'name' | 'dob' | 'gender' | 'category' | 'city' | 'email' | 'phone' | 'linkedin' | 'github' | 'address'>>): void
  updateAbout(headline: string, summary: string): void
  updatePreferences(prefs: Partial<StudentProfile['preferences']>): void
  setStatus(status: string): void`,
  `  updatePersonal(fields: Partial<Pick<StudentProfile, 'name' | 'dob' | 'gender' | 'category' | 'city' | 'email' | 'phone' | 'linkedin' | 'github' | 'address'>>): Promise<void> | void
  updateAbout(headline: string, summary: string): Promise<void> | void
  updatePreferences(prefs: Partial<StudentProfile['preferences']>): Promise<void> | void
  setStatus(status: string): Promise<void> | void`
);

content = content.replace(
  `  updateAcademicMeta(cgpa: string, backlogs: number): void
  updateSemester(i: number, sem: Partial<Semester>): void`,
  `  updateAcademicMeta(cgpa: string, backlogs: number): Promise<void> | void
  updateSemester(i: number, sem: Partial<Semester>): Promise<void> | void`
);

content = content.replace(
  `    updatePersonal(fields) {
      const formattedFields = { ...fields }
      if (fields.dob) {
        formattedFields.dob = new Date(fields.dob).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      }
      setMe((m) => ({ ...m, ...formattedFields }))
      const data: any = {}
      if (fields.name !== undefined) data.fullName = fields.name
      if (fields.phone !== undefined) data.phone = fields.phone
      if (fields.dob) data.dateOfBirth = new Date(fields.dob).toISOString().split('T')[0]
      if (fields.gender !== undefined) data.gender = fields.gender
      if (fields.category !== undefined) data.category = fields.category
      if (fields.address !== undefined) data.addressLine = fields.address
      if (fields.city !== undefined) data.city = fields.city
      
      if (Object.keys(data).length > 0) {
        studentApi.updateMe(data).catch(console.error)
      }

      const handleLink = (label: string, value: string | undefined) => {
        if (value === undefined) return;
        const existing = me.links.find(l => l.label.toLowerCase() === label.toLowerCase());
        if (existing && existing.url !== value && existing.id !== undefined) {
          studentApi.deleteLink(existing.id.toString()).then(() => {
            if (value) studentApi.addLink({ label, url: value }).catch(console.error);
          }).catch(console.error);
        } else if (!existing && value) {
          studentApi.addLink({ label, url: value }).catch(console.error);
        }
      }

      handleLink('LinkedIn', fields.linkedin);
      handleLink('GitHub', fields.github);
    }`,
  `    updatePersonal: async (fields) => {
      const formattedFields = { ...fields }
      if (fields.dob) {
        formattedFields.dob = new Date(fields.dob).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      }
      const data: any = {}
      if (fields.name !== undefined) data.fullName = fields.name
      if (fields.phone !== undefined) data.phone = fields.phone
      if (fields.dob) data.dateOfBirth = new Date(fields.dob).toISOString().split('T')[0]
      if (fields.gender !== undefined) data.gender = fields.gender
      if (fields.category !== undefined) data.category = fields.category
      if (fields.address !== undefined) data.addressLine = fields.address
      if (fields.city !== undefined) data.city = fields.city
      
      if (Object.keys(data).length > 0) {
        await studentApi.updateMe(data)
      }

      const handleLink = async (label: string, value: string | undefined) => {
        if (value === undefined) return;
        const existing = me.links.find(l => l.label.toLowerCase() === label.toLowerCase());
        if (existing && existing.url !== value && existing.id !== undefined) {
          await studentApi.deleteLink(existing.id.toString())
          if (value) await studentApi.addLink({ label, url: value })
        } else if (!existing && value) {
          await studentApi.addLink({ label, url: value })
        }
      }

      await handleLink('LinkedIn', fields.linkedin);
      await handleLink('GitHub', fields.github);
      
      setMe((m) => ({ ...m, ...formattedFields }))
    }`
);

content = content.replace(
  `    updateAbout(headline, summary) {
      setMe((m) => ({ ...m, headline: headline || m.headline, summary: summary || m.summary }))
      studentApi.updateMe({ headline, bio: summary }).catch(console.error)
    }`,
  `    updateAbout: async (headline, summary) => {
      await studentApi.updateMe({ headline, bio: summary })
      setMe((m) => ({ ...m, headline: headline || m.headline, summary: summary || m.summary }))
    }`
);

content = content.replace(
  `    updatePreferences(prefs) {
      setMe((m) => ({ ...m, preferences: { ...m.preferences, ...prefs } }))
      
      const backendPrefs: any = {}
      if (prefs.roles) backendPrefs.preferredRoles = prefs.roles.split(' · ').map(s => s.trim()).filter(Boolean)
      if (prefs.type) {
        backendPrefs.preferredKinds = []
        if (prefs.type.includes('Placement')) backendPrefs.preferredKinds.push('PLACEMENT')
        if (prefs.type.includes('Internship')) backendPrefs.preferredKinds.push('INTERNSHIP')
        if (prefs.type.includes('OJT')) backendPrefs.preferredKinds.push('OJT')
      }
      if (prefs.locations) backendPrefs.preferredLocations = prefs.locations.split(' · ').map(s => s.trim()).filter(Boolean)
      if (prefs.ctc) backendPrefs.minExpectedCtc = parseFloat(prefs.ctc.replace(/[^0-9.-]+/g,"")) || 0
      if (prefs.relocate !== undefined) backendPrefs.openToRelocate = prefs.relocate === 'Open to relocate'
      
      studentApi.upsertPreference(backendPrefs).catch(console.error)
    }`,
  `    updatePreferences: async (prefs) => {
      const backendPrefs: any = {}
      if (prefs.roles) backendPrefs.preferredRoles = prefs.roles.split(' · ').map(s => s.trim()).filter(Boolean)
      if (prefs.type) {
        backendPrefs.preferredKinds = []
        if (prefs.type.includes('Placement')) backendPrefs.preferredKinds.push('PLACEMENT')
        if (prefs.type.includes('Internship')) backendPrefs.preferredKinds.push('INTERNSHIP')
        if (prefs.type.includes('OJT')) backendPrefs.preferredKinds.push('OJT')
      }
      if (prefs.locations) backendPrefs.preferredLocations = prefs.locations.split(' · ').map(s => s.trim()).filter(Boolean)
      if (prefs.ctc) backendPrefs.minExpectedCtc = parseFloat(prefs.ctc.replace(/[^0-9.-]+/g,"")) || 0
      if (prefs.relocate !== undefined) backendPrefs.openToRelocate = prefs.relocate === 'Open to relocate'
      
      await studentApi.upsertPreference(backendPrefs)
      setMe((m) => ({ ...m, preferences: { ...m.preferences, ...prefs } }))
    }`
);

content = content.replace(
  `    setStatus(status) {
      setMe((m) => ({ ...m, status }))
      const backendStatus = status.toUpperCase().replace(' ', '_')
      studentApi.updatePlacementStatus(backendStatus).catch(console.error)
    }`,
  `    setStatus: async (status) => {
      const backendStatus = status.toUpperCase().replace(' ', '_')
      await studentApi.updatePlacementStatus(backendStatus)
      setMe((m) => ({ ...m, status }))
    }`
);

content = content.replace(
  `    addLink(link) {
      const tempId = Date.now().toString()
      setMe((m) => ({ ...m, links: [...m.links, { ...link, id: tempId }] }))
      studentApi.addLink({ label: link.label, url: link.url }).then(res => {
        setMe((m) => ({ ...m, links: m.links.map(l => l.id === tempId ? { ...link, id: res.data?.id || res.id } : l) }))
      }).catch(console.error)
    }`,
  `    addLink: async (link) => {
      const res = await studentApi.addLink({ label: link.label, url: link.url })
      setMe((m) => ({ ...m, links: [...m.links, { ...link, id: res.data?.id || res.id }] }))
    }`
);

content = content.replace(
  `    editLink(i, link) {
      const id = me.links[i]?.id;
      if (id) {
        studentApi.deleteLink(id.toString()).then(() => {
          studentApi.addLink({ label: link.label, url: link.url }).then(res => {
            setMe((m) => ({ ...m, links: m.links.map((l, idx) => (idx === i ? { ...link, id: res.id } : l)) }))
          })
        }).catch(console.error)
      } else {
        setMe((m) => ({ ...m, links: m.links.map((l, idx) => (idx === i ? link : l)) }))
      }
    }`,
  `    editLink: async (i, link) => {
      const id = me.links[i]?.id;
      if (id) {
        await studentApi.deleteLink(id.toString())
        const res = await studentApi.addLink({ label: link.label, url: link.url })
        setMe((m) => ({ ...m, links: m.links.map((l, idx) => (idx === i ? { ...link, id: res.data?.id || res.id } : l)) }))
      } else {
        setMe((m) => ({ ...m, links: m.links.map((l, idx) => (idx === i ? link : l)) }))
      }
    }`
);

content = content.replace(
  `    deleteLink(i) {
      const id = me.links[i]?.id;
      if (id) studentApi.deleteLink(id.toString()).catch(console.error);
      setMe((m) => ({ ...m, links: m.links.filter((_, idx) => idx !== i) }))
    }`,
  `    deleteLink: async (i) => {
      const id = me.links[i]?.id;
      if (id) await studentApi.deleteLink(id.toString());
      setMe((m) => ({ ...m, links: m.links.filter((_, idx) => idx !== i) }))
    }`
);

content = content.replace(
  `    addSkill(skill) {
      const tempId = Date.now().toString()
      setMe((m) => ({ ...m, skills: [...m.skills, { ...skill, id: tempId }] }))
      studentApi.addSkill({ name: skill.n, proficiency: Math.round(skill.lv / 20) }).then(res => {
        setMe((m) => ({ ...m, skills: m.skills.map(s => s.id === tempId ? { ...skill, id: res.data?.skillId || res.skillId } : s) }))
      }).catch(console.error)
    }`,
  `    addSkill: async (skill) => {
      const res = await studentApi.addSkill({ name: skill.n, proficiency: Math.round(skill.lv / 20) })
      setMe((m) => ({ ...m, skills: [...m.skills, { ...skill, id: res.data?.skillId || res.skillId }] }))
    }`
);

content = content.replace(
  `    editSkill(i, skill) {
      const id = me.skills[i]?.id;
      if (id) {
        studentApi.updateSkill(id.toString(), { proficiency: Math.round(skill.lv / 20) }).catch(console.error);
      }
      setMe((m) => ({ ...m, skills: m.skills.map((s, idx) => (idx === i ? skill : s)) }))
    }`,
  `    editSkill: async (i, skill) => {
      const id = me.skills[i]?.id;
      if (id) {
        await studentApi.updateSkill(id.toString(), { proficiency: Math.round(skill.lv / 20) });
      }
      setMe((m) => ({ ...m, skills: m.skills.map((s, idx) => (idx === i ? skill : s)) }))
    }`
);

content = content.replace(
  `    deleteSkill(i) {
      const id = me.skills[i]?.id;
      if (id) studentApi.deleteSkill(id.toString()).catch(console.error);
      setMe((m) => ({ ...m, skills: m.skills.filter((_, idx) => idx !== i) }))
    }`,
  `    deleteSkill: async (i) => {
      const id = me.skills[i]?.id;
      if (id) await studentApi.deleteSkill(id.toString());
      setMe((m) => ({ ...m, skills: m.skills.filter((_, idx) => idx !== i) }))
    }`
);

content = content.replace(
  `    addCert(cert) {
      const tempId = Date.now().toString()
      setMe((m) => ({ ...m, certs: [...m.certs, { ...cert, id: tempId }] }))
      const issuedOn = cert.year ? new Date(\`\${cert.year}-01-01\`).toISOString().split('T')[0] : undefined;
      studentApi.addCertification({ name: cert.name, issuer: cert.by, issuedOn }).then(res => {
        setMe((m) => ({ ...m, certs: m.certs.map(c => c.id === tempId ? { ...cert, id: res.data?.id || res.id } : c) }))
      }).catch(console.error)
    }`,
  `    addCert: async (cert) => {
      const issuedOn = cert.year ? new Date(\`\${cert.year}-01-01\`).toISOString().split('T')[0] : undefined;
      const res = await studentApi.addCertification({ name: cert.name, issuer: cert.by, issuedOn })
      setMe((m) => ({ ...m, certs: [...m.certs, { ...cert, id: res.data?.id || res.id }] }))
    }`
);

content = content.replace(
  `    editCert(i, cert) {
      const id = me.certs[i]?.id;
      if (id) {
        const issuedOn = cert.year ? new Date(\`\${cert.year}-01-01\`).toISOString().split('T')[0] : undefined;
        studentApi.updateCertification(id.toString(), { name: cert.name, issuer: cert.by, issuedOn }).catch(console.error);
      }
      setMe((m) => ({ ...m, certs: m.certs.map((c, idx) => (idx === i ? cert : c)) }))
    }`,
  `    editCert: async (i, cert) => {
      const id = me.certs[i]?.id;
      if (id) {
        const issuedOn = cert.year ? new Date(\`\${cert.year}-01-01\`).toISOString().split('T')[0] : undefined;
        await studentApi.updateCertification(id.toString(), { name: cert.name, issuer: cert.by, issuedOn });
      }
      setMe((m) => ({ ...m, certs: m.certs.map((c, idx) => (idx === i ? cert : c)) }))
    }`
);

content = content.replace(
  `    deleteCert(i) {
      const id = me.certs[i]?.id;
      if (id) studentApi.deleteCertification(id.toString()).catch(console.error);
      setMe((m) => ({ ...m, certs: m.certs.filter((_, idx) => idx !== i) }))
    }`,
  `    deleteCert: async (i) => {
      const id = me.certs[i]?.id;
      if (id) await studentApi.deleteCertification(id.toString());
      setMe((m) => ({ ...m, certs: m.certs.filter((_, idx) => idx !== i) }))
    }`
);

content = content.replace(
  `    updateAcademicMeta(cgpa, backlogs) {
      setMe((m) => ({ ...m, cgpa: cgpa || m.cgpa, backlogs }))
      studentApi.updateMe({ cgpa: parseFloat(cgpa) || 0, activeBacklogs: backlogs }).catch(console.error)
    }`,
  `    updateAcademicMeta: async (cgpa, backlogs) => {
      await studentApi.updateMe({ cgpa: parseFloat(cgpa) || 0, activeBacklogs: backlogs })
      setMe((m) => ({ ...m, cgpa: cgpa || m.cgpa, backlogs }))
    }`
);

content = content.replace(
  `    updateSemester(i, sem) {
      setMe((m) => ({ ...m, semesters: m.semesters.map((s, idx) => (idx === i ? { ...s, ...sem } : s)) }))
      const updatedSem = me.semesters[i]
      if (updatedSem) {
        studentApi.upsertSemesterRecord({
          semester: i + 1,
          sgpa: parseFloat(sem.sgpa || updatedSem.sgpa) || 0,
          credits: sem.cr !== undefined ? sem.cr : updatedSem.cr,
          backlogs: sem.res === 'Backlog' || updatedSem.res === 'Backlog' ? 1 : 0
        }).catch(console.error)
      }
    }`,
  `    updateSemester: async (i, sem) => {
      const currentSem = me.semesters[i]
      if (currentSem) {
        await studentApi.upsertSemesterRecord({
          semester: i + 1,
          sgpa: parseFloat(sem.sgpa || currentSem.sgpa) || 0,
          credits: sem.cr !== undefined ? sem.cr : currentSem.cr,
          backlogs: sem.res === 'Backlog' || currentSem.res === 'Backlog' ? 1 : 0
        })
      }
      setMe((m) => ({ ...m, semesters: m.semesters.map((s, idx) => (idx === i ? { ...s, ...sem } : s)) }))
    }`
);

fs.writeFileSync(path, content, 'utf8');
