import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useGetSamplesQuery } from './features/samples/samplesApi';

// Dashboard
// Map
// Blog
//

function App() {
  const { data, isFetching, isLoading } = useGetSamplesQuery();
  if (isFetching) return <div>Fetching samples...</div>;
  if (isLoading) return <div>Loading samples...</div>;

  return (
    <div className="App">
      Sample Projects
      <ul>
        {data?.samples.map(({ project }) => {
          return (
            <div key={project['_id']}>
              <li>{project.projectName}</li>
              <li>{project.organization}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
