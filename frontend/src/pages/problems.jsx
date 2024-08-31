import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Modal styles
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '800px',
    },
};

const Problems = () => {
    const [problems, setProblems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [formData, setFormData] = useState({
        problem_id: '',
        name: '',
        difficulty: '',
        topic: '',
        description: '',
        sample_input: '',
        sample_output: '',
        constraints: '',
    });


    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get('http://localhost:8000/problems');
                setProblems(response.data);
            } catch (error) {
                console.error('Error fetching problems:', error);
            }
        };

        fetchProblems();
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleOpenViewModal = (problem) => {
        setSelectedProblem(problem);
        setIsViewModalOpen(true);
    };
    const handleCloseViewModal = () => setIsViewModalOpen(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCreateProblem = async () => {
        try {
            await axios.post('http://localhost:8000/problems', formData);
            setProblems([...problems, formData]);
            handleCloseModal();
        } catch (error) {
            console.error('Error creating problem:', error);
        }
    };

    const handleDeleteProblem = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/problems/${id}`);
            setProblems(problems.filter(problem => problem.problem_id !== id));
            handleCloseViewModal();
        } catch (error) {
            console.error('Error deleting problem:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Problems</h2>
            <button
                onClick={handleOpenModal}
                className="mb-4 p-2 bg-blue-600 text-white rounded"
            >
                Create New
            </button>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 bg-gray-50">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Difficulty</th>
                            <th className="px-6 py-3">Topic</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map((problem) => (
                            <tr key={problem.problem_id}>
                                <td className="px-6 py-4">{problem.problem_id}</td>
                                <td className="px-6 py-4">{problem.name}</td>
                                <td className="px-6 py-4">{problem.difficulty}</td>
                                <td className="px-6 py-4">{problem.topic}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleOpenViewModal(problem)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Problem Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                style={customStyles}
            >
                <h2 className="text-2xl font-bold mb-4">Create New Problem</h2>
                <input
                    type="text"
                    name="problem_id"
                    placeholder="Problem ID"
                    value={formData.problem_id}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <input
                    type="text"
                    name="difficulty"
                    placeholder="Difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <input
                    type="text"
                    name="topic"
                    placeholder="Topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <textarea
                    name="sample_input" // Updated
                    placeholder="Sample Input"
                    value={formData.sample_input}  // Updated
                    onChange={handleInputChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <textarea
                    name="sample_output" // Updated
                    placeholder="Sample Output"
                    value={formData.sample_output}  // Updated
                    onChange={handleInputChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <textarea
                    name="constraints"
                    placeholder="Constraints"
                    value={formData.constraints}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <button
                    onClick={handleCreateProblem}
                    className="p-2 bg-blue-600 text-white rounded"
                >
                    Add Problem
                </button>
                <button
                    onClick={handleCloseModal}
                    className="p-2 bg-gray-400 text-white rounded ml-4"
                >
                    Cancel
                </button>
            </Modal>

            {/* View Problem Modal */}
            {selectedProblem && (
                <Modal
                    isOpen={isViewModalOpen}
                    onRequestClose={handleCloseViewModal}
                    style={customStyles}
                >
                    <h2 className="text-2xl font-bold mb-4">View Problem</h2>
                    <p><strong>Name:</strong> {selectedProblem.name}</p>
                    <p><strong>Description:</strong> {selectedProblem.description}</p>
                    <p><strong>Sample Input:</strong> {selectedProblem.sampleInput}</p>
                    <p><strong>Sample Output:</strong> {selectedProblem.sampleOutput}</p>
                    <p><strong>Constraints:</strong> {selectedProblem.constraints}</p>
                    <button
                        onClick={() => handleDeleteProblem(selectedProblem.problem_id)}
                        className="p-2 bg-red-600 text-white rounded mt-4"
                    >
                        Delete
                    </button>
                    <button
                        onClick={handleCloseViewModal}
                        className="p-2 bg-gray-400 text-white rounded ml-4"
                    >
                        Close
                    </button>
                </Modal>
            )}
        </div>
    );
};

export default Problems;
