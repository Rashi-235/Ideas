import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar.jsx';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1A2453',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#E0F7FA',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#F0F4F8',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: '#D1E7F0',
    cursor: 'pointer',
    transform: 'scale(1.02)',
    transition: 'transform 0.2s ease-in-out',
  },
}));

const Admin = () => {
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
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
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/ideas');
      setIdeas(response.data);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    }
  };

  const handleEdit = (idea) => {
    const { _id, createdAt, updatedAt, __v, ...editableFields } = idea;
    setSelectedIdea(idea);
    setFormData(editableFields);
    setIsEditing(true);
  };

  const handleViewDetails = (idea) => {
    setSelectedIdea(idea);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/ideas/${selectedIdea._id}`, formData);
      alert('Idea updated successfully');
      setSelectedIdea(null);
      fetchIdeas();
    } catch (error) {
      console.error('Error updating idea:', error);
      alert('Error updating idea. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 bg-gradient-to-r from-[#E0F7FA] to-[#E0F7FA] min-h-screen">
        <h1 className="text-3xl font-bold text-indigo-800 p-4 text-center">Admin - Manage Ideas</h1>
        <TableContainer component={Paper} className="shadow-2xl hover:shadow-3xl transition-shadow duration-300 p-4">
          <Table sx={{ minWidth: 600 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>S.No</StyledTableCell>
                <StyledTableCell>Idea Title</StyledTableCell>
                <StyledTableCell>Owner</StyledTableCell>
                <StyledTableCell>Mentor Alias</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ideas.map((idea, index) => (
                <StyledTableRow key={idea._id || index}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell>{idea.title}</StyledTableCell>
                  <StyledTableCell>{idea.ideaOwner}</StyledTableCell>
                  <StyledTableCell>{idea.mentorAlias}</StyledTableCell>
                  <StyledTableCell>
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2 px-6"
                      onClick={() => handleEdit(idea)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700 px-6"
                      onClick={() => handleViewDetails(idea)}
                    >
                      View Details
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedIdea && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl border-2 border-blue-500 max-w-xl w-full overflow-y-auto max-h-screen">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Edit Idea</h2>
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
                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                      onClick={() => setSelectedIdea(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">
                    {selectedIdea.title}
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p><strong>Owner:</strong> {selectedIdea.ideaOwner}</p>
                    <p><strong>Mentor Alias:</strong> {selectedIdea.mentorAlias}</p>
                    <p><strong>Project Description:</strong> {selectedIdea.projectDescription}</p>
                    <p><strong>EP Sub Area:</strong> {selectedIdea.epSubArea}</p>
                    <p><strong>Domain:</strong> {selectedIdea.domain}</p>
                    <p><strong>Level:</strong> {selectedIdea.level}</p>
                    <p><strong>Duration:</strong> {selectedIdea.duration}</p>
                    <p><strong>Pre-Requisites:</strong> {selectedIdea.preRequisites}</p>
                    <p><strong>References:</strong> {selectedIdea.references}</p>
                    <p><strong>Comments:</strong> {selectedIdea.comments}</p>
                  </div>
                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                      onClick={() => setSelectedIdea(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;