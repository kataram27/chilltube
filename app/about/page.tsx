import React from 'react';
import Head from 'next/head';

const AboutUs: React.FC = () => {
  return (
    <>
      <Head>
        <title>About Us - ChillTube</title>
        <meta name="description" content="Learn about ChillTube&apos;s mission to provide inspiring content and daily motivation through our streaming platform." />
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About ChillTube</h1>
            <p className="text-xl text-gray-600">Your destination for inspiration and entertainment</p>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ChillTube is dedicated to creating a positive digital space where entertainment meets inspiration. 
              We believe that every day should start with motivation and end with a sense of accomplishment. 
              Our platform combines high-quality streaming content with carefully curated daily motivational quotes 
              to help you stay focused, inspired, and entertained.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you&apos;re looking to unwind after a long day or seeking that spark of motivation to tackle 
              new challenges, ChillTube is here to support your journey with content that matters.
            </p>
          </div>

          {/* What We Offer */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Streaming Content</h3>
                <p className="text-gray-600">
                  Carefully selected videos, documentaries, and shows that inspire, educate, and entertain 
                  while maintaining a positive and uplifting atmosphere.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Daily Motivation</h3>
                <p className="text-gray-600">
                  Fresh motivational quotes delivered daily to keep you inspired and focused on your goals, 
                  sourced from thought leaders, authors, and visionaries.
                </p>
              </div>
            </div>
          </div>

          {/* Our Story */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ChillTube was born from a simple observation: in a world filled with negative news and mindless content, 
              people crave platforms that nourish the mind and soul. Our founders recognized the need for a streaming 
              service that doesn&apos;t just entertain, but also empowers and inspires its users.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Starting as a passion project, ChillTube has grown into a community of individuals who believe in the 
              power of positive content and daily motivation. We&apos;re committed to creating an environment where 
              personal growth and entertainment go hand in hand.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Values</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Positivity</h3>
                  <p className="text-gray-600">We curate content that uplifts and inspires, promoting mental well-being and personal growth.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Quality</h3>
                  <p className="text-gray-600">Every piece of content is carefully selected to ensure it meets our high standards for value and inspiration.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Community</h3>
                  <p className="text-gray-600">We foster a supportive community where users can share their journey and inspire others.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Innovation</h3>
                  <p className="text-gray-600">We continuously evolve our platform to better serve our users&apos; needs for inspiration and entertainment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Team</h2>
            <p className="text-gray-700 leading-relaxed">
              Our team consists of passionate individuals from diverse backgrounds in technology, content creation, 
              and personal development. We&apos;re united by our shared vision of creating a platform that makes a 
              positive impact on people&apos;s lives. From our developers who ensure a seamless user experience to our 
              content curators who handpick every motivational quote, each team member contributes to making 
              ChillTube a special place on the internet.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;