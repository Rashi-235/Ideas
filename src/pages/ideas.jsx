import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar.jsx';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1A2453', // Dark blue background for header
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#E0F7FA', // Light blue background for odd rows
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#F0F4F8', // Very light blue background for even rows
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: '#D1E7F0', // Slightly darker blue on hover
    cursor: 'pointer',
    transform: 'scale(1.02)', // Magnify on hover
    transition: 'transform 0.2s ease-in-out', // Smooth transition
  },
}));

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/ideas');
      setIdeas(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ideas:', error);
      setLoading(false);
    }
  };

  const handleViewDetails = (idea) => {
    setSelectedIdea(idea);
  };

  const handleCloseModal = () => {
    setSelectedIdea(null);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 bg-gradient-to-r from-[#E0F7FA] to-[#E0F7FA] min-h-screen">
        <h1 className="text-3xl font-bold text-indigo-800 p-4 text-center">Ideas</h1>
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
                <StyledTableRow key={idea.id || index} onClick={() => handleViewDetails(idea)}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell>{idea.title}</StyledTableCell>
                  <StyledTableCell>{idea.ideaOwner}</StyledTableCell>
                  <StyledTableCell>{idea.mentorAlias}</StyledTableCell>
                  <StyledTableCell>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(idea);
                      }}
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
            <div className="bg-white p-8 rounded-lg shadow-2xl border-2 border-blue-500 max-w-xl w-full transform scale-100 transition-transform duration-300">
              <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">
                {selectedIdea.title}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="border-b border-gray-300 pb-2 bg-gray-100 px-4 py-2"><strong>Owner:</strong> {selectedIdea.ideaOwner}</p>
                <p className="border-b border-gray-300 pb-2 bg-blue-50 px-4 py-2"><strong>Mentor Alias:</strong> {selectedIdea.mentorAlias}</p>
                <p className="border-b border-gray-300 pb-2 bg-gray-100 px-4 py-2"><strong>Project Description:</strong> {selectedIdea.projectDescription}</p>
                <p className="border-b border-gray-300 pb-2 bg-blue-50 px-4 py-2"><strong>EP Sub Area:</strong> {selectedIdea.epSubArea}</p>
                <p className="border-b border-gray-300 pb-2 bg-gray-100 px-4 py-2"><strong>Domain:</strong> {selectedIdea.domain}</p>
                <p className="border-b border-gray-300 pb-2 bg-blue-50 px-4 py-2"><strong>Level:</strong> {selectedIdea.level}</p>
                <p className="border-b border-gray-300 pb-2 bg-gray-100 px-4 py-2"><strong>Duration:</strong> {selectedIdea.duration}</p>
                <p className="border-b border-gray-300 pb-2 bg-blue-50 px-4 py-2"><strong>Pre-Requisites:</strong> {selectedIdea.preRequisites}</p>
                <p className="border-b border-gray-300 pb-2 bg-gray-100 px-4 py-2"><strong>References:</strong> {selectedIdea.references}</p>
                <p className="border-t border-gray-400 pt-2 bg-blue-50 px-4 py-2"><strong>Comments:</strong> {selectedIdea.comments}</p>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Ideas;

