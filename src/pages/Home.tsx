import { useNavigate } from 'react-router-dom';
import RecruitersList from '../components/recruiters/RecruitersList';
import { useUserStore } from '@bka-stuff/mfe-utils';
import JobsList from '../components/jobs/JobsList';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  console.log('user:::', user);

  return (
    <div>
      <h1>Hey there, Too!</h1>
      {user && (
        <>
          <RecruitersList />
          <JobsList />
        </>
      )}
      <button onClick={() => navigate('/job-search/derp')}>Derp!</button>
      <br />
      <button onClick={() => navigate('/job-search/no-login')}>Nolo!</button>
      <br />
      <button onClick={() => navigate('/job-search/yep-login')}>Logo!</button>
      <br />
      <button onClick={() => navigate('/job-search/shizzle')}>Fake Route 2!</button>
    </div>
  )
}

export default Home;
