import { Link } from 'react-router-dom';
import { TopNav } from '../components/TopNav';
import { useLocale } from '../i18n/LocaleContext';

export function TermsPage() {
  const { t } = useLocale();
  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Geist', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
      <TopNav minimal />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px 60px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, color: '#111', marginBottom: 8 }}>{t('termsPage.title')}</h1>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 32 }}>{t('termsPage.lastUpdated')}</p>

        <Section title={t('termsPage.section1Title')}>
          By creating an account or using Comenius ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform.
        </Section>

        <Section title={t('termsPage.section2Title')}>
          You must be at least 13 years old to use the Platform. If you are under 18, you must have parental or guardian consent.
        </Section>

        <Section title={t('termsPage.section3Title')}>
          You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate and complete information during registration and to update it as necessary. Each account is for a single individual and may not be shared.
        </Section>

        <Section title={t('termsPage.section4Title')}>
          You agree not to:
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Use the Platform for any unlawful purpose or in violation of any applicable laws.</li>
            <li>Attempt to cheat, manipulate, or circumvent the proctoring system.</li>
            <li>Share, distribute, or reproduce exam content without explicit permission.</li>
            <li>Attempt to gain unauthorized access to other users' accounts or data.</li>
            <li>Upload malicious code, interfere with the Platform's operation, or attempt to reverse-engineer the software.</li>
            <li>Use automated tools, bots, or scripts to access or interact with the Platform.</li>
          </ul>
        </Section>

        <Section title={t('termsPage.section5Title')}>
          The Platform includes remote proctoring features (webcam monitoring, browser activity tracking, tab-switch detection) to uphold academic integrity. Attempting to bypass or disable these features is a violation of these terms and may result in immediate account suspension. You acknowledge that exam sessions are recorded and may be reviewed by authorized instructors or administrators.
        </Section>

        <Section title={t('termsPage.section6Title')}>
          All content on the Platform, including but not limited to exam questions, text, graphics, logos, and software, is the property of Comenius or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written consent.
        </Section>

        <Section title={t('termsPage.section7Title')}>
          Where the Platform allows you to submit content (e.g., answers, notes), you retain ownership of your content but grant Comenius a worldwide, royalty-free license to use, store, and display it in connection with providing the Platform's services.
        </Section>

        <Section title={t('termsPage.section8Title')}>
          Your use of the Platform is also governed by our <Link to="/privacy" style={{ color: '#1e40af', textDecoration: 'underline' }}>Privacy Policy</Link>. By using the Platform, you consent to the collection and use of your data as described therein.
        </Section>

        <Section title={t('termsPage.section9Title')}>
          The Platform is provided "as is" without warranties of any kind, express or implied. Comenius does not warrant that the Platform will be uninterrupted, error-free, or completely secure. Exam scores and analytics are provided for educational purposes and do not guarantee any specific outcome in actual examinations.
        </Section>

        <Section title={t('termsPage.section10Title')}>
          To the fullest extent permitted by law, Comenius shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.
        </Section>

        <Section title={t('termsPage.section11Title')}>
          We reserve the right to suspend or terminate your account at any time, with or without cause, including but not limited to violations of these Terms. Upon termination, your right to access the Platform ceases immediately.
        </Section>

        <Section title={t('termsPage.section12Title')}>
          We may update these Terms from time to time. Material changes will be communicated via email or through the Platform. Continued use after changes take effect constitutes acceptance of the revised Terms.
        </Section>

        <Section title={t('termsPage.section13Title')}>
          Questions about these Terms may be directed to{' '}
          <a href="mailto:support@comenius.app" style={{ color: '#1e40af' }}>support@comenius.app</a>.
        </Section>

        <p style={{ marginTop: 36, textAlign: 'center', fontSize: 13, color: '#6b7280' }}>
          <Link to="/signup" style={{ color: '#1e40af', textDecoration: 'underline' }}>{t('termsPage.backToSignUp')}</Link>
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
