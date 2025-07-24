import './SearchFilter.css'

const SearchFilter = ({setFiltered}) => {
  return (
    <div className="search-filter">
        <input onChange={(e => {setFiltered(e.target.value)})}  type="text" placeholder='Eğitim ara...' />
    </div>
  )
}

export default SearchFilter