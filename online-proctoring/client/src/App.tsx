import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProctorProvider } from './sdk/ProctorProvider';
import { LocaleProvider } from './i18n/LocaleContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Eager-loaded — always needed immediately
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';

// Lazy-loaded — loaded on demand
const ExamPage = lazy(() => import('./pages/ExamPage'));
const TopicsPage = lazy(() => import('./pages/TopicsPage'));
const RandomPage = lazy(() => import('./pages/RandomPage'));
const RoleSelectionPage = lazy(() => import('./pages/RoleSelectionPage'));
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard'));
const CreateClassPage = lazy(() => import('./pages/CreateClassPage'));
const ClassModePage = lazy(() => import('./pages/ClassModePage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const StudentDetail = lazy(() => import('./pages/StudentDetail'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const UpdatePasswordPage = lazy(() => import('./pages/UpdatePasswordPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ClassDetailPage = lazy(() => import('./pages/ClassDetailPage'));
const TeacherPaperList = lazy(() => import('./pages/TeacherPaperList'));
const TeacherPaperEdit = lazy(() => import('./pages/TeacherPaperEdit'));
const StudentAnalyticsPage = lazy(() => import('./pages/StudentAnalyticsPage'));
const PastPaperLibraryPage = lazy(() => import('./pages/PastPaperLibraryPage'));
const AdmissionTestsPage = lazy(() => import('./pages/AdmissionTestsPage'));
const AdminUsersPage = lazy(() => import('./pages/AdminUsersPage'));

function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: '#94a3b8', fontSize: 14,
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 32, height: 32, margin: '0 auto 12px',
          border: '3px solid #e2e8f0', borderTopColor: '#1e40af',
          borderRadius: '50%', animation: 'spin 0.8s linear infinite',
        }} />
        Loading...
        <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
    <BrowserRouter>
      <ProctorProvider>
        <LocaleProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Landing page — public */}
              <Route path="/" element={<HomePage />} />
              {/* Student / Admin routes */}
              <Route path="/exam" element={<ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}><ExamPage /></ProtectedRoute>} />
              <Route path="/topics" element={<ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}><TopicsPage /></ProtectedRoute>} />
              <Route path="/random" element={<ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}><RandomPage /></ProtectedRoute>} />
              <Route path="/class-mode" element={<ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}><ClassModePage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              {/* Past Paper Library — accessible to all */}
              <Route path="/past-papers" element={<ProtectedRoute><PastPaperLibraryPage /></ProtectedRoute>} />
              <Route path="/admission-tests" element={<ProtectedRoute><AdmissionTestsPage /></ProtectedRoute>} />
              <Route path="/admission-tests/:testId" element={<ProtectedRoute><AdmissionTestsPage /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute allowedRoles={['student', 'admin']}><StudentAnalyticsPage /></ProtectedRoute>} />
              {/* Role selection — any authenticated user */}
              <Route path="/select-role" element={<ProtectedRoute><RoleSelectionPage /></ProtectedRoute>} />
              {/* Teacher/admin-only routes */}
              <Route path="/teacher" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><TeacherDashboard /></ProtectedRoute>} />
              <Route path="/teacher/class/new" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><CreateClassPage /></ProtectedRoute>} />
              <Route path="/teacher/class/:classId" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><ClassDetailPage /></ProtectedRoute>} />
              <Route path="/teacher/papers" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><TeacherPaperList /></ProtectedRoute>} />
              <Route path="/teacher/papers/new" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><TeacherPaperEdit /></ProtectedRoute>} />
              <Route path="/teacher/papers/:paperId/edit" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><TeacherPaperEdit /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/student/:sessionId" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><StudentDetail /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><AdminUsersPage /></ProtectedRoute>} />
              <Route path="/my-session/:sessionId" element={<ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}><StudentDetail /></ProtectedRoute>} />
              {/* Public routes */}
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/update-password" element={<UpdatePasswordPage />} />
            </Routes>
          </Suspense>
        </LocaleProvider>
      </ProctorProvider>
    </BrowserRouter>
    </ErrorBoundary>
  );
}
