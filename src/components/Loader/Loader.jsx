import "./Loader.css";

const Loader = ({ color }) => {
  return (
    <>
        <span className={`spinner ${color === "white" && 'white'}`}/>
        <div className="loading">
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
        </div>
    </>
  )
}

export default Loader