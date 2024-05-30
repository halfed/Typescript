import { Link } from 'react-router-dom';

function HomePage() {
  return (
  <div>
    <h1>My Home Page Sucka!</h1>
    <p>Go to <Link to="/products">the list of products</Link>.</p>
  </div>
  )
}

export default HomePage;