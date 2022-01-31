import { Component } from "react";
import { FaHome } from "react-icons/fa";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            msg: "",
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, msg: error.message };
    }

    refreshApp = () => {
        window.location = "/";
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="hero">
                    <div className="text-center hero-content">
                        <div className="max-w-lg">
                            <h1 className="text-8xl font-bold mb-8">Oops!</h1>
                            <p className="text-5xl mb8 mb-8">
                                {this.state.msg}
                            </p>
                            <button
                                className="btn btn-primary mt-4"
                                onClick={this.refreshApp}
                            >
                                <FaHome className="mr-2" />
                                Try To Refresh
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
