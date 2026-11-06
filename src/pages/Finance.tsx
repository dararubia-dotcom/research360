import { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Wallet,
  Activity,
  Download,
  Plus,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Search,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const monthlyExpenditure = [
  { month: 'Jun', Personnel: 82000, Equipment: 24000, Travel: 8500, Materials: 12000, Overhead: 15000 },
  { month: 'Jul', Personnel: 85000, Equipment: 18000, Travel: 12000, Materials: 9500, Overhead: 15000 },
  { month: 'Aug', Personnel: 87000, Equipment: 32000, Travel: 6000, Materials: 14000, Overhead: 15500 },
  { month: 'Sep', Personnel: 84000, Equipment: 15000, Travel: 18000, Materials: 11000, Overhead: 16000 },
  { month: 'Oct', Personnel: 89000, Equipment: 28000, Travel: 9500, Materials: 13500, Overhead: 16000 },
  { month: 'Nov', Personnel: 91000, Equipment: 21000, Travel: 7000, Materials: 10000, Overhead: 16500 },
];

const projectBudgets = [
  { name: 'GenomeMap Pro', budget: 480000, spent: 312000, color: '#6366f1' },
  { name: 'ClimateShift AI', budget: 350000, spent: 198000, color: '#3b82f6' },
  { name: 'NeuroLink Study', budget: 620000, spent: 445000, color: '#8b5cf6' },
  { name: 'OceanPulse', budget: 280000, spent: 142000, color: '#06b6d4' },
  { name: 'BioSynth Lab', budget: 195000, spent: 87000, color: '#10b981' },
];

interface Transaction {
  id: string;
  date: string;
  description: string;
  project: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'completed' | 'pending' | 'processing';
}

const transactions: Transaction[] = [
  { id: 'TXN-001', date: '2026-11-05', description: 'NSF Grant Disbursement Q4', project: 'GenomeMap Pro', category: 'Grant Income', amount: 125000, type: 'income', status: 'completed' },
  { id: 'TXN-002', date: '2026-11-04', description: 'Lab Equipment - Sequencer Maintenance', project: 'GenomeMap Pro', category: 'Equipment', amount: 18500, type: 'expense', status: 'completed' },
  { id: 'TXN-003', date: '2026-11-03', description: 'Conference Registration - AGU Fall Meeting', project: 'ClimateShift AI', category: 'Travel', amount: 4200, type: 'expense', status: 'completed' },
  { id: 'TXN-004', date: '2026-11-02', description: 'EU Horizon Europe Payment', project: 'NeuroLink Study', category: 'Grant Income', amount: 95000, type: 'income', status: 'processing' },
  { id: 'TXN-005', date: '2026-11-01', description: 'Research Assistant Salaries - November', project: 'All Projects', category: 'Personnel', amount: 42000, type: 'expense', status: 'pending' },
  { id: 'TXN-006', date: '2026-10-30', description: 'Cloud Computing Credits - AWS', project: 'ClimateShift AI', category: 'Overhead', amount: 8700, type: 'expense', status: 'completed' },
  { id: 'TXN-007', date: '2026-10-28', description: 'Chemical Reagents & Supplies', project: 'BioSynth Lab', category: 'Materials', amount: 6300, type: 'expense', status: 'completed' },
  { id: 'TXN-008', date: '2026-10-26', description: 'NIH Supplement Award', project: 'NeuroLink Study', category: 'Grant Income', amount: 75000, type: 'income', status: 'completed' },
  { id: 'TXN-009', date: '2026-10-25', description: 'Field Equipment - Ocean Sensors', project: 'OceanPulse', category: 'Equipment', amount: 22000, type: 'expense', status: 'completed' },
  { id: 'TXN-010', date: '2026-10-23', description: 'International Collaboration Travel', project: 'GenomeMap Pro', category: 'Travel', amount: 7800, type: 'expense', status: 'completed' },
  { id: 'TXN-011', date: '2026-10-20', description: 'Publication Fees - Nature Genetics', project: 'GenomeMap Pro', category: 'Overhead', amount: 3200, type: 'expense', status: 'completed' },
  { id: 'TXN-012', date: '2026-10-18', description: 'Private Foundation Grant', project: 'OceanPulse', category: 'Grant Income', amount: 60000, type: 'income', status: 'completed' },
];

const categories = ['All', 'Personnel', 'Equipment', 'Travel', 'Materials', 'Overhead', 'Grant Income'];
const projects = ['All Projects', 'GenomeMap Pro', 'ClimateShift AI', 'NeuroLink Study', 'OceanPulse', 'BioSynth Lab'];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const statusStyles: Record<string, string> = {
  completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  pending: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  processing: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
};

export default function Finance() {
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const totalBudget = projectBudgets.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projectBudgets.reduce((s, p) => s + p.spent, 0);
  const balance = totalBudget - totalSpent;
  const monthlyAvg = monthlyExpenditure.reduce((s, m) => s + m.Personnel + m.Equipment + m.Travel + m.Materials + m.Overhead, 0) / monthlyExpenditure.length;

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      if (typeFilter !== 'all' && t.type !== typeFilter) return false;
      if (projectFilter !== 'All Projects' && t.project !== projectFilter) return false;
      if (categoryFilter !== 'All' && t.category !== categoryFilter) return false;
      if (searchQuery && !t.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [typeFilter, projectFilter, categoryFilter, searchQuery]);

  const filteredIncome = filteredTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const filteredExpense = filteredTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
          <p className="mt-1 text-sm text-gray-500">Track budgets, expenditures, and funding across all research projects</p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50">
            <Download className="h-4 w-4" />
            Export Report
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700">
            <Plus className="h-4 w-4" />
            New Transaction
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-indigo-50 p-2.5">
              <Wallet className="h-5 w-5 text-indigo-600" />
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
              <ArrowUpRight className="h-3 w-3" /> +12.5%
            </span>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">{formatCurrency(totalBudget)}</p>
          <p className="mt-1 text-sm text-gray-500">Total Budget</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-rose-50 p-2.5">
              <TrendingDown className="h-5 w-5 text-rose-600" />
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700">
              <ArrowDownRight className="h-3 w-3" /> {((totalSpent / totalBudget) * 100).toFixed(1)}%
            </span>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">{formatCurrency(totalSpent)}</p>
          <p className="mt-1 text-sm text-gray-500">Total Expenditure</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-emerald-50 p-2.5">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
              <TrendingUp className="h-3 w-3" /> Healthy
            </span>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">{formatCurrency(balance)}</p>
          <p className="mt-1 text-sm text-gray-500">Available Balance</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-amber-50 p-2.5">
              <Activity className="h-5 w-5 text-amber-600" />
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
              <ArrowDownRight className="h-3 w-3" /> -3.2%
            </span>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">{formatCurrency(monthlyAvg)}</p>
          <p className="mt-1 text-sm text-gray-500">Monthly Burn Rate</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Monthly Expenditure Stacked Bar */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">Monthly Expenditure by Category</h3>
          <p className="mt-1 text-sm text-gray-500">Last 6 months breakdown</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyExpenditure} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / .07)' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="Personnel" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Equipment" stackId="a" fill="#3b82f6" />
                <Bar dataKey="Travel" stackId="a" fill="#06b6d4" />
                <Bar dataKey="Materials" stackId="a" fill="#10b981" />
                <Bar dataKey="Overhead" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget by Project */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">Budget Allocation by Project</h3>
          <p className="mt-1 text-sm text-gray-500">Budget vs. expenditure per project</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectBudgets} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} width={110} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / .07)' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="budget" name="Budget" fill="#e0e7ff" radius={[0, 4, 4, 0]}>
                  {projectBudgets.map((entry, index) => (
                    <Cell key={index} fill={entry.color + '30'} />
                  ))}
                </Bar>
                <Bar dataKey="spent" name="Spent" fill="#6366f1" radius={[0, 4, 4, 0]}>
                  {projectBudgets.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h3 className="text-base font-semibold text-gray-900">Transaction History</h3>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
                {(['all', 'income', 'expense'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition ${
                      typeFilter === t
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <select
                value={projectFilter}
                onChange={e => setProjectFilter(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
              >
                {projects.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Description</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Project</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Category</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTransactions.map(txn => (
                <tr key={txn.id} className="transition hover:bg-gray-50/50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(txn.date)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                        txn.type === 'income' ? 'bg-emerald-50' : 'bg-rose-50'
                      }`}>
                        {txn.type === 'income' ? (
                          <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-rose-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{txn.description}</p>
                        <p className="text-xs text-gray-400">{txn.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{txn.project}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                      <Filter className="h-3 w-3" />
                      {txn.category}
                    </span>
                  </td>
                  <td className={`whitespace-nowrap px-6 py-4 text-right text-sm font-semibold ${
                    txn.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[txn.status]}`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 bg-gray-50/80">
                <td colSpan={4} className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Showing {filteredTransactions.length} of {transactions.length} transactions
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Income: <span className="font-semibold text-emerald-600">+{formatCurrency(filteredIncome)}</span></p>
                    <p className="text-xs text-gray-500">Expense: <span className="font-semibold text-rose-600">-{formatCurrency(filteredExpense)}</span></p>
                    <p className="text-sm font-bold text-gray-900">Net: {formatCurrency(filteredIncome - filteredExpense)}</p>
                  </div>
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
