// InstructorsPage.js
import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';

const InstructorsPage = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    loadInstructors();
  }, []);

  const loadInstructors = async () => {
    const data = await fetchData('instructors');
    setInstructors(data);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Roboto, sans-serif' }}>
            <h2>Instructors</h2>     {' '}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
        }}
      >
               {' '}
        {instructors.map((inst, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
            }}
          >
                        <h4>{inst.name}</h4>           {' '}
            <p>
              <strong>Expertise:</strong> {inst.expertise}
            </p>
                        <p>{inst.bio}</p>         {' '}
          </div>
        ))}
             {' '}
      </div>
         {' '}
    </div>
  );
};

export default InstructorsPage;
