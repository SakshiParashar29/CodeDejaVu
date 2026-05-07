import { useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import RevisionList from "../components/dashboard/RevisionList";
import ProblemForm from "../components/dashboard/ProblemForm";
import HeatMap from "../components/dashboard/HeatMap";
import ProblemList from "../components/dashboard/ProblemList";
import Profile from "../components/dashboard/Profile";
import Footer from "../components/dashboard/Footer";

const Dashboard = () => {
  const [reload, setReload] = useState(false);

  const triggerReload = () => {
    setReload(prev => !prev);
  };

  return (
    <div>
      <Navbar />
      <Profile reload={reload} />
      <RevisionList reload={reload} onAction={triggerReload} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        <ProblemForm onAction={triggerReload} />
        <HeatMap reload={reload}/>
      </div>

      <ProblemList reload={reload} />
      <Footer/>
    </div>
  );
};

export default Dashboard;