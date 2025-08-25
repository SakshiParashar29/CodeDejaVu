import React, { useState } from 'react';
import Problems from './Problems.jsx';
import Profile from './Profile.jsx';
import AddForm from './AddForm.jsx';
import MarkedProblems from './MarkedProblems.jsx';

const DashBoard = () => {
  const [reloadAll, setReloadAll] = useState(false);

  const triggerReload = () => {
    setReloadAll(prev => !prev);
  };

  return (
    <div className="p-4">
      <Profile reload={reloadAll} />
      <MarkedProblems onAction={triggerReload} />
      <AddForm onAction={triggerReload} />
      <Problems reload={reloadAll} />
    </div>
  );
};

export default DashBoard;
