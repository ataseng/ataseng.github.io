import "./Home.css";
import logo512 from "../../assets/images/512_512.jpg";

const Home = () => {
  return (
    <div style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>
        <img src={logo512} alt="Logo512" />
    </div>
  )
}

export default Home