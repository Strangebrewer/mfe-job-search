import { useNavigate } from 'react-router-dom';
import RecruitersList from '../components/recruiters/RecruitersList';
import JobsList from '../components/jobs/JobsList';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Hey there, Too!</h1>
      <RecruitersList />
      <JobsList />
      <button onClick={() => navigate('/job-search/derp')}>Derp!</button>
      <br/>
      <button onClick={() => navigate('/job-search/shizzle')}>Fake Route 2!</button>
    </div>
  )
}

export default Home;
