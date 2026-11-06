import { useState } from 'react';
import {
  FileText,
  FileSpreadsheet,
  File,
  FileCheck,
  Upload,
  Search,
  Filter,
  Eye,
  Download,
  Share2,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  MoreVertical,
  Plus,
  Grid3X3,
  List,
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'Paper' | 'Report' | 'Dataset' | 'Protocol' | 'Grant Application';
  project: string;
  author: string;
  date: string;
  size: string;
  status: 'Draft' | 'Under Review' | 'Approved' | 'Published';
}

const documents: Document[] = [
  { id: '1', name: 'Genomic Markers in Tropical Diseases — Draft v3.2', type: 'Paper', project: 'GenomeTrop', author: 'Dr. Elena Vasquez', date: '2026-11-01', size: '4.2 MB', status: 'Under Review' },
  { id: '2', name: 'Q3 2026 Financial Report — Climate Modeling', type: 'Report', project: 'ClimateAI', author: 'Dr. James Chen', date: '2026-10-28', size: '1.8 MB', status: 'Approved' },
  { id: '3', name: 'Patient Cohort Dataset — Anonymized (n=12,450)', type: 'Dataset', project: 'NeuroPath', author: 'Dr. Aisha Patel', date: '2026-10-25', size: '256 MB', status: 'Published' },
  { id: '4', name: 'CRISPR Protocol v2.1 — Updated Safety Guidelines', type: 'Protocol', project: 'GenomeTrop', author: 'Dr. Marcus Webb', date: '2026-10-22', size: '890 KB', status: 'Approved' },
  { id: '5', name: 'NSF Grant Proposal — Quantum Biosensors 2027', type: 'Grant Application', project: 'QuantumBio', author: 'Dr. Sofia Andersson', date: '2026-10-20', size: '3.1 MB', status: 'Draft' },
  { id: '6', name: 'Deep Ocean Microbiome Sequencing Results', type: 'Dataset', project: 'OceanMicro', author: 'Dr. Kenji Tanaka', date: '2026-10-18', size: '1.2 GB', status: 'Published' },
  { id: '7', name: 'Machine Learning Pipeline Documentation', type: 'Report', project: 'ClimateAI', author: 'Dr. James Chen', date: '2026-10-15', size: '2.4 MB', status: 'Approved' },
  { id: '8', name: 'Ethical Review Board Submission — NeuroPath Phase II', type: 'Protocol', project: 'NeuroPath', author: 'Dr. Aisha Patel', date: '2026-10-12', size: '1.5 MB', status: 'Under Review' },
  { id: '9', name: 'Annual Progress Report — GenomeTrop Consortium', type: 'Report', project: 'GenomeTrop', author: 'Dr. Elena Vasquez', date: '2026-10-10', size: '5.7 MB', status: 'Draft' },
  { id: '10', name: 'Coral Reef Biodiversity Assessment — Raw Data', type: 'Dataset', project: 'OceanMicro', author: 'Dr. Kenji Tanaka', date: '2026-10-08', size: '890 MB', status: 'Published' },
  { id: '11', name: 'NIH R01 Renewal — Neuropathology Biomarkers', type: 'Grant Application', project: 'NeuroPath', author: 'Dr. Aisha Patel', date: '2026-10-05', size: '4.8 MB', status: 'Under Review' },
  { id: '12', name: 'Quantum Dot Synthesis Protocol — Revised', type: 'Protocol', project: 'QuantumBio', author: 'Dr. Sofia Andersson', date: '2026-10-02', size: '670 KB', status: 'Approved' },
];

const folderTree = [
  {
    name: 'By Project',
    open: true,
    children: [
      { name: 'GenomeTrop', count: 3 },
      { name: 'ClimateAI', count: 2 },
      { name: 'NeuroPath', count: 3 },
      { name: 'QuantumBio', count: 2 },
      { name: 'OceanMicro', count: 2 },
    ],
  },
  { name: 'Shared Documents', open: false, children: [{ name: 'Templates', count: 8 }, { name: 'Policies', count: 4 }] },
  { name: 'Templates', open: false, children: [{ name: 'Grant Templates', count: 5 }, { name: 'Report Templates', count: 3 }] },
];

const typeIcons: Record<Document['type'], React.ReactNode> = {
  Paper: <FileText className="w-5 h-5 text-blue-500" />,
  Report: <FileCheck className="w-5 h-5 text-emerald-500" />,
  Dataset: <FileSpreadsheet className="w-5 h-5 text-purple-500" />,
  Protocol: <File className="w-5 h-5 text-amber-500" />,
  'Grant Application': <FileText className="w-5 h-5 text-rose-500" />,
};

const typeBadgeColors: Record<Document['type'], string> = {
  Paper: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  Report: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Dataset: 'bg-purple-50 text-purple-700 ring-purple-600/20',
  Protocol: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  'Grant Application': 'bg-rose-50 text-rose-700 ring-rose-600/20',
};

const statusBadgeColors: Record<Document['status'], string> = {
  Draft: 'bg-slate-100 text-slate-700',
  'Under Review': 'bg-amber-100 text-amber-800',
  Approved: 'bg-emerald-100 text-emerald-800',
  Published: 'bg-blue-100 text-blue-800',
};

export default function Documents() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['By Project']));

  const types = ['All', 'Paper', 'Report', 'Dataset', 'Protocol', 'Grant Application'];

  const filtered = documents.filter((d) => {
    const matchesType = typeFilter === 'All' || d.type === typeFilter;
    const matchesSearch =
      search === '' ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.project.toLowerCase().includes(search.toLowerCase()) ||
      d.author.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const stats = {
    total: documents.length,
    papers: documents.filter((d) => d.type === 'Paper').length,
    reports: documents.filter((d) => d.type === 'Report').length,
    datasets: documents.filter((d) => d.type === 'Dataset').length,
    pending: documents.filter((d) => d.status === 'Under Review').length,
  };

  const toggleFolder = (name: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Document Management</h1>
          <p className="text-slate-500 mt-1">Organize, review, and collaborate on research documents</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: 'Total Documents', value: stats.total, icon: File, color: 'text-slate-600' },
          { label: 'Papers', value: stats.papers, icon: FileText, color: 'text-blue-600' },
          { label: 'Reports', value: stats.reports, icon: FileCheck, color: 'text-emerald-600' },
          { label: 'Datasets', value: stats.datasets, icon: FileSpreadsheet, color: 'text-purple-600' },
          { label: 'Pending Review', value: stats.pending, icon: FileText, color: 'text-amber-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-slate-50 ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Folder Tree */}
        <div className="w-56 shrink-0 bg-white rounded-xl border border-slate-200 p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Folders</h3>
          <div className="space-y-1">
            {folderTree.map((folder) => (
              <div key={folder.name}>
                <button
                  onClick={() => toggleFolder(folder.name)}
                  className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
                >
                  {expandedFolders.has(folder.name) ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  {expandedFolders.has(folder.name) ? (
                    <FolderOpen className="w-4 h-4 text-indigo-500" />
                  ) : (
                    <Folder className="w-4 h-4 text-slate-400" />
                  )}
                  <span className="truncate">{folder.name}</span>
                </button>
                {expandedFolders.has(folder.name) && folder.children && (
                  <div className="ml-6 mt-0.5 space-y-0.5">
                    {folder.children.map((child) => (
                      <button
                        key={child.name}
                        className="flex items-center justify-between w-full px-2 py-1 text-sm text-slate-600 hover:bg-slate-50 rounded-md transition-colors"
                      >
                        <span className="truncate">{child.name}</span>
                        <span className="text-xs text-slate-400">{child.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Filters */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search documents, projects, or authors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 bg-white"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="pl-10 pr-8 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 bg-white appearance-none cursor-pointer"
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Document List */}
          {viewMode === 'list' ? (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Project</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Author</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Size</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {typeIcons[doc.type]}
                          <span className="font-medium text-slate-800 truncate max-w-xs" title={doc.name}>
                            {doc.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${typeBadgeColors[doc.type]}`}>
                          {doc.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{doc.project}</td>
                      <td className="py-3 px-4 text-slate-600">{doc.author}</td>
                      <td className="py-3 px-4 text-slate-500">{new Date(doc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                      <td className="py-3 px-4 text-slate-500">{doc.size}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeColors[doc.status]}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600" title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600" title="Share">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600" title="More">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="py-12 text-center text-slate-400">
                  <File className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No documents match your filters</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filtered.map((doc) => (
                <div key={doc.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-slate-50">{typeIcons[doc.type]}</div>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeColors[doc.status]}`}>
                      {doc.status}
                    </span>
                  </div>
                  <h4 className="font-medium text-slate-800 text-sm mb-1 line-clamp-2">{doc.name}</h4>
                  <p className="text-xs text-slate-500 mb-3">{doc.project} &middot; {doc.author}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{new Date(doc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span>{doc.size}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-3 pt-3 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              <button className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 p-8 text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors">
                <Plus className="w-8 h-8" />
                <span className="text-sm font-medium">Upload New</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
