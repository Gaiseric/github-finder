import spinner from "./assets/spinner.gif";

function Spinner() {
    return (
        <div className="w-100">
            <img
                width={180}
                alt="Loading..."
                className="text-center mx-auto"
                src={spinner}
            />
        </div>
    );
}

export default Spinner;
