function About() {
    return (
        <div className="text-center mx-auto">
            <h1 className="text-6xl mb-4">Github Finder</h1>
            <p className="mb-4 text-2xl font-light">
                A React app to search GitHub profiles and see profile details.
                This project is part of the
                <strong>
                    <a href="https://www.udemy.com/course/modern-react-front-to-back/">
                        &nbsp;React Front To Back&nbsp;
                    </a>
                </strong>
                Udemy course.
            </p>
            <p className="text-lg text-gray-400">
                Version <span className="text-white">1.0.0</span>
            </p>
            <p className="text-lg text-gray-400">
                Made by:
                <a className="text-white" href="https://traversymedia.com">
                    &nbsp;Gaiseric
                </a>
            </p>
            <p className="text-lg text-gray-400">
                Teacher:
                <a className="text-white" href="https://traversymedia.com">
                    &nbsp;Brad Traversy
                </a>
            </p>
            <p className="text-lg text-gray-400">
                Layout By:
                <a
                    className="text-white"
                    href="https://twitter.com/hassibmoddasser"
                >
                    &nbsp;Hassib Moddasser
                </a>
            </p>
        </div>
    );
}

export default About;
