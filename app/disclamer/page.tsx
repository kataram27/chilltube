import React from 'react';
import Head from 'next/head';

const Disclaimer: React.FC = () => {
  return (
    <>
      <Head>
        <title>Disclaimer - ChillTube</title>
        <meta name="description" content="ChillTube&apos;s Disclaimer - Important information about the use of our streaming platform and motivational content." />
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Disclaimer</h1>
            <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            {/* General Disclaimer */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">General Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The information contained on ChillTube&apos;s platform is for general information purposes only. 
                While we endeavor to keep the information up to date and correct, we make no representations 
                or warranties of any kind, express or implied, about the completeness, accuracy, reliability, 
                suitability, or availability with respect to the platform or the information, products, 
                services, or related graphics contained on the platform for any purpose.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Any reliance you place on such information is therefore strictly at your own risk. In no event 
                will we be liable for any loss or damage including without limitation, indirect or consequential 
                loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising 
                out of, or in connection with, the use of this platform.
              </p>
            </section>

            {/* Content Disclaimer */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Content Disclaimer</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3">Streaming Content</h3>
              <p className="text-gray-700 mb-4">
                The streaming content available on ChillTube is provided for entertainment and educational 
                purposes only. We do not guarantee the accuracy, completeness, or usefulness of any content. 
                Content may include opinions, views, and perspectives from various creators and sources, which 
                do not necessarily reflect the official policy or position of ChillTube.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">Motivational Quotes</h3>
              <p className="text-gray-700 mb-4">
                Our daily motivational quotes are intended for inspirational purposes only and should not be 
                considered as professional advice. These quotes are sourced from various authors, speakers, 
                and public figures. While we strive to provide accurate attributions, we cannot guarantee 
                the authenticity or original context of all quotes.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">User-Generated Content</h3>
              <p className="text-gray-700 mb-4">
                ChillTube may contain content submitted by users, including comments, reviews, and feedback. 
                These contributions represent the views and opinions of their respective authors and not 
                necessarily those of ChillTube. We do not endorse, support, represent, or guarantee the 
                completeness, truthfulness, accuracy, or reliability of any user-generated content.
              </p>
            </section>

            {/* Professional Advice Disclaimer */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Professional Advice Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                The content on ChillTube is not intended to be a substitute for professional advice, diagnosis, 
                or treatment. The motivational content and streaming materials should not be used as a replacement for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li>Medical or mental health advice, diagnosis, or treatment</li>
                <li>Financial or investment advice</li>
                <li>Legal advice</li>
                <li>Professional counseling or therapy</li>
                <li>Career or business consulting</li>
              </ul>
              <p className="text-gray-700">
                Always seek the advice of qualified professionals with any questions you may have regarding 
                medical conditions, mental health, financial decisions, legal matters, or other professional services.
              </p>
            </section>

            {/* External Links Disclaimer */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">External Links Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                ChillTube may contain links to external websites that are not provided or maintained by or in 
                any way affiliated with our platform. Please note that we do not guarantee the accuracy, 
                relevance, timeliness, or completeness of any information on these external websites.
              </p>
              <p className="text-gray-700">
                We have no control over the nature, content, and availability of those sites. The inclusion 
                of any links does not necessarily imply a recommendation or endorse the views expressed within them. 
                You acknowledge and agree that we shall not be responsible or liable for any content, 
                advertising, products, or other materials on or available from such websites.
              </p>
            </section>

            {/* Technical Disclaimer */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technical Disclaimer</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3">Service Availability</h3>
              <p className="text-gray-700 mb-4">
                While we strive to maintain continuous service availability, ChillTube may experience 
                temporary interruptions, maintenance periods, or technical difficulties. We do not guarantee 
                uninterrupted access to our platform and are not liable for any inconvenience or loss 
                resulting from service interruptions.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">Compatibility</h3>
              <p className="text-gray-700 mb-4">
                We make no warranties that our platform will be compatible with all devices, browsers, 
                or operating systems. Users are responsible for ensuring their devices meet the minimum 
                system requirements for optimal platform performance.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-3">Data Security</h3>
              <p className="text-gray-700 mb-4">
                While we implement security measures to protect user data, we cannot guarantee absolute 
                security against all possible threats. Users acknowledge that internet transmissions are 
                never completely private or secure, and any message or information sent may be read or 
                intercepted by others.
              </p>
            </section>

            {/* Copyright and Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Copyright and Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content on ChillTube, including but not limited to text, graphics, logos, images, 
                audio clips, video clips, and software, is the property of ChillTube or its content 
                suppliers and is protected by copyright and other intellectual property laws.
              </p>
              <p className="text-gray-700 mb-4">
                While we strive to respect intellectual property rights and provide proper attribution 
                for quoted materials, we cannot guarantee that all content is free from copyright 
                infringement claims. If you believe any content infringes your copyright, please 
                contact us immediately.
              </p>
            </section>

            {/* Age Restrictions */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Age Restrictions</h2>
              <p className="text-gray-700">
                ChillTube is intended for users aged 13 and above. While we curate content to be generally 
                appropriate and positive, parents and guardians should supervise minors&apos; use of our platform. 
                We are not responsible for ensuring that all content is suitable for viewers of all ages, 
                and parental discretion is advised.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the fullest extent permitted by applicable law, ChillTube shall not be liable for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li>Any direct, indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
                <li>Damages resulting from your access to or use of or inability to access or use the platform</li>
                <li>Damages resulting from any conduct or content of any third party on the platform</li>
                <li>Damages resulting from unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
              <p className="text-gray-700">
                This limitation applies regardless of the legal theory on which the claim is based, 
                whether in contract, tort, negligence, strict liability, or otherwise.
              </p>
            </section>

            {/* Changes to Disclaimer */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Disclaimer</h2>
              <p className="text-gray-700">
                We reserve the right to modify this disclaimer at any time without prior notice. 
                Your continued use of ChillTube after any such changes constitutes your acceptance 
                of the new disclaimer. We encourage you to review this disclaimer periodically to 
                stay informed of any updates.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this disclaimer or need clarification on any of the 
                points mentioned above, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> legal@chilltube.com</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Innovation Street, Tech District, Silicon Valley, CA 94000, USA</p>
              </div>
            </section>

            {/* Acceptance */}
            <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">Acceptance of This Disclaimer</h2>
              <p className="text-blue-800">
                By using ChillTube, you acknowledge that you have read, understood, and agree to be 
                bound by this disclaimer. If you do not agree with any part of this disclaimer, 
                please discontinue use of our platform immediately.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disclaimer;