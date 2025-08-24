import "./Loader.css";

const Loader = ({ color }) => {
  return (
    <>
        <span className={`spinner ${color === "white" && 'white'}`}/>
        <div className="loading">
            <span>Y</span>
            <span>Ü</span>
            <span>K</span>
            <span>L</span>
            <span>E</span>
            <span>N</span>
            <span>İ</span>
            <span>Y</span>
            <span>O</span>
            <span>R</span>
        </div>
    </>
  )
}

export default Loader