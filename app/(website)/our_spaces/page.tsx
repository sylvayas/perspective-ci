import HeaderPage from "./components/header-page"
import DescriptionAllSpaces from "./components/DescriptionAllSpaces"
import SubSection from "./components/space-states";

export default async function OurSpace() {
    return (
        <div>
            <HeaderPage />
            <DescriptionAllSpaces />
            <SubSection/>
        </div>
    );
}
