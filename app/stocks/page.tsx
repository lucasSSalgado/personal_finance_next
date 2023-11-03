import AuthWrapper from "../componenets/AuthWrapper";
import Header from "../componenets/Header";
import FormStock from "./components/FormStock";

export default function Stocks() {
    return (
        <AuthWrapper>
            <Header />
            <div className="m-auto w-8/12 mt-5">
                <h1 className="mb-7 text-3xl">Search for your stocks</h1>
                <FormStock />
            </div>
        </AuthWrapper>
    )
}