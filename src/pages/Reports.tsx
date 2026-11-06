import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  FileBarChart,
  Download,
  Calendar,
  BookOpen,
  Quote,
  Award,
  Users,
  Clock,
  TrendingUp,
  Settings,
  Play,
  Pause,
  Mail,
} from 'lucide-react';

const tabs = ['Overview', 'Financial', 'Productivity', 'Impact'] as const;
type TabType = (typeof tabs)[number];

const publicationsPerQuarter = [
  { quarter: 'Q1 2025', papers: 4, reviews: 2, conferences: 1 },
  { quarter: 'Q2 2025', papers: 6, reviews: 3, conferences: 2 },
  { quarter: 'Q3 2025', papers: 5, reviews: 4, conferences: 3 },
  { quarter: 'Q4 2025', papers: 8, reviews: 3, conferences: 2 },
  { quarter: 'Q1 2026', papers: 7, reviews: 5, conferences: 4 },
  { quarter: 'Q2 2026', papers: 9, reviews: 4, conferences: 3 },
  { quarter: 'Q3 2026', papers: 11, reviews: 6, conferences: 5 },
  { quarter: 'Q4 2026', papers: 13, reviews: 5, conferences: 4 },
];

const fundingData = [
  { year: '2022', applications: 8, awards: 3 },
  { year: '2023', applications: 12, awards: 5 },
  { year: '2024', applications: 15, awards: 7 },
  { year: '2025', applications: 18, awards: 9 },
  { year: '2026', applications: 22, awards: 12 },
];

const teamProductivity = [
  { member: 'Dr. Vasquez', publications: 14, citations: 340, grants: 4, reviews: 22 },
  { member: 'Dr. Chen', publications: 11, citations: 280, grants: 3, reviews: 18 },
  { member: 'Dr. Patel', publications: 16, citations: 520, grants: 5, reviews: 30 },
  { member: 'Dr. Andersson', publications: 9, citations: 190, grants: 2, reviews: 15 },
  { member: 'Dr. Tanaka', publications: 12, citations: 310, grants: 3, reviews: 20 },
];

const citationTrends = [
  { month: 'Jan', citations: 45 },
  { month: 'Feb', citations: 52 },
  { month: 'Mar', citations: 48 },
  { month: 'Apr', citations: 61 },
  { month: 'May', citations: 55 },
  { month: 'Jun', citations: 72 },
  { month: 'Jul', citations: 68 },
  { month: 'Aug', citations: 85 },
  { month: 'Sep', citations: 92 },
  { month: 'Oct', citations: 88 },
  { month: 'Nov', citations: 104 },
];

const radarData = [
  { metric: 'Publications', Vasquez: 85, Chen: 70, Patel: 95 },
  { metric: 'Citations', Vasquez: 75, Chen: 65, Patel: 92 },
  { metric: 'Grants', Vasquez: 80, Chen: 60, Patel: 88 },
  { metric: 'Reviews', Vasquez: 70, Chen: 75, Patel: 90 },
  { metric: 'Mentoring', Vasquez: 90, Chen: 80, Patel: 75 },
  { metric: 'Collab', Vasquez: 65, Chen: 85, Patel: 80 },
];

const budgetByQuarter = [
  { quarter: 'Q1 2026', allocated: 580000, spent: 520000, remaining: 60000 },
  { quarter: 'Q2 2026', allocated: 620000, spent: 590000, remaining: 30000 },
  { quarter: 'Q3 2026', allocated: 650000, spent: 610000, remaining: 40000 },
  { quarter: 'Q4 2026', allocated: 700000, spent: 480000, remaining: 220000 },
];

const costPerPublication = [
  { year: '2022', cost: 48000 },
  { year: '2023', cost: 42000 },
  { year: '2024', cost: 38000 },
  { year: '2025', cost: 35000 },
  { year: '2026', cost: 31000 },
];

const submittedVsAccepted = [
  { quarter: 'Q1 25', submitted: 8, accepted: 4 },
  { quarter: 'Q2 25', submitted: 10, accepted: 6 },
  { quarter: 'Q3 25', submitted: 9, accepted: 5 },
  { quarter: 'Q4 25', submitted: 12, accepted: 8 },
  { quarter: 'Q1 26', submitted: 11, accepted: 7 },
  { quarter: 'Q2 26', submitted: 14, accepted: 9 },
  { quarter: 'Q3 26', submitted: 16, accepted: 11 },
  { quarter: 'Q4 26', submitted: 18, accepted: 13 },
];

const timeToPublication = [
  { stage: 'Draft', days: 30 },
  { stage: 'Internal Review', days: 14 },
  { stage: 'Submission', days: 5 },
  { stage: 'Peer Review', days: 60 },
  { stage: 'Revision', days: 21 },
  { stage: 'Acceptance', days: 10 },
  { stage: 'Publication', days: 14 },
];

const journalImpact = [
  { journal: 'Nature Genetics', if: 38.3, papers: 3 },
  { journal: 'Science', if: 56.9, papers: 1 },
  { journal: 'Cell', if: 45.5, papers: 2 },
  { journal: 'PNAS', if: 12.8, papers: 6 },
  { journal: 'PLoS ONE', if: 3.7, papers: 8 },
];

const collabPie = [
  { name: 'Domestic', value: 42 },
  { name: 'International', value: 28 },
  { name: 'Industry', value: 15 },
  { name: 'Interdisciplinary', value: 18 },
];
const PIE_COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b'];

const scheduledReports = [
  { name: 'Monthly Progress Report', frequency: 'Monthly', next: '2026-12-01', recipients: 4, active: true },
  { name: 'Quarterly Financial Summary', frequency: 'Quarterly', next: '2027-01-01', recipients: 6, active: true },
  { name: 'Annual Productivity Analysis', frequency: 'Annual', next: '2027-01-15', recipients: 12, active: true },
  { name: 'Weekly Team Digest', frequency: 'Weekly', next: '2026-11-11', recipients: 8, active: false },
];

function KPICard({ icon: Icon, label, value, change, color }: { icon: React.ElementType; label: string; value: string; change: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{change}</span>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <KPICard icon={BookOpen} label="Total Publications" value="87" change="+18% YoY" color="bg-indigo-50 text-indigo-600" />
        <KPICard icon={Quote} label="Total Citations" value="2,340" change="+24% YoY" color="bg-blue-50 text-blue-600" />
        <KPICard icon={Award} label="H-Index" value="28" change="+3 this year" color="bg-emerald-50 text-emerald-600" />
        <KPICard icon={Users} label="Collaborations" value="34" change="+12 new" color="bg-purple-50 text-purple-600" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Research Output by Quarter</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={publicationsPerQuarter}>
              <defs>
                <linearGradient id="colorPapers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorConf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="quarter" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="papers" name="Papers" stroke="#6366f1" fill="url(#colorPapers)" strokeWidth={2} />
              <Area type="monotone" dataKey="conferences" name="Conferences" stroke="#10b981" fill="url(#colorConf)" strokeWidth={2} />
              <Line type="monotone" dataKey="reviews" name="Reviews" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Funding Success Rate</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={fundingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="applications" name="Applications" fill="#c7d2fe" radius={[4, 4, 0, 0]} />
              <Bar dataKey="awards" name="Awards" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Team Productivity Radar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar name="Dr. Vasquez" dataKey="Vasquez" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Dr. Chen" dataKey="Chen" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
              <Radar name="Dr. Patel" dataKey="Patel" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Citation Trend (2026)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={citationTrends}>
              <defs>
                <linearGradient id="citGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
              <Area type="monotone" dataKey="citations" fill="url(#citGrad)" stroke="none" />
              <Line type="monotone" dataKey="citations" name="Citations" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function FinancialTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Budget Utilization by Quarter</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetByQuarter}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="quarter" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v: number) => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} formatter={(value: number) => [`$${(value / 1000).toFixed(0)}k`, undefined]} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="allocated" name="Allocated" fill="#c7d2fe" radius={[4, 4, 0, 0]} />
              <Bar dataKey="spent" name="Spent" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Cost per Publication (Trend)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={costPerPublication}>
              <defs>
                <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v: number) => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} formatter={(value: number) => [`$${(value / 1000).toFixed(0)}k`, undefined]} />
              <Area type="monotone" dataKey="cost" name="Cost per Paper" stroke="#10b981" fill="url(#costGrad)" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Team Member Financial Overview</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left py-2 px-3 font-medium text-slate-500">Researcher</th>
              <th className="text-right py-2 px-3 font-medium text-slate-500">Publications</th>
              <th className="text-right py-2 px-3 font-medium text-slate-500">Grants Won</th>
              <th className="text-right py-2 px-3 font-medium text-slate-500">Avg Cost/Paper</th>
              <th className="text-right py-2 px-3 font-medium text-slate-500">ROI Index</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {teamProductivity.map((t) => (
              <tr key={t.member} className="hover:bg-slate-50/50">
                <td className="py-2.5 px-3 font-medium text-slate-700">{t.member}</td>
                <td className="py-2.5 px-3 text-right text-slate-600">{t.publications}</td>
                <td className="py-2.5 px-3 text-right text-slate-600">{t.grants}</td>
                <td className="py-2.5 px-3 text-right text-slate-600">${(28000 + Math.round(Math.random() * 10000)).toLocaleString()}</td>
                <td className="py-2.5 px-3 text-right">
                  <span className="text-emerald-600 font-semibold">{(2.0 + Math.random() * 2).toFixed(1)}x</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductivityTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Papers Submitted vs Accepted</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={submittedVsAccepted}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="quarter" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="submitted" name="Submitted" fill="#c7d2fe" radius={[4, 4, 0, 0]} />
              <Bar dataKey="accepted" name="Accepted" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Average Time to Publication (Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeToPublication} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis type="category" dataKey="stage" tick={{ fontSize: 11 }} stroke="#94a3b8" width={100} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} formatter={(value: number) => [`${value} days`, undefined]} />
              <Bar dataKey="days" name="Days" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Acceptance Rate Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={submittedVsAccepted.map((d) => ({ ...d, rate: Math.round((d.accepted / d.submitted) * 100) }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="quarter" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" domain={[0, 100]} tickFormatter={(v: number) => `${v}%`} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} formatter={(value: number) => [`${value}%`, undefined]} />
            <Line type="monotone" dataKey="rate" name="Acceptance Rate" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ImpactTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Publications by Journal Impact Factor</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={journalImpact} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis type="category" dataKey="journal" tick={{ fontSize: 11 }} stroke="#94a3b8" width={120} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
              <Bar dataKey="if" name="Impact Factor" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Collaboration Network</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="55%" height={250}>
              <PieChart>
                <Pie data={collabPie} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={4} dataKey="value">
                  {collabPie.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {collabPie.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-sm text-slate-600">{item.name}</span>
                  <span className="text-sm font-semibold text-slate-800 ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Cumulative Citations Growth</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={citationTrends.map((d, i) => ({ ...d, cumulative: citationTrends.slice(0, i + 1).reduce((s, c) => s + c.citations, 0) }))}>
            <defs>
              <linearGradient id="cumGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
            <Area type="monotone" dataKey="cumulative" name="Cumulative Citations" stroke="#6366f1" fill="url(#cumGrad)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function Reports() {
  const [activeTab, setActiveTab] = useState<TabType>('Overview');

  const tabContent: Record<TabType, React.ReactNode> = {
    Overview: <OverviewTab />,
    Financial: <FinancialTab />,
    Productivity: <ProductivityTab />,
    Impact: <ImpactTab />,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-500 mt-1">Comprehensive research performance insights and metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
            <FileBarChart className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {tabContent[activeTab]}

      {/* Scheduled Reports */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-800">Scheduled Reports</h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">+ New Schedule</button>
        </div>
        <div className="divide-y divide-slate-100">
          {scheduledReports.map((report) => (
            <div key={report.name} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${report.active ? 'bg-indigo-50' : 'bg-slate-50'}`}>
                  <Calendar className={`w-4 h-4 ${report.active ? 'text-indigo-600' : 'text-slate-400'}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{report.name}</p>
                  <p className="text-xs text-slate-400">{report.frequency} &middot; Next: {new Date(report.next).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Mail className="w-3.5 h-3.5" />
                  {report.recipients} recipients
                </div>
                <button className={`p-1.5 rounded-md ${report.active ? 'text-indigo-600 hover:bg-indigo-50' : 'text-slate-400 hover:bg-slate-50'}`}>
                  {report.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button className="p-1.5 rounded-md text-slate-400 hover:bg-slate-50">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
