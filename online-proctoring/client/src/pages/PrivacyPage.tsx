import { Link } from 'react-router-dom';
import { TopNav } from '../components/TopNav';
import { useLocale } from '../i18n/LocaleContext';

export function PrivacyPage() {
  const { t } = useLocale();
  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Geist', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
      <TopNav minimal />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px 60px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, color: '#111', marginBottom: 8 }}>{t('privacyPage.title')}</h1>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 32 }}>{t('privacyPage.lastUpdated')}</p>

        <Section title={t('privacyPage.section1Title')}>
          Comenius ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you use our online exam and proctoring platform. By using the Platform, you agree to the practices described in this policy.
        </Section>

        <Section title={t('privacyPage.section2Title')}>
          <strong>Account Information:</strong> When you register, we collect your full name, email address, and role (student, teacher, or administrator).
          <br /><br />
          <strong>Exam Data:</strong> We record your answers, scores, time spent per question, question navigation history, and flagging behavior during exam sessions.
          <br /><br />
          <strong>Proctoring Data:</strong> During proctored exam sessions, we collect:
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Webcam images captured at intervals throughout the exam session.</li>
            <li>Browser tab visibility and focus events (tab-switch detection).</li>
            <li>Browser type, operating system, and screen resolution information.</li>
          </ul>
          <strong>Usage Data:</strong> We collect information about how you interact with the Platform, including pages visited, features used, and session duration.
        </Section>

        <Section title={t('privacyPage.section3Title')}>
          We use the collected information to:
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Provide, maintain, and improve the Platform's functionality.</li>
            <li>Authenticate your identity and manage your account.</li>
            <li>Deliver exam content and record your responses.</li>
            <li>Monitor exam sessions for academic integrity through proctoring features.</li>
            <li>Generate performance analytics for students, teachers, and administrators.</li>
            <li>Communicate with you about your account, updates, and support inquiries.</li>
            <li>Detect, prevent, and address technical issues, fraud, or abuse.</li>
          </ul>
        </Section>

        <Section title={t('privacyPage.section4Title')}>
          <strong>Webcam Monitoring:</strong> During proctored exam sessions, your webcam captures images at periodic intervals. These images are processed to detect potential integrity violations (e.g., multiple faces, no person visible, looking away from screen). Images are stored securely and are only accessible to authorized instructors and administrators associated with your class or institution.
          <br /><br />
          <strong>Browser Activity Monitoring:</strong> The Platform detects when you switch browser tabs or lose focus on the exam window. These events are logged and included in exam session reports. Repeated or suspicious patterns may be flagged for review.
          <br /><br />
          <strong>Data Retention:</strong> Proctoring data (images and activity logs) is retained for the duration of your account's active status plus a reasonable archival period. You may request deletion by contacting us.
        </Section>

        <Section title={t('privacyPage.section5Title')}>
          We do not sell your personal information. We may share your data in the following circumstances:
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
            <li><strong>With Teachers and Administrators:</strong> Exam results, proctoring reports, and analytics are shared with the teachers or administrators of classes you are enrolled in, as required for educational assessment.</li>
            <li><strong>Service Providers:</strong> We may engage third-party services (e.g., cloud hosting, analytics) that process data on our behalf under strict confidentiality agreements.</li>
            <li><strong>Legal Compliance:</strong> We may disclose information if required by law, court order, or governmental regulation.</li>
          </ul>
        </Section>

        <Section title={t('privacyPage.section6Title')}>
          We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include encryption in transit (TLS), encryption at rest, access controls, and regular security reviews. However, no method of transmission over the internet or electronic storage is 100% secure.
        </Section>

        <Section title={t('privacyPage.section7Title')}>
          Depending on your jurisdiction, you may have the right to:
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate or incomplete data.</li>
            <li>Request deletion of your personal data.</li>
            <li>Object to or restrict certain processing activities.</li>
            <li>Request a copy of your data in a portable format.</li>
            <li>Withdraw consent where processing is based on consent.</li>
          </ul>
          To exercise any of these rights, contact us at{' '}
          <a href="mailto:privacy@comenius.app" style={{ color: '#1e40af' }}>privacy@comenius.app</a>.
        </Section>

        <Section title={t('privacyPage.section8Title')}>
          The Platform uses essential cookies for authentication and session management. We may also use analytics cookies to understand usage patterns and improve the Platform. You can control cookie preferences through your browser settings, though disabling essential cookies may affect Platform functionality.
        </Section>

        <Section title={t('privacyPage.section9Title')}>
          The Platform is not directed to children under 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal data, we will take steps to delete it.
        </Section>

        <Section title={t('privacyPage.section10Title')}>
          Your data may be transferred to and processed in countries other than your country of residence. We ensure that appropriate safeguards are in place for such transfers in accordance with applicable data protection laws.
        </Section>

        <Section title={t('privacyPage.section11Title')}>
          We may update this Privacy Policy periodically. Material changes will be communicated via email or through a notice on the Platform. Your continued use after changes take effect constitutes acceptance of the updated policy.
        </Section>

        <Section title={t('privacyPage.section12Title')}>
          For privacy-related inquiries or to exercise your data rights, contact us at{' '}
          <a href="mailto:privacy@comenius.app" style={{ color: '#1e40af' }}>privacy@comenius.app</a>.
        </Section>

        <p style={{ marginTop: 36, textAlign: 'center', fontSize: 13, color: '#6b7280' }}>
          <Link to="/signup" style={{ color: '#1e40af', textDecoration: 'underline' }}>{t('privacyPage.backToSignUp')}</Link>
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, color: '#1f2937' }}>{title}</h2>
      <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}
