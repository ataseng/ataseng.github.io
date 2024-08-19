import { competitionsData } from "./data";

const Competitions = () => {

  return (
    <>
        <h2>Competitions</h2>
        {
            competitionsData.map(competition => (
                <>
                    <h3>{competition.name}</h3>
                </>
            ))
        }
    </>
  )
}

export default Competitions