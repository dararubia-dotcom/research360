import { useState, useMemo } from 'react';
import {
  Award,
  Calendar,
  DollarSign,
  ExternalLink,
  FileText,
  Bookmark,
  TrendingUp,
  ChevronRight,
  Search,
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle,
  Timer,
  Send,
  Plus,
  Target,
} from 'lucide-react';

type GrantStatus = 'open' | 'submitted' | 'under_review' | 'revision' | 'awarded' | 'archived';

interface Grant {
  id: string;
  title: string;
  agency: string;
  agencyAcronym: string;
  agencyColor: string;
  amount: number;
  deadline: string;
  matchRate: number;
  description: string;
  requirements: string[];
  status: GrantStatus;
  submittedDate?: string;
  awardedDate?: string;
  awardedAmount?: number;
  projectLinked?: string;
}

const grants: Grant[] = [
  {
    id: 'GR-001',
    title: 'Frontiers in Genomic Medicine Research Initiative',
    agency: 'National Science Foundation',
    agencyAcronym: 'NSF',
    agencyColor: '#1e40af',
    amount: 750000,
    deadline: '2026-12-15',
    matchRate: 92,
    description: 'Supporting innovative research that advances understanding of genomic mechanisms in precision medicine, with emphasis on computational approaches and multi-omics integration.',
    requirements: ['PI with tenure track', 'Multi-institutional', 'Data sharing plan', '3-year timeline'],
    status: 'open',
  },
  {
    id: 'GR-002',
    title: 'Climate Change Adaptation & AI Modeling Program',
    agency: 'European Research Council',
    agencyAcronym: 'ERC',
    agencyColor: '#0369a1',
    amount: 1200000,
    deadline: '2026-11-28',
    matchRate: 87,
    description: 'Funding for projects developing AI-driven climate models to predict regional climate change impacts and inform adaptation strategies across European ecosystems.',
    requirements: ['PhD required', 'EU-based institution', 'Open access policy', 'Ethics review'],
    status: 'open',
  },
  {
    id: 'GR-003',
    title: 'Neuroscience & Brain-Computer Interface Innovation',
    agency: 'National Institutes of Health',
    agencyAcronym: 'NIH',
    agencyColor: '#0e7490',
    amount: 520000,
    deadline: '2027-01-31',
    matchRate: 78,
    description: 'R01-equivalent funding for neuroscience research exploring novel brain-computer interface technologies with translational potential for neurological disorders.',
    requirements: ['IRB approval', 'Clinical partnership', 'Preliminary data', '5-year plan'],
    status: 'open',
  },
  {
    id: 'GR-004',
    title: 'Ocean Health & Marine Biodiversity Monitoring',
    agency: 'World Wildlife Fund',
    agencyAcronym: 'WWF',
    agencyColor: '#059669',
    amount: 380000,
    deadline: '2026-11-12',
    matchRate: 95,
    description: 'Supporting deployment of IoT sensor networks and AI-driven analytics for real-time monitoring of marine ecosystems and biodiversity conservation.',
    requirements: ['Environmental impact', 'Community engagement', 'Open-source tools'],
    status: 'open',
  },
  {
    id: 'GR-005',
    title: 'Sustainable Biotechnology Manufacturing',
    agency: 'Department of Energy',
    agencyAcronym: 'DOE',
    agencyColor: '#7c3aed',
    amount: 640000,
    deadline: '2027-03-15',
    matchRate: 71,
    description: 'Research and development of sustainable bioprocessing technologies for green chemical manufacturing and renewable biofuel production.',
    requirements: ['US institution', 'Industry partner', 'TRL 3-5', 'Cost sharing 20%'],
    status: 'open',
  },
  {
    id: 'GR-006',
    title: 'Advanced Genomics Analysis Pipeline',
    agency: 'National Institutes of Health',
    agencyAcronym: 'NIH',
    agencyColor: '#0e7490',
    amount: 480000,
    deadline: '2026-09-30',
    matchRate: 88,
    description: 'Development of next-generation bioinformatics pipelines for whole-genome sequencing analysis in large population cohorts.',
    requirements: ['R21 mechanism', 'Bioinformatics focus', 'Training component'],
    status: 'submitted',
    submittedDate: '2026-09-15',
    projectLinked: 'GenomeMap Pro',
  },
  {
    id: 'GR-007',
    title: 'AI for Climate Resilience Program',
    agency: 'European Commission',
    agencyAcronym: 'EC',
    agencyColor: '#0369a1',
    amount: 890000,
    deadline: '2026-08-20',
    matchRate: 91,
    description: 'Horizon Europe call for AI-driven solutions to enhance climate resilience in urban environments and critical infrastructure.',
    requirements: ['Consortium required', 'Min. 3 EU countries', 'TRL 4-7'],
    status: 'under_review',
    submittedDate: '2026-08-10',
    projectLinked: 'ClimateShift AI',
  },
  {
    id: 'GR-008',
    title: 'Neural Interface Safety Standards Research',
    agency: 'National Science Foundation',
    agencyAcronym: 'NSF',
    agencyColor: '#1e40af',
    amount: 350000,
    deadline: '2026-07-15',
    matchRate: 82,
    description: 'Research into safety standards and biocompatibility testing for next-generation neural interface devices.',
    requirements: ['FDA coordination', 'Safety testing', 'Standards development'],
    status: 'revision',
    submittedDate: '2026-07-01',
    projectLinked: 'NeuroLink Study',
  },
  {
    id: 'GR-009',
    title: 'Precision Medicine Data Infrastructure',
    agency: 'National Institutes of Health',
    agencyAcronym: 'NIH',
    agencyColor: '#0e7490',
    amount: 620000,
    deadline: '2026-03-01',
    matchRate: 94,
    description: 'Building scalable data infrastructure for precision medicine research, integrating genomic, clinical, and environmental data.',
    requirements: ['U01 mechanism', 'Data standards', 'Interoperability'],
    status: 'awarded',
    submittedDate: '2026-02-15',
    awardedDate: '2026-05-20',
    awardedAmount: 580000,
    projectLinked: 'GenomeMap Pro',
  },
  {
    id: 'GR-010',
    title: 'Marine Ecosystem Monitoring Network',
    agency: 'NOAA',
    agencyAcronym: 'NOAA',
    agencyColor: '#0284c7',
    amount: 420000,
    deadline: '2026-04-15',
    matchRate: 90,
    description: 'Establishing a distributed network of marine monitoring stations with real-time data transmission capabilities.',
    requirements: ['Coastal institution', 'Sensor deployment', 'Data sharing'],
    status: 'awarded',
    submittedDate: '2026-03-28',
    awardedDate: '2026-07-10',
    awardedAmount: 395000,
    projectLinked: 'OceanPulse',
  },
  {
    id: 'GR-011',
    title: 'Quantum Computing for Drug Discovery',
    agency: 'DARPA',
    agencyAcronym: 'DARPA',
    agencyColor: '#991b1b',
    amount: 1500000,
    deadline: '2026-01-15',
    matchRate: 45,
    description: 'Exploring quantum computing approaches for accelerating molecular simulation in drug discovery pipelines.',
    requirements: ['Quantum expertise', 'Top secret clearance', 'US only'],
    status: 'archived',
  },
  {
    id: 'GR-012',
    title: 'Global Biodiversity Assessment Platform',
    agency: 'United Nations Environment',
    agencyAcronym: 'UNEP',
    agencyColor: '#166534',
    amount: 280000,
    deadline: '2025-11-30',
    matchRate: 68,
    description: 'Development of a comprehensive biodiversity assessment and reporting platform for use by member nations.',
    requirements: ['International collaboration', 'Open data', 'Capacity building'],
    status: 'archived',
  },
];

type TabKey = 'open' | 'active' | 'awarded' | 'archived';

const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: 'open', label: 'Open Opportunities', icon: Target },
  { key: 'active', label: 'Active Applications', icon: Send },
  { key: 'awarded', label: 'Awarded', icon: Award },
  { key: 'archived', label: 'Archived', icon: FileText },
];

function formatCurrency(amount: number): string {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  return `$${amount}`;
}

function formatFullCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
}

function getDaysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getDeadlineColor(days: number): string {
  if (days < 0) return 'text-gray-400';
  if (days <= 14) return 'text-rose-600';
  if (days <= 30) return 'text-amber-600';
  return 'text-emerald-600';
}

function getDeadlineBg(days: number): string {
  if (days < 0) return 'bg-gray-50';
  if (days <= 14) return 'bg-rose-50';
  if (days <= 30) return 'bg-amber-50';
  return 'bg-emerald-50';
}

function getMatchColor(rate: number): string {
  if (rate >= 85) return 'text-emerald-600';
  if (rate >= 70) return 'text-blue-600';
  if (rate >= 50) return 'text-amber-600';
  return 'text-gray-500';
}

function getMatchBg(rate: number): string {
  if (rate >= 85) return 'bg-emerald-500';
  if (rate >= 70) return 'bg-blue-500';
  if (rate >= 50) return 'bg-amber-500';
  return 'bg-gray-400';
}

const applicationStatusConfig: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  submitted: { label: 'Submitted', icon: Send, color: 'text-blue-700', bg: 'bg-blue-50' },
  under_review: { label: 'Under Review', icon: Timer, color: 'text-amber-700', bg: 'bg-amber-50' },
  revision: { label: 'Revision Requested', icon: AlertCircle, color: 'text-rose-700', bg: 'bg-rose-50' },
};

export default function Grants() {
  const [activeTab, setActiveTab] = useState<TabKey>('open');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'deadline' | 'amount' | 'match'>('deadline');

  const openGrants = grants.filter(g => g.status === 'open');
  const activeGrants = grants.filter(g => ['submitted', 'under_review', 'revision'].includes(g.status));
  const awardedGrants = grants.filter(g => g.status === 'awarded');
  const archivedGrants = grants.filter(g => g.status === 'archived');

  const totalRequested = activeGrants.reduce((s, g) => s + g.amount, 0);
  const totalAwarded = awardedGrants.reduce((s, g) => s + (g.awardedAmount || 0), 0);
  const successRate = grants.filter(g => g.status !== 'open' && g.status !== 'archived').length > 0
    ? Math.round((awardedGrants.length / grants.filter(g => g.status !== 'open' && g.status !== 'archived').length) * 100)
    : 0;

  const currentGrants = useMemo(() => {
    let list: Grant[];
    switch (activeTab) {
      case 'open': list = openGrants; break;
      case 'active': list = activeGrants; break;
      case 'awarded': list = awardedGrants; break;
      case 'archived': list = archivedGrants; break;
    }

    if (searchQuery) {
      list = list.filter(g =>
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.agency.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeTab === 'open') {
      list = [...list].sort((a, b) => {
        if (sortBy === 'deadline') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        if (sortBy === 'amount') return b.amount - a.amount;
        return b.matchRate - a.matchRate;
      });
    }

    return list;
  }, [activeTab, searchQuery, sortBy]);

  const tabCounts: Record<TabKey, number> = {
    open: openGrants.length,
    active: activeGrants.length,
    awarded: awardedGrants.length,
    archived: archivedGrants.length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grants & Funding</h1>
          <p className="mt-1 text-sm text-gray-500">Discover funding opportunities and track grant applications</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          Track New Grant
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2.5">
              <Send className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeGrants.length}</p>
              <p className="text-sm text-gray-500">Active Applications</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-indigo-50 p-2.5">
              <DollarSign className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRequested)}</p>
              <p className="text-sm text-gray-500">Total Requested</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-2.5">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{successRate}%</p>
              <p className="text-sm text-gray-500">Success Rate</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-50 p-2.5">
              <Award className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAwarded)}</p>
              <p className="text-sm text-gray-500">Total Awarded</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 pt-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`inline-flex items-center gap-2 rounded-t-lg border-b-2 px-4 py-3 text-sm font-medium transition ${
                      activeTab === tab.key
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                    <span className={`ml-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                      activeTab === tab.key ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tabCounts[tab.key]}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3 pb-3 sm:pb-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search grants..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-56 rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              {activeTab === 'open' && (
                <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-1">
                  <SlidersHorizontal className="ml-2 h-4 w-4 text-gray-400" />
                  {(['deadline', 'amount', 'match'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setSortBy(s)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition ${
                        sortBy === s ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {s === 'match' ? 'Match' : s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grant Cards */}
        <div className="divide-y divide-gray-50 p-6">
          {currentGrants.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FileText className="h-12 w-12 text-gray-300" />
              <p className="mt-4 text-sm font-medium text-gray-500">No grants found in this category</p>
              <p className="mt-1 text-xs text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentGrants.map(grant => {
                const daysLeft = getDaysUntil(grant.deadline);
                const deadlineColor = getDeadlineColor(daysLeft);
                const deadlineBg = getDeadlineBg(daysLeft);
                const matchColor = getMatchColor(grant.matchRate);
                const matchBg = getMatchBg(grant.matchRate);
                const appStatus = applicationStatusConfig[grant.status];

                return (
                  <div key={grant.id} className="group rounded-xl border border-gray-100 bg-white p-5 transition hover:border-indigo-100 hover:shadow-md">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      {/* Left: Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          {/* Agency Badge */}
                          <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm"
                            style={{ backgroundColor: grant.agencyColor }}
                          >
                            {grant.agencyAcronym.slice(0, 3)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-semibold text-gray-900 group-hover:text-indigo-700 transition">{grant.title}</h3>
                              {appStatus && (
                                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${appStatus.bg} ${appStatus.color}`}>
                                  <appStatus.icon className="h-3 w-3" />
                                  {appStatus.label}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">{grant.agency}</p>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-2">{grant.description}</p>

                            {/* Requirements */}
                            <div className="mt-3 flex flex-wrap gap-2">
                              {grant.requirements.map(req => (
                                <span key={req} className="rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200/80">
                                  {req}
                                </span>
                              ))}
                            </div>

                            {/* Linked project */}
                            {grant.projectLinked && (
                              <p className="mt-3 flex items-center gap-1.5 text-xs text-indigo-600">
                                <ChevronRight className="h-3 w-3" />
                                Linked to <span className="font-semibold">{grant.projectLinked}</span>
                              </p>
                            )}

                            {/* Awarded info */}
                            {grant.status === 'awarded' && grant.awardedAmount && (
                              <div className="mt-3 flex items-center gap-4 rounded-lg bg-emerald-50 px-4 py-2.5">
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                  <span className="text-sm font-semibold text-emerald-700">
                                    Awarded {formatFullCurrency(grant.awardedAmount)}
                                  </span>
                                </div>
                                {grant.awardedDate && (
                                  <span className="text-xs text-emerald-600">
                                    on {new Date(grant.awardedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Stats + Actions */}
                      <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-end lg:gap-3">
                        {/* Amount */}
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">{formatFullCurrency(grant.amount)}</p>
                          <p className="text-xs text-gray-400">Funding Amount</p>
                        </div>

                        {/* Deadline & Match */}
                        <div className="flex items-center gap-3">
                          {(grant.status === 'open' || grant.status === 'archived') && (
                            <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${deadlineBg} ${deadlineColor}`}>
                              <Calendar className="h-3.5 w-3.5" />
                              {daysLeft < 0 ? 'Expired' : daysLeft === 0 ? 'Today' : `${daysLeft}d left`}
                            </div>
                          )}
                          {grant.status === 'open' && (
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-100">
                                <div className={`h-full rounded-full ${matchBg}`} style={{ width: `${grant.matchRate}%` }} />
                              </div>
                              <span className={`text-xs font-semibold ${matchColor}`}>{grant.matchRate}%</span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        {grant.status === 'open' && (
                          <div className="flex gap-2">
                            <button className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50">
                              <Bookmark className="h-3.5 w-3.5" />
                              Save
                            </button>
                            <button className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-indigo-700">
                              <ExternalLink className="h-3.5 w-3.5" />
                              Apply
                            </button>
                          </div>
                        )}
                        {['submitted', 'under_review', 'revision'].includes(grant.status) && (
                          <button className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50">
                            <FileText className="h-3.5 w-3.5" />
                            View Application
                          </button>
                        )}
                        {grant.status === 'awarded' && (
                          <button className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            View Award
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
