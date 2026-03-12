import { useNavigate } from 'react-router-dom';
import { useCreateJob, useGetJobs } from '../hooks/jobHooks';
import { useCreateRecruiter, useGetRecruiters } from '../hooks/recruiterHooks';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { data: jobs } = useGetJobs();
  const { data: recruiters } = useGetRecruiters();
  const { mutate: createJob} = useCreateJob();
  const { mutate: createRecruiter } = useCreateRecruiter();

  console.log('jobs:::', jobs);
  console.log('recruiters:::', recruiters);

  async function vurtdafurk() {
    createRecruiter({
      name: 'Cory Dickson',
      company: 'Interlinked Recruitment',
      phone: '817-345-1365 ',
      email: 'Cory.Dickson@interlinkedrecruitment.com',
      rating: 4,
      comments: ['Got me the job at KW','Reached out to me fairly quickly after layoff'],
    })
  }

  return (
    <div>
      <h1>Hey there, Too!</h1>
      <button onClick={() => navigate('/job-search/derp')}>Derp!</button>
      <br/>
      <button onClick={vurtdafurk}>New Recruiter</button>
      <br/>
      <button onClick={() => navigate('/job-search/shizzle')}>Fake Route 2!</button>
    </div>
  )
}

export default Home;
