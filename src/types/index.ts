export type ProjectStatus = 'active' | 'completed' | 'on-hold' | 'planning';
export type GrantStatus = 'open' | 'closing-soon' | 'closed' | 'awarded';
export type DocumentStatus = 'draft' | 'review' | 'approved' | 'published';
export type FinancialType = 'income' | 'expense';
export type FinancialStatus = 'approved' | 'pending' | 'rejected';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  pi: string;
  area: string;
  budget: number;
  spent: number;
  progress: number;
  startDate: string;
  endDate: string;
  team: string[];
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  initials: string;
  department: string;
  projects: string[];
  avatarColor: string;
}

export interface FinancialRecord {
  id: string;
  projectId: string;
  projectTitle: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  type: FinancialType;
  status: FinancialStatus;
}

export interface Grant {
  id: string;
  title: string;
  agency: string;
  amount: number;
  deadline: string;
  status: GrantStatus;
  matchRate: number;
  description: string;
  requirements: string[];
  category: string;
}

export interface Document {
  id: string;
  title: string;
  type: string;
  project: string;
  author: string;
  date: string;
  size: string;
  status: DocumentStatus;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  project: string;
  type: 'milestone' | 'deadline' | 'meeting' | 'publication' | 'review' | 'submission';
  description: string;
}

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalBudget: number;
  totalSpent: number;
  teamMembers: number;
  publications: number;
  pendingGrants: number;
  completionRate: number;
}

export interface MonthlyFinance {
  month: string;
  income: number;
  expenses: number;
}

export interface BudgetByArea {
  area: string;
  budget: number;
  spent: number;
}
