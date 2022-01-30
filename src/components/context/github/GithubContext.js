import { createContext, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import githubReducer from "./GithubReducer";
import AlertContext from "../alert/AlertContext";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    };

    const { setAlert } = useContext(AlertContext);

    const [state, dispatch] = useReducer(githubReducer, initialState);

    const errorNavigate = useNavigate();

    const searchUsers = async (text) => {
        dispatch({ type: "SET_LOADING" });

        const params = new URLSearchParams({
            q: text,
        });

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });

        if (response.status === 404) {
            responseError();
        } else {
            const { items } = await response.json();

            if (items.length === 0) {
                dispatch({ type: "CLEAR_LOADING" });

                setAlert("Nothing found", "findError");
            } else {
                dispatch({
                    type: "GET_USERS",
                    payload: items,
                });
            }
        }
    };

    const getUser = async (login) => {
        dispatch({ type: "SET_LOADING" });

        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });

        if (response.status === 404) {
            responseError();
        } else {
            const data = await response.json();

            dispatch({
                type: "GET_USER",
                payload: data,
            });
        }
    };

    const getUserRepos = async (login) => {
        dispatch({ type: "SET_LOADING" });

        const params = new URLSearchParams({
            type: "public",
            sort: "updated",
            direction: "desc",
            per_page: 10,
        });

        const response = await fetch(
            `${GITHUB_URL}/users/${login}/repos?${params}`,
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                },
            }
        );

        if (response.status === 404) {
            responseError();
        } else {
            const data = await response.json();

            dispatch({
                type: "GET_REPOS",
                payload: data,
            });
        }
    };

    const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

    const clearUser = () => dispatch({ type: "CLEAR_USER" });

    const responseError = () => {
        dispatch({ type: "CLEAR_LOADING" });

        errorNavigate("/notfound", { replace: true });
    };

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                getUser,
                clearUsers,
                clearUser,
                getUserRepos,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
