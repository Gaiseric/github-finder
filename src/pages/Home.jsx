import UserSearch from "../components/users/UserSearch";
import UserResults from "../components/users/UserResults";

function Home() {
    return (
        <div className="text-center">
            <UserSearch />
            <UserResults />
        </div>
    );
}

export default Home;
