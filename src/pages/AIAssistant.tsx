import { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Mic,
  Paperclip,
  BookOpen,
  BarChart3,
  FileEdit,
  FileText,
  TrendingUp,
  Users,
  Sparkles,
  Lock,
  Zap,
  User,
  ChevronRight,
} from 'lucide-react';

interface Message {
  id: number;
  role: 'ai' | 'user';
  content: string;
  timestamp: string;
}

const conversation: Message[] = [
  {
    id: 1,
    role: 'ai',
    content: `Welcome to **Research360 AI** — your intelligent research assistant. I can help you with:

- **Project Analysis**: Summarize project status, identify risks, and track milestones
- **Grant Optimization**: Analyze funding opportunities, draft proposals, and manage deadlines
- **Literature Review**: Search, summarize, and cross-reference research papers
- **Budget Forecasting**: Predict expenditure trends and optimize resource allocation
- **Report Generation**: Auto-generate progress reports, financial summaries, and impact analyses

How can I assist your research today?`,
    timestamp: '10:30 AM',
  },
  {
    id: 2,
    role: 'user',
    content: 'Can you give me a summary of our active projects and their current status?',
    timestamp: '10:31 AM',
  },
  {
    id: 3,
    role: 'ai',
    content: `Here's your **Active Projects Summary** as of November 2026:

| Project | Status | Progress | Budget Util. | Key Risk |
|---------|--------|----------|--------------|----------|
| **GenomeTrop** | On Track | 72% | 68% | Sequencing delays |
| **ClimateAI** | At Risk | 45% | 82% | Over budget on compute |
| **NeuroPath** | On Track | 88% | 74% | Approaching Phase III |
| **QuantumBio** | Planning | 15% | 12% | Awaiting IRB approval |
| **OceanMicro** | On Track | 61% | 55% | Sample collection pending |

**Key Highlights:**
- **ClimateAI** is flagged — cloud computing costs are 18% above forecast. I recommend reviewing the GPU allocation strategy.
- **NeuroPath** is approaching a critical Phase III milestone on Dec 15. Ethics board review is the gating dependency.
- Overall portfolio health: **4 of 5 projects on track**, $2.4M total budget utilization at 58%.

Would you like me to drill into any specific project?`,
    timestamp: '10:31 AM',
  },
  {
    id: 4,
    role: 'user',
    content: 'What about upcoming grant deadlines? Which ones should we prioritize?',
    timestamp: '10:33 AM',
  },
  {
    id: 5,
    role: 'ai',
    content: `I've analyzed **8 upcoming grant opportunities** against your team's research profile. Here are the top priorities:

### 🔴 Urgent (< 30 days)
1. **NIH R01 Renewal — Neuropathology Biomarkers**
   - Deadline: Dec 5, 2026 (29 days)
   - Amount: $1.2M over 3 years
   - Fit Score: **94%** — Strong alignment with NeuroPath project
   - Status: Draft at 78% completion. Dr. Patel needs to finalize budget justification.

### 🟡 Upcoming (30–60 days)
2. **EU Horizon Europe — Climate Resilience**
   - Deadline: Jan 10, 2027 (65 days)
   - Amount: €2.5M consortium grant
   - Fit Score: **87%** — Good match for ClimateAI
   - Action: Need 3 consortium partners confirmed by Dec 1.

3. **NSF CAREER Award — Quantum Biosensors**
   - Deadline: Jan 15, 2027 (70 days)
   - Amount: $500K over 5 years
   - Fit Score: **91%** — Dr. Andersson's profile is ideal

### 📋 Recommendation
Focus resources on the **NIH R01** immediately — highest ROI and shortest timeline. I can draft the missing budget justification section if you'd like.

For the EU Horizon grant, I've identified 3 potential consortium partners based on co-citation analysis. Want me to prepare outreach materials?`,
    timestamp: '10:33 AM',
  },
  {
    id: 6,
    role: 'user',
    content: 'Yes, that would be great. Also, any suggestions on budget optimization across our projects?',
    timestamp: '10:35 AM',
  },
  {
    id: 7,
    role: 'ai',
    content: `I'll prepare the consortium outreach materials and have them ready by tomorrow.

Now, here's my **Budget Optimization Analysis**:

### Current State
- **Total Portfolio Budget**: $4.15M
- **Year-to-Date Spend**: $2.41M (58.1%)
- **Projected Year-End**: $3.89M (93.7% utilization)

### 🔍 Optimization Opportunities Identified

**1. Cloud Computing Consolidation** — Save ~$45,000/year
ClimateAI and GenomeTrop both run separate GPU clusters. Consolidating to a shared HPC allocation with time-scheduled access could reduce costs by 22%.

**2. Equipment Sharing** — Save ~$28,000
The sequencing equipment in GenomeTrop is utilized at 61%. OceanMicro's sequencing needs could be partially absorbed, avoiding a planned lease renewal.

**3. Personnel Reallocation** — Improve utilization
Dr. Tanaka's lab has capacity in Q1 2027. Temporarily assigning 2 postdocs to support NeuroPath's Phase III push could accelerate timeline by ~3 weeks without additional hiring.

**4. Vendor Renegotiation** — Save ~$18,000
Your reagent supplier contract is up for renewal. Based on market analysis, you can negotiate a 12-15% volume discount by consolidating orders across projects.

### 📊 Projected Impact
| Action | Annual Savings | Implementation Effort |
|--------|---------------|----------------------|
| Cloud consolidation | $45,000 | Medium (2 weeks) |
| Equipment sharing | $28,000 | Low (1 week) |
| Personnel reallocation | $0 (time savings) | Low |
| Vendor renegotiation | $18,000 | Low (1 week) |
| **Total** | **$91,000** | **~4 weeks** |

Shall I generate a detailed implementation plan for any of these recommendations?`,
    timestamp: '10:36 AM',
  },
];

const capabilities = [
  { icon: BookOpen, title: 'Literature Review', description: 'Analyze and summarize research papers across databases', color: 'bg-blue-50 text-blue-600' },
  { icon: BarChart3, title: 'Data Analysis', description: 'Statistical analysis, visualization, and pattern detection', color: 'bg-purple-50 text-purple-600' },
  { icon: FileEdit, title: 'Grant Writing', description: 'Draft and optimize grant proposals with AI assistance', color: 'bg-emerald-50 text-emerald-600' },
  { icon: FileText, title: 'Progress Reports', description: 'Auto-generate comprehensive project status reports', color: 'bg-amber-50 text-amber-600' },
  { icon: TrendingUp, title: 'Budget Forecasting', description: 'Predict expenditure trends and flag anomalies', color: 'bg-rose-50 text-rose-600' },
  { icon: Users, title: 'Collaboration Matching', description: 'Find potential collaborators via co-citation analysis', color: 'bg-indigo-50 text-indigo-600' },
];

const comingSoon = [
  { title: 'Patent Analysis', description: 'Prior art search and IP landscape mapping' },
  { title: 'Peer Review Assist', description: 'AI-guided peer review with checklist generation' },
];

function renderMarkdown(text: string) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableKey = 0;

  const flushTable = () => {
    if (tableRows.length === 0) return;
    const header = tableRows[0];
    const body = tableRows.slice(2);
    elements.push(
      <div key={`table-${tableKey++}`} className="overflow-x-auto my-2">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              {header.map((cell, i) => (
                <th key={i} className="text-left py-1.5 px-2 border-b border-white/20 font-semibold">
                  {renderInline(cell.trim())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} className="py-1 px-2 border-b border-white/10">
                    {renderInline(cell.trim())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('|')) {
      const cells = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (cells.every((c) => /^[\s:-]+$/.test(c))) {
        tableRows.push(cells);
        continue;
      }
      inTable = true;
      tableRows.push(cells);
      continue;
    }

    if (inTable) flushTable();

    if (line.startsWith('### ')) {
      elements.push(
        <p key={i} className="font-semibold mt-3 mb-1 text-sm">
          {renderInline(line.slice(4))}
        </p>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <div key={i} className="flex gap-2 ml-2 my-0.5">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-50 shrink-0" />
          <span>{renderInline(line.slice(2))}</span>
        </div>
      );
    } else if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.*)$/);
      if (match) {
        elements.push(
          <div key={i} className="flex gap-2 ml-2 my-0.5">
            <span className="font-semibold shrink-0">{match[1]}.</span>
            <span>{renderInline(match[2])}</span>
          </div>
        );
      }
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(
        <p key={i} className="my-0.5">
          {renderInline(line)}
        </p>
      );
    }
  }

  if (inTable) flushTable();
  return elements;
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={match.index} className="font-semibold">
        {match[1]}
      </strong>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

export default function AIAssistant() {
  const [messages] = useState<Message[]>(conversation);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-gradient-to-r from-indigo-50/50 to-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-800">Research360 AI</h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-semibold uppercase tracking-wide">
                  <Sparkles className="w-3 h-3" />
                  Powered by AI
                </span>
              </div>
              <p className="text-xs text-slate-500">Intelligent research assistant &middot; Online</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">
            <Zap className="w-3 h-3" />
            Demo Mode
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                msg.role === 'ai'
                  ? 'bg-gradient-to-br from-indigo-500 to-blue-600'
                  : 'bg-slate-700'
              }`}>
                {msg.role === 'ai' ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                msg.role === 'ai'
                  ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-indigo-50'
                  : 'bg-slate-100 text-slate-800'
              }`}>
                <div>{renderMarkdown(msg.content)}</div>
                <p className={`text-[10px] mt-2 ${msg.role === 'ai' ? 'text-indigo-300' : 'text-slate-400'}`}>{msg.timestamp}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-600">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl px-4 py-3">
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Research360 AI anything about your projects..."
              className="flex-1 px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 bg-white"
            />
            <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
              <Mic className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Capabilities Sidebar */}
      <div className="w-80 shrink-0 space-y-4 overflow-y-auto">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            AI Capabilities
          </h3>
          <div className="space-y-3">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="group flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all cursor-pointer"
              >
                <div className={`p-2 rounded-lg ${cap.color} shrink-0`}>
                  <cap.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-slate-700">{cap.title}</h4>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{cap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-slate-400" />
            Coming Soon
          </h3>
          <div className="space-y-2.5">
            {comingSoon.map((item) => (
              <div key={item.title} className="p-3 rounded-lg bg-slate-50 border border-slate-100 opacity-75">
                <h4 className="text-sm font-medium text-slate-600">{item.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl p-5 text-white">
          <Sparkles className="w-6 h-6 mb-3 opacity-80" />
          <h3 className="font-semibold text-sm mb-1">Upgrade to Pro</h3>
          <p className="text-xs text-indigo-200 mb-3">
            Get unlimited AI queries, advanced analytics, and priority support for your research team.
          </p>
          <button className="w-full px-3 py-2 text-sm font-semibold bg-white text-indigo-700 rounded-lg hover:bg-indigo-50 transition-colors">
            Explore Plans
          </button>
        </div>
      </div>
    </div>
  );
}
