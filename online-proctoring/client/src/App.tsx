import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProctorProvider } from './sdk/ProctorProvider';
import { LocaleProvider } from './i18n/LocaleContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ExamPage } from './pages/ExamPage';
import { TopicsPage } from './pages/TopicsPage';
import { RandomPage } from './pages/RandomPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { RoleSelectionPage } from './pages/RoleSelectionPage';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { CreateClassPage } from './pages/CreateClassPage';
import { ClassModePage } from './pages/ClassModePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { StudentDetail } from './pages/StudentDetail';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { UpdatePasswordPage } from './pages/UpdatePasswordPage';
import { ProfilePage } from './pages/ProfilePage';
import { ClassDetailPage } from './pages/ClassDetailPage';
import { TeacherPaperList } from './pages/TeacherPaperList';
import { TeacherPaperEdit } from './pages/TeacherPaperEdit';
import { StudentAnalyticsPage } from './pages/StudentAnalyticsPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { PastPaperLibraryPage } from './pages/PastPaperLibraryPage';
import { HomePage } from './pages/HomePage';
import { AdmissionTestsPage } from './pages/AdmissionTestsPage';
import { AdminUsersPage } from './pages/AdminUsersPage';

export default function App() {
  return (
    <BrowserRouter>
        <ProctorProvider>
        <LocaleProvider>
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
        </LocaleProvider>
      </ProctorProvider>
    </BrowserRouter>
  );
}
