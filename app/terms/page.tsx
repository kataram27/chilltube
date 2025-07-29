import React from 'react';
import Head from 'next/head';

const TermsAndConditions: React.FC = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions - ChillTube</title>
        <meta name="description" content="ChillTube&apos;s Terms and Conditions - The legal agreement between you and ChillTube governing your use of our platform." />
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
            <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement made between 
                you, whether personally or on behalf of an entity (&quot;you&quot;), and ChillTube (&quot;Company,&quot; &quot;we,&quot; 
                &quot;us,&quot; or &quot;our&quot;), concerning your access to and use of the ChillTube platform and all 
                related services, features, and content.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing or using our platform, you agree that you have read, understood, and agree 
                to be bound by all of these Terms. If you do not agree with all of these Terms, then you 
                are expressly prohibited from using the platform and you must discontinue use immediately.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <p className="text-yellow-800 font-medium">
                  Please read these Terms carefully before using our services. Your use of ChillTube 
                  constitutes acceptance of these Terms.
                </p>
              </div>
            </section>

            {/* Definitions */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Definitions</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-900">&quot;Platform&quot;</span>
                  <span className="text-gray-700"> refers to the ChillTube website, mobile applications, and all related services.</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">&quot;Content&quot;</span>
                  <span className="text-gray-700"> includes all streaming videos, motivational quotes, text, images, audio, and other materials available on the platform.</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">&quot;User Account&quot;</span>
                  <span className="text-gray-700"> refers to the registered account created by users to access our services.</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">&quot;Subscription&quot;</span>
                  <span className="text-gray-700"> refers to the paid access plans that provide enhanced features and content.</span>
                </div>
              </div>
            </section>

            {/* Eligibility */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Eligibility</h2>
              <p className="text-gray-700 mb-4">
                To use ChillTube, you must be at least 13 years old. If you are between 13 and 18 years old, 
                you may only use the platform under the supervision of a parent or legal guardian who agrees 
                to these Terms. By using our platform, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>You meet the age requirements stated above</li>
                <li>You have the legal capacity to enter into this agreement</li>
                <li>You are not prohibited from receiving services under applicable laws</li>
                <li>You will comply with all terms and conditions set forth herein</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Accounts</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3">Account Creation</h3>
              <p className="text-gray-700 mb-4">
                To access certain features of our platform, you may be required to create an account. 
                You agree to provide accurate, current, and complete information during the registration 
                process and to update such information to keep it accurate, current, and complete.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">Account Security</h3>
              <p className="text-gray-700 mb-4">
                You are responsible for safeguarding the password and all activities that occur under 
                your account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li>Keep your login credentials confidential</li>
                <li>Not share your account with others</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3">Account Termination</h3>
              <p className="text-gray-700 mb-4">
                We reserve the right to terminate or suspend your account at any time, with or without 
                cause or notice, for conduct that we believe violates these Terms or is harmful to 
                other users, us, or third parties.
              </p>
            </section>

            {/* Subscription and Payment */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Subscription and Payment</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3">Subscription Plans</h3>
              <p className="text-gray-700 mb-4">
                ChillTube offers various subscription plans that provide access to premium content and 
                features. By subscribing, you agree to pay all fees associated with your chosen plan.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Terms</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li>Subscription fees are billed in advance on a recurring basis</li>
                <li>All payments are non-refundable except as required by law</li>
                <li>We reserve the right to change subscription fees with 30 days&apos; notice</li>
                <li>Failed payments may result in suspension or termination of your account</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3">Auto-Renewal</h3>
              <p className="text-gray-700 mb-4">
                Your subscription will automatically renew at the end of each billing period unless 
                you cancel before the renewal date. You can cancel your subscription at any time 
                through your account settings.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">Free Trial</h3>
              <p className="text-gray-700 mb-4">
                We may offer free trial periods for new users. At the end of the trial period, 
                your subscription will automatically convert to a paid plan unless you cancel 
                before the trial expires.
              </p>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptable Use</h2>
              <p className="text-gray-700 mb-4">
                You agree to use ChillTube only for lawful purposes and in accordance with these Terms. 
                You agree NOT to use the platform:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li>In any way that violates applicable federal, state, local, or international law</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload viruses or malicious code</li>
                <li>To spam, solicit, or advertise without permission</li>
                <li>To impersonate any person or entity</li>
                <li>To infringe upon intellectual property rights</li>
                <li>To attempt to gain unauthorized access to our systems</li>
                <li>To interfere with other users&apos; enjoyment of the platform</li>
              </ul>
            </section>

            {/* Content and Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Content and Intellectual Property</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3">Our Content</h3>
              <p className="text-gray-700 mb-4">
                All content on ChillTube, including streaming videos, motivational quotes, graphics, 
                logos, and software, is owned by ChillTube or licensed to us and is protected by 
                copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">License to Use</h3>
              <p className="text-gray-700 mb-4">
                Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, 
                revocable license to access and use our platform for personal, non-commercial purposes.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">Restrictions</h3>
              <p className="text-gray-700 mb-4">You may not:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li>Download, copy, or redistribute our content without permission</li>
                <li>Use our content for commercial purposes</li>
                <li>Remove copyright notices or other proprietary markings</li>
                <li>Create derivative works based on our content</li>
                <li>Reverse engineer or attempt to extract source code</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3">User-Generated Content</h3>
              <p className="text-gray-700 mb-4">
                If you submit content to our platform (comments, reviews, feedback), you grant us 
                a worldwide, perpetual, irrevocable, royalty-free license to use, modify, and 
                distribute such content in connection with our services.
              </p>
            </section>

            {/* Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy</h2>
              <p className="text-gray-700">
                Your privacy is important to us. Please review our Privacy Policy, which also governs 
                your use of the platform, to understand our practices regarding the collection and 
                use of your personal information.
              </p>
            </section>

            {/* Disclaimers */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimers</h2>
              <p className="text-gray-700 mb-4">
                ChillTube is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no representations 
                or warranties of any kind, express or implied, regarding:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li>The accuracy, reliability, or completeness of our content</li>
                <li>The availability or uninterrupted access to our platform</li>
                <li>The security of our platform or your data</li>
                <li>The results you may obtain from using our services</li>
              </ul>
              <p className="text-gray-700">
                Please refer to our separate Disclaimer page for additional important disclaimers 
                regarding our content and services.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, ChillTube shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
                <li>Damages resulting from your use or inability to use the platform</li>
                <li>Damages resulting from any unauthorized access to your account</li>
                <li>Damages resulting from third-party conduct or content</li>
              </ul>
              <p className="text-gray-700">
                Our total liability to you for all damages shall not exceed the amount paid by you 
                to ChillTube in the twelve months preceding the claim.
              </p>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Indemnification</h2>
              <p className="text-gray-700">
                You agree to defend, indemnify, and hold harmless ChillTube and its employees, 
                contractors, agents, officers, and directors from and against any and all claims, 
                damages, obligations, losses, liabilities, costs, or debt, and expenses (including 
                but not limited to attorney&apos;s fees) arising from your use of the platform or 
                violation of these Terms.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your access immediately, without prior notice or liability, 
                for any reason, including without limitation if you breach the Terms. Upon termination:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li>Your right to use the platform will cease immediately</li>
                <li>We may delete your account and all associated data</li>
                <li>You remain liable for all charges incurred up to termination</li>
                <li>Provisions that should survive termination will remain in effect</li>
              </ul>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be interpreted and governed by the laws of the State of California, 
                United States, without regard to its conflict of law provisions. Any disputes arising 
                from these Terms or your use of the platform shall be resolved in the courts of 
                California.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify or replace these Terms at any time. If a revision is 
                material, we will try to provide at least 30 days&apos; notice prior to any new terms 
                taking effect. Your continued use of the platform after such modifications constitutes 
                acceptance of the updated Terms.
              </p>
            </section>

            {/* Severability */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Severability</h2>
              <p className="text-gray-700">
                If any provision of these Terms is held to be unenforceable or invalid, such provision 
                will be changed and interpreted to accomplish the objectives of such provision to the 
                greatest extent possible under applicable law, and the remaining provisions will 
                continue in full force and effect.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> legal@chilltube.com</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Innovation Street, Tech District, Silicon Valley, CA 94000, USA</p>
                <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">Acknowledgment</h2>
              <p className="text-blue-800 mb-3">
                By using ChillTube, you acknowledge that you have read these Terms and Conditions 
                and agree to be bound by them. These Terms constitute the entire agreement between 
                you and ChillTube regarding your use of the platform.
              </p>
              <p className="text-blue-800 text-sm">
                <strong>Effective Date:</strong> These Terms and Conditions are effective as of the 
                date of your first use of the platform.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;