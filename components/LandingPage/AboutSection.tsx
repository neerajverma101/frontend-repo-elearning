'use client';
import { APP_NAME } from "@/app/constant/app-constant";

const AboutSection = () => {
  return (
    <section className="bg-gray-100 py-16 bg-white">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-indigo-500 inline-block pb-2">
            About Us
          </h2>
          <p className="text-lg text-gray-600">
            Welcome to our AI-powered e-learning platform, designed to revolutionize how schools, colleges, and training centers deliver education. Our comprehensive features empower institutions to enhance their teaching methods and streamline operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Mission */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              At <strong>{APP_NAME}</strong>, our mission is to empower educational organizations with a flexible, scalable, and user-friendly AI-driven platform. We streamline onboarding and allow institutions to tailor features to their needs. Our platform enhances the learning experience with AI-powered tools for summarizing recorded classes/lectures, generating question papers, and providing a chat assistant to address students' queries about assignments and subjects. We are committed to making education more accessible and effective for educators and learners worldwide.
            </p>
          </div>

          {/* Key Features */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Effortless onboarding with AI-powered customizable modules</li>
              <li>Advanced management for students, teachers, and classes</li>
              <li>AI-driven interactive tools to boost student engagement</li>
              <li>In-depth analytics and reporting to monitor educational progress</li>
              <li>Comprehensive support to maximize platform benefits</li>
            </ul>
          </div>

          {/* Our Values */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h3>
            <p className="text-gray-600">
              At <strong>{APP_NAME}</strong>, we are dedicated to advancing education through innovation and excellence. Our AI-powered platform empowers organizations to onboard seamlessly and utilize features tailored to their needs. We provide solutions for generating recorded lecture summaries, creating question papers, and offering a chat assistant for students to address basic queries on assignments and subjects, all designed to drive educational success and support the growth of learning communities worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;