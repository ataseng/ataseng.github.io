import { useRouteError, Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
    const error = useRouteError();
    return (
        <div id="error-page">
            <h1>Bir Hata Oluştu!</h1>
            {/* <p>Sayfa Yapım Aşamasındadır!</p> */}
            <p>
                {/* <i>{error.statusText || error.message}</i> */}
                <i>Sayfa Yapım Aşamasında!</i>
            </p>
            <Link to={`/`}>Anasayfa</Link>
        </div>
    )
}

export default NotFound