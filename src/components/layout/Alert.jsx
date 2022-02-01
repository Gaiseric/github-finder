import { useContext } from "react";
import AlertContext from "../context/alert/AlertContext";

function Alert() {
    const { alert } = useContext(AlertContext);

    return (
        alert.type !== "none" && (
            <p className="flex justify-center items-start space-x-2">
                <svg
                    className="w-6 h-6 flex-none mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="12" r="12" fill="#FECDD3"></circle>
                    <path
                        d="M8 8l8 8M16 8l-8 8"
                        stroke="#B91C1C"
                        strokeWidth="2"
                    ></path>
                </svg>

                <strong className="text-base font-semibold leading-7 text-rose-200">
                    {alert.msg}
                </strong>
            </p>
        )
    );
}

export default Alert;
