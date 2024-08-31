import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to CodeX Arena</h1>
          <p className="text-lg md:text-xl mb-6">
            Your ultimate platform for coding challenges and learning.
          </p>
          <Link to="/signup">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Coding Challenges</h3>
              <p>
                Solve a wide variety of coding challenges and improve your skills.
              </p>
            </div>
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Discussion Forums</h3>
              <p>
                Engage with a community of developers and get help or share knowledge.
              </p>
            </div>
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Leaderboard</h3>
              <p>
                Compete with others and see how you stack up on the global leaderboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Level Up Your Skills?</h2>
          <p className="text-lg md:text-xl mb-6">
            Join CodeX Arena today and start your coding journey.
          </p>
          <Link to="/signup">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
