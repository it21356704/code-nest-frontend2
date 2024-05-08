import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import MentorSidebar from '../components/MentorSidebar';
import '../css/ManageRoadmaps.css';

function ManageRoadmaps() {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const response = await axiosInstance.get('/roadmaps');
      setRoadmaps(response.data);
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/roadmaps/${id}`);
      // Update roadmaps state after deletion
      const updatedRoadmaps = roadmaps.filter((roadmap) => roadmap.id !== id);
      setRoadmaps(updatedRoadmaps);
    } catch (error) {
      console.error('Error deleting roadmap:', error);
    }
  };

  return (
    <div className="d-inline-flex p-2 bd-highlight">
      <MentorSidebar />
      <h1 className="text-one coursetitle">Manage Roadmaps</h1>
      <div className="armv">
        <button type="button" className="btn btn-primary arm">
          <a className="roadmapStyle" href="/addRoadmap">
            Add Roadmap
          </a>
        </button>
      </div>
      <div>
        <div className="card managecourse finaltablech">
          <div className="table-responsive text-nowrap ">
            <table className="table ">
              <thead>
                <tr>
                  <th>
                    <h4>Roadmap Name</h4>
                  </th>
                  <th>
                    <h4>Mentor</h4>
                  </th>
                  <th>
                    <h4>Action</h4>
                  </th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {roadmaps.map((roadmap) => (
                  <tr key={roadmap.id}>
                    <td>
                      <i className="bx  bx-sm me-3"></i>
                      <span className="textv">{roadmap.rmTitle}</span>
                    </td>
                    <td>
                      <div className="manageroadmap">
                        <h5 type="text" className="manageroadmaptxt">
                          {roadmap.mentorName}
                        </h5>
                      </div>
                    </td>
                    <td>
                      <div className="manageroadmap">
                        <button
                          type="button"
                          className="manageroadmapbtn2">
                          <a href='/editRoadmap' className='editbtn'>Edit</a>
                        </button>

                        <button
                          type="button"
                          className="manageroadmapbtn1"
                          onClick={() => handleDelete(roadmap.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageRoadmaps;