import { useParams } from 'react-router'
import { competitionsData } from '../Data/CompetitionsData';
const CompetitionDetail = () => {
  
  const {title} = useParams();

  const formattedTitle = title.split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(' ');

  

  const competition = competitionsData.find(item => item.title === formattedTitle);

  if(!competition){
    return <h2>Competition Not Found</h2>;
  }

  return (
    <>
    {/* <ul>
      <li>{competition.title}</li>
      <li>{competition.content}</li>
      <li>{competition.location}</li>
      <li>{competition.date}</li>
      <li>{competition.time}</li>
      </ul> */}
    </>
  )
};

export default CompetitionDetail;