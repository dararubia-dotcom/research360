import { useState, useMemo } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Mail,
  MessageSquare,
  User,
  Briefcase,
  GraduationCap,
  FlaskConical,
  Microscope,
} from 'lucide-react';
import { teamMembers, projects } from '../data/mockData';

const roleColors: Record<string, string> = {
  'Principal Investigator': 'bg-purple-100 text-purple-800',
  'Postdoctoral Researcher': 'bg-blue-100 text-blue-800',
  'PhD Student': 'bg-emerald-100 text-emerald-800',
  'Research Assistant': 'bg-amber-100 text-amber-800',
  'Lab Technician': 'bg-cyan-100 text-cyan-800',
  'Data Scientist': 'bg-rose-100 text-rose-800',
  'Project Manager': 'bg-indigo-100 text-indigo-800',
};

const avatarColors = [
  'bg-indigo-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-purple-500',
  'bg-blue-500',
  'bg-teal-500',
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Teams() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const roles = useMemo(() => {
    const r = new Set(teamMembers.map((m) => m.role));
    return ['All', ...Array.from(r)];
  }, []);

  const filtered = useMemo(() => {
    return teamMembers.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.department.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'All' || m.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [search, roleFilter]);

  const departments = useMemo(() => {
    const map = new Map<string, typeof teamMembers>();
    filtered.forEach((m) => {
      const arr = map.get(m.department) || [];
      arr.push(m);
      map.set(m.department, arr);
    });
    return map;
  }, [filtered]);

  const stats = useMemo(() => {
    const count = (role: string) => teamMembers.filter((m) => m.role === role).length;
    return [
      { label: 'Total Members', value: teamMembers.length, icon: Users, color: 'text-indigo-600 bg-indigo-50' },
      { label: 'Principal Investigators', value: count('Principal Investigator'), icon: Microscope, color: 'text-purple-600 bg-purple-50' },
      { label: 'Postdocs', value: count('Postdoctoral Researcher'), icon: FlaskConical, color: 'text-blue-600 bg-blue-50' },
      { label: 'PhD Students', value: count('PhD Student'), icon: GraduationCap, color: 'text-emerald-600 bg-emerald-50' },
      { label: 'Support Staff', value: teamMembers.length - count('Principal Investigator') - count('Postdoctoral Researcher') - count('PhD Student'), icon: Briefcase, color: 'text-amber-600 bg-amber-50' },
    ];
  }, []);

  function getMemberProjects(memberId: string) {
    return projects.filter((p) => p.team.includes(memberId));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Research Team</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your research collaborators and team members</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm">
          <UserPlus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, role, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        >
          {roles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((member) => {
          const memberProjects = getMemberProjects(member.id);
          return (
            <div
              key={member.id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg shrink-0 ${getAvatarColor(member.name)}`}
                >
                  {getInitials(member.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 truncate">{member.name}</h3>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[member.role] || 'bg-gray-100 text-gray-800'}`}
                  >
                    {member.role}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{member.department}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">{member.email}</span>
              </div>

              {/* Projects */}
              <div className="mt-3">
                <p className="text-xs font-medium text-gray-700 mb-1.5">Projects</p>
                <div className="flex flex-wrap gap-1.5">
                  {memberProjects.length > 0 ? (
                    memberProjects.slice(0, 3).map((p) => (
                      <span
                        key={p.id}
                        className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs truncate max-w-[140px]"
                        title={p.title}
                      >
                        {p.title}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400 italic">No projects assigned</span>
                  )}
                  {memberProjects.length > 3 && (
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
                      +{memberProjects.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Workload */}
              <div className="mt-3">
                {(() => {
                  const workload = Math.min(memberProjects.length * 25, 100);
                  return (
                    <>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-500">Workload</span>
                        <span className="font-medium text-gray-700">{workload}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            workload > 85
                              ? 'bg-red-500'
                              : workload > 65
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                          }`}
                          style={{ width: `${workload}%` }}
                        />
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <User className="w-3.5 h-3.5" />
                  View Profile
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Message
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium">No members found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Department Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">By Department</h2>
        <div className="space-y-6">
          {Array.from(departments.entries()).map(([dept, members]) => (
            <div key={dept}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">{dept}</h3>
                <span className="text-xs text-gray-500">{members.length} member{members.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {members.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium ${getAvatarColor(m.name)}`}
                    >
                      {getInitials(m.name)}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-800">{m.name}</p>
                      <p className="text-[10px] text-gray-500">{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
