import { useEffect } from "react"
import { api } from "../../../api"
import { useSelector } from "react-redux"

const EventHistory = () => {

    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    const getUser = async () => {
        const result = await api.get_with_auth(`https://ataseng.com/api/member/get.php?id=${userInfo?.user?.id}`, userInfo?.access_token);

        // console.log(result)
    }

    useEffect(() => {
        getUser();
    }, []);
  return (
    <section className='post-section'>
            <div className="section-content post-content">
                <h2>Etkinlik Geçmişi</h2>
                <p>Yapım Aşamasında</p>

            </div>
        </section>
  )
}

export default EventHistory