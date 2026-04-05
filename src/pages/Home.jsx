import { useNavigate } from 'react-router-dom';
import '../style/Home.css'

const Home = () => {

  const navigate = useNavigate(); // ✅ correct

  return (
    <header className="main-header">

      <div className="header-content">

       
        <h2>
          A children's clothing store specialized in all the needs of infants and mothers
        </h2>


          <button 
          className="shop-btn" 
          onClick={() => navigate("/shop")}
        >
          تسوق الان
        </button>
        

       
      </div>

      

    </header>
  )
}

export default Home;
