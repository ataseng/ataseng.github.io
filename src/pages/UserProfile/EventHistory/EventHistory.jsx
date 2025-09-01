import { useEffect } from "react"
import { api } from "../../../api"
import { useSelector } from "react-redux"

const EventHistory = () => {

    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        api.get_with_auth("https://ataseng.com/api/member/get.php", userInfo.access_token)
    
    }, [])
  return (
    <section className='post-section'>
            <div className="section-content post-content">
                Event History

            </div>
        </section>
  )
}

export default EventHistory