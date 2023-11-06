import AuthWrapper from "../componenets/AuthWrapper";
import Header from "../componenets/Header";
import FormManual from "./components/FormManual";

export default function Manual() {
    return(
        <AuthWrapper>
            <Header />
            <div className="w-8/12 mt-5 m-auto p-2">
                <FormManual />
            </div>
        </AuthWrapper>
    )
}