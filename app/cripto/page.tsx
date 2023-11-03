import AuthWrapper from "../componenets/AuthWrapper";
import Header from "../componenets/Header";
import CriptoForm from "./components/CriptoForm";

export default function Cripto() {
    return(
        <AuthWrapper>
            <Header />
            <div className="w-8/12 mt-5 m-auto">
                <h1 className="text-3xl">Cripto</h1>
                <CriptoForm />
            </div>
        </AuthWrapper>
    )
}