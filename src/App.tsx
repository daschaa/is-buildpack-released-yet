import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

const RELEASE_TO_FILTER = '4.47';

const App = () => {
  
  const [isReleased, setReleased] = React.useState<boolean>(false);

  const fetchBuildpacks = async () => {
    const resp = (await axios.get('https://api.github.com/repos/cloudfoundry/java-buildpack-release/releases')).data;
    const releases = resp.filter((release: {name: string}) => release.name === RELEASE_TO_FILTER);
    setReleased(releases.length > 0);
  };

  useEffect(() => {
    fetchBuildpacks();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Is java-buildpack v{RELEASE_TO_FILTER} released yet?
        </p>
        <a
          className="App-link"
          href="https://bosh.io/releases/github.com/cloudfoundry/java-buildpack-release?all=1v"
          target="_blank"
          rel="noopener noreferrer"
        >
          {isReleased ? 'Yes' : 'No'}
        </a>
      </header>
    </div>
  );
}

export default App;
