import { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../alert/AlertContext";
import GithubContext from "./GithubContext";

function useGithubActions() {
    const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
    const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

    const { setAlert } = useContext(AlertContext);

    const { dispatch } = useContext(GithubContext);

    const errorNavigate = useNavigate();

    const fetchError = useCallback(
        (message) => {
            dispatch({ type: "CLEAR_LOADING" });
            setAlert(`${message}`, "findError");
        },
        [dispatch, setAlert]
    );

    const responseError = useCallback(() => {
        dispatch({ type: "CLEAR_LOADING" });
        errorNavigate("/notfound", { replace: true });
    }, [dispatch, errorNavigate]);

    const searchUsers = async (text) => {
        dispatch({ type: "SET_LOADING" });

        const params = new URLSearchParams({
            q: text,
        });

        try {
            const response = await fetch(
                `${GITHUB_URL}/search/users?${params}`,
                {
                    headers: {
                        Authorization: `token ${GITHUB_TOKEN}`,
                    },
                }
            );

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
        } catch (error) {
            fetchError(error.message);
        }
    };

    const getUser = useCallback(
        async (login) => {
            dispatch({ type: "SET_LOADING" });

            try {
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
            } catch (error) {
                fetchError(error.message);
            }
        },
        [GITHUB_TOKEN, GITHUB_URL, dispatch, fetchError, responseError]
    );

    const getUserRepos = useCallback(
        async (login) => {
            dispatch({ type: "SET_LOADING" });

            const params = new URLSearchParams({
                type: "public",
                sort: "updated",
                direction: "desc",
                per_page: 10,
            });

            try {
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
            } catch (error) {
                fetchError(error.message);
            }
        },
        [GITHUB_TOKEN, GITHUB_URL, dispatch, fetchError, responseError]
    );

    const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

    const clearUser = useCallback(
        () => dispatch({ type: "CLEAR_USER" }),
        [dispatch]
    );

    const clearRepos = useCallback(
        () => dispatch({ type: "CLEAR_REPOS" }),
        [dispatch]
    );

    return {
        searchUsers,
        getUser,
        getUserRepos,
        clearUsers,
        clearUser,
        clearRepos,
    };
}

export default useGithubActions;
