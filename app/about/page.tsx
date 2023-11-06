import AuthWrapper from "../componenets/AuthWrapper";
import Headers from "../componenets/Header";

export default function About() {
    return (
            <AuthWrapper>
                <Headers />
                <div className="w-8/12 mx-auto p-2 mt-5">
                    <h2>About</h2>
                </div>
            </AuthWrapper>
    )
}