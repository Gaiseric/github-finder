import { useState, useContext } from "react";
import GithubContext from "../context/github/GithubContext";
import { FaTrashAlt, FaSistrix } from "react-icons/fa";

function UserSearch() {
    const [text, setText] = useState("");

    const { users, searchUsers, clearUsers } = useContext(GithubContext);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text === "") {
            alert("Please enter something");
        } else {
            searchUsers(text);
        }
    };

    const handleClear = () => {
        clearUsers();
        setText("");
    };

    return (
        <div className="mx-auto mb-3 w-5/6 sticky top-0 z-10 p-1 bg-neutral/50 rounded-lg">
            <form onSubmit={handleSubmit} className="m-2">
                <div className="form-control">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full pr-40 bg-gray-200 input text-black block"
                            placeholder="Search"
                            value={text}
                            onChange={handleChange}
                        />
                        {users.length > 0 && (
                            <button
                                className="btn btn-warning absolute top-0 right-[48px] 
                                    rounded-none"
                                onClick={handleClear}
                                title="Clear search results"
                            >
                                <FaTrashAlt />
                            </button>
                        )}
                        <button
                            type="submit"
                            className="absolute top-0 right-0 rounded-l-none 
                                    w-30 btn btn-success"
                            title="Find users"
                        >
                            <FaSistrix />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UserSearch;
