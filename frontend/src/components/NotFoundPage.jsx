import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const NotFoundPage=()=> {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center">
        <AlertCircle className="mx-auto mb-6 w-20 h-20 text-red-500" />
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
