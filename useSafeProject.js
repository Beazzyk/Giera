import { useState, useEffect } from 'react';

// Hook, który bezpiecznie zwraca obiekt project
const useSafeProject = (project) => {
  const [safeProject, setSafeProject] = useState({});

  useEffect(() => {
    if (project) {
      setSafeProject(project);
    } else {
      setSafeProject({});
    }
  }, [project]);

  return safeProject;
};

export default useSafeProject;
