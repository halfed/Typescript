import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  // useNavigate hook to programmatically call a route
  function navigateHander() {
    navigate('/products');
  }
  

  return (
  <>
    <h1>My Home Page Sucka!</h1>
    <p>Go to <Link to="/products">the list of products</Link>.</p>

    <p>
        <button onClick={navigateHander}>Navigate</button>
    </p>
  </>
  )
}

export default HomePage;