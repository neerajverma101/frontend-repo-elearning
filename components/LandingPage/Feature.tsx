'use client';

const FeatureSection = () => {
  return (
    <section id="features" className="py-16 bg-gray-100">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-center mb-4 border-b-4 border-indigo-500 inline-block pb-2">
            Platform Features
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/4">
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full p-4 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-4">AI-Driven Summaries</h4>
            <p className="text-gray-600">
              Automatically generate concise summaries of recorded classes/lectures for easy review.
            </p>
          </div>

          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/4">
            <div className="bg-gradient-to-r from-pink-400 to-orange-400 text-white rounded-full p-4 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 3.75L6 6.5v11L9.75 20.25 12 18 14.25 20.25 18 17.5v-11L14.25 3.75 12 6 9.75 3.75z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-4">Question Paper Generation</h4>
            <p className="text-gray-600">
              Effortlessly create question papers with AI, saving time for educators.
            </p>
          </div>

          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/4">
            <div className="bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-full p-4 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8l-2 8h4l-2-8zM2 20h20M12 8v8M15 3h4v4h-4V3zm0 8h4v4h-4v-4zm-8-8h4v4H7V3zm0 8h4v4H7v-4z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-4">Student Chat Assistant</h4>
            <p className="text-gray-600">
              Enable students to ask basic queries about assignments and subjects, offering instant support.
            </p>
          </div>

          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/4">
            <div className="bg-gradient-to-r from-purple-400 to-indigo-600 text-white rounded-full p-4 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8l-2 8h4l-2-8zM2 20h20M12 8v8M15 3h4v4h-4V3zm0 8h4v4h-4v-4zm-8-8h4v4H7V3zm0 8h4v4H7v-4z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-4">Customizable Modules</h4>
            <p className="text-gray-600">
              Choose the features that fit your institution’s needs, whether it's onboarding, scheduling, or online assessments.
            </p>
          </div>
        </div>
      </div>
    </section>

  );
}

export default FeatureSection;