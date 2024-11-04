import BootcampsCard from '../../../components/BootcampsCard/BootcampsCard';
import data from './Data.json'
const Bootcamps = () => {
    return (
        <>
            <div className="sidebar-margin">
                <BootcampsCard data = {data}/>
            </div>
        </>
    )
};

export default Bootcamps;