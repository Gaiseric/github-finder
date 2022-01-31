import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import User from "./pages/User";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import { GithubProvider } from "./components/context/github/GithubContext";
import { AlertProvider } from "./components/context/alert/AlertContext";

function App() {
    return (
        <Router>
            <AlertProvider>
                <GithubProvider>
                    <div className="flex flex-col justify-between h-screen">
                        <Navbar />
                        <main className="container mx-auto px-3 pb-12">
                            <ErrorBoundary>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route
                                        path="/user/:login"
                                        element={<User />}
                                    />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/*" element={<NotFound />} />
                                </Routes>
                            </ErrorBoundary>
                        </main>
                        <Footer />
                    </div>
                </GithubProvider>
            </AlertProvider>
        </Router>
    );
}

export default App;
