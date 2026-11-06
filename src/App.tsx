import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Finance from './pages/Finance'
import Grants from './pages/Grants'
import Teams from './pages/Teams'
import Timeline from './pages/Timeline'
import Documents from './pages/Documents'
import Reports from './pages/Reports'
import AIAssistant from './pages/AIAssistant'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="finance" element={<Finance />} />
        <Route path="grants" element={<Grants />} />
        <Route path="teams" element={<Teams />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="documents" element={<Documents />} />
        <Route path="reports" element={<Reports />} />
        <Route path="ai-assistant" element={<AIAssistant />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
