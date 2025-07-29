import React from 'react';
import Head from 'next/head';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - ChillTube</title>
        <meta name="description" content="ChillTube&apos;s Privacy Policy - Learn how we collect, use, and protect your personal information." />
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                ChillTube (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our 
                streaming platform and use our services. Please read this Privacy Policy carefully. If you 
                do not agree with the terms of this Privacy Policy, please do not access the site.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-6">
                <li>Register for an account</li>
                <li>Subscribe to our services</li>
                <li>Contact us through our contact forms</li>
                <li>Participate in surveys or promotional activities</li>
                <li>Sign up for our newsletter</li>
              </ul>

              <p className="text-gray-700 mb-4">This information may include:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-6">
                <li>Name and contact information (email address, phone number)</li>
                <li>Billing and payment information</li>
                <li>Profile information and preferences</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3">Usage Information</h3>
              <p className="text-gray-700 mb-4">
                We automatically collect certain information about your device and how you interact with our platform:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-6">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, time spent, content viewed)</li>
                <li>Viewing history and preferences</li>
                <li>Search queries and interactions</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3">Cookies and Tracking Technologies</h3>
              <p className="text-gray-700 mb-4">
                We use cookies, web beacons, and similar technologies to enhance your experience, 
                analyze usage patterns, and deliver personalized content and advertisements.
              </p>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Provide, operate, and maintain our streaming services</li>
                <li>Process transactions and manage subscriptions</li>
                <li>Personalize your content experience and recommendations</li>
                <li>Send you daily motivational quotes and platform updates</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Analyze usage patterns to improve our services</li>
                <li>Protect against fraud and unauthorized access</li>
                <li>Comply with legal obligations</li>
                <li>Send promotional communications (with your consent)</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Share Your Information</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share 
                your information in the following circumstances:
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3">Service Providers</h3>
              <p className="text-gray-700 mb-4">
                We may share your information with trusted third-party service providers who assist us in 
                operating our platform, conducting business, or serving our users, provided they agree to 
                keep this information confidential.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose your information if required to do so by law or in response to valid 
                requests by public authorities.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">Business Transfers</h3>
              <p className="text-gray-700 mb-4">
                In the event of a merger, acquisition, or sale of all or a portion of our assets, 
                your information may be transferred as part of that transaction.
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate technical and organizational security measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction. 
                These measures include encryption, secure servers, and regular security assessments. 
                However, no method of transmission over the internet or electronic storage is 100% secure, 
                and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-700">
                We retain your personal information for as long as necessary to provide our services, 
                comply with legal obligations, resolve disputes, and enforce our agreements. When we no 
                longer need your personal information, we will securely delete or anonymize it.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Privacy Rights</h2>
              <p className="text-gray-700 mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate personal information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your personal information</li>
                <li><strong>Restriction:</strong> Request restriction of processing your personal information</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
                <li><strong>Withdrawal:</strong> Withdraw consent for processing (where applicable)</li>
              </ul>
              <p className="text-gray-700 mt-4">
                To exercise these rights, please contact us using the information provided in our Contact Us page.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children&apos;s Privacy</h2>
              <p className="text-gray-700">
                Our services are not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children under 13. If you are a parent or guardian and 
                believe your child has provided us with personal information, please contact us, and we 
                will take steps to remove such information from our systems.
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Data Transfers</h2>
              <p className="text-gray-700">
                Your information may be transferred to and processed in countries other than your own. 
                These countries may have different data protection laws. When we transfer your information, 
                we ensure appropriate safeguards are in place to protect your personal information.
              </p>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Links</h2>
              <p className="text-gray-700">
                Our platform may contain links to third-party websites or services. We are not responsible 
                for the privacy practices or content of these third-party sites. We encourage you to review 
                the privacy policies of any third-party sites you visit.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage 
                you to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> privacy@chilltube.com</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Innovation Street, Tech District, Silicon Valley, CA 94000, USA</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;