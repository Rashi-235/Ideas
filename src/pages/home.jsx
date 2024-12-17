import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar.jsx';

const Home = () => {
  const [formData, setFormData] = useState({
    title: '',
    ideaOwner: '',
    mentorAlias: '',
    projectDescription: '',
    epSubArea: '',
    domain: '',
    level: '',
    duration: '',
    preRequisites: '',
    references: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmptyField = Object.values(formData).some(value => value.trim() === '');
    if (isEmptyField) {
      alert('Please fill all fields');
      return;
    }

    try {
      await axios.post('http://localhost:5001/api/ideas', formData);
      alert('Idea submitted successfully');
      setFormData({
        title: '',
        ideaOwner: '',
        mentorAlias: '',
        projectDescription: '',
        epSubArea: '',
        domain: '',
        level: '',
        duration: '',
        preRequisites: '',
        references: '',
        comments: ''
      });
    } catch (error) {
      console.error('Error submitting idea:', error);
      alert('Error submitting idea. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 bg-gradient-to-r from-[#E0F7FA] to-[#E0F7FA] min-h-screen">
        <br />
        <h1 className="text-3xl font-bold text-indigo-800 p-4 text-center">Submit an Idea</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-2xl hover:shadow-3xl transition-shadow duration-300 max-w-2xl mx-auto w-full">
          <p className="text-gray-400 mb-4 font-bold">Share your thoughts and ideas with us by filling out the form below.</p>
          {Object.keys(formData).map((key) => (
            <div className="mb-4" key={key}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              {key === 'projectDescription' || key === 'comments' ? (
                <textarea
                  className="w-full px-3 py-2 text-gray-700 bg-blue-50 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                  id={key}
                  name={key}
                  placeholder={`Enter the ${key}`}
                  rows="4"
                  value={formData[key]}
                  onChange={handleChange}
                ></textarea>
              ) : (
                <input
                  className="w-full px-3 py-2 text-gray-700 bg-blue-50 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                  type="text"
                  id={key}
                  name={key}
                  placeholder={`Enter the ${key}`}
                  value={formData[key]}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:translate-x-1 hover:scale-105"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;



