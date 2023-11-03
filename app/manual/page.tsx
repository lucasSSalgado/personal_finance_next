import AuthWrapper from "../componenets/AuthWrapper";
import Header from "../componenets/Header";

export default function Manual() {
    return(
        <AuthWrapper>
            <Header />
            <div className="w-8/12 mt-5 m-auto">
                Manual
            </div>
        </AuthWrapper>
    )
}