import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Hey there, Too!</h1>
      <button onClick={() => navigate('/stuff/derp')}>Derp!</button>
      <br/>
      <button onClick={() => navigate('/shizzle')}>Fake Route!</button>
      <br/>
      <button onClick={() => navigate('/stuff/shizzle')}>Fake Route 2!</button>
    </div>
  )
}

export default Home;
