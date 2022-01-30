import PropTypes from "prop-types";

function ReposList({ repos }) {
    return (
        <div className="rounded-ld shadow-lg card bg-base-100">
            <div className="card-body">
                <h2 className="text-3xl my-4 font-bold card-title">
                    Latest Updated Repos
                </h2>
                {repos.map((repo) => (
                    <h3>{repo.name}</h3>
                ))}
            </div>
        </div>
    );
}

ReposList.propTypes = {
    repos: PropTypes.array.isRequired,
};

export default ReposList;
