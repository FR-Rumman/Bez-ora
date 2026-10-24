import { Link } from "react-router-dom";


function navbar() {
    return (
        <div className=" navbar bg-pink-400 shadow-lg px-8 flex justify-between items-end py-4">
            <div className="flex-1">
                <h1 className="text-3xl font-bold text-pink-100">
                    bez-ora 
                </h1>
            </div>
            <div className="flex gap-6 font-semibold">
                <p>Home</p>
                <p>All products</p>
                <p>My products</p>
                <Link to="/login">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default navbar;