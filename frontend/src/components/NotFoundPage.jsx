import { Link } from "react-router";
import { AlertCircle } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const NotFoundPage=()=> {
  const{theme}=useThemeStore();
  return (
    <div className='flex items-center justify-center min-h-screen px-4' data-theme={theme}>
      <div className="text-center">
        <AlertCircle className="mx-auto mb-6 w-20 h-20" />
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary font-semibold rounded-lg shadow hover:bg-primary/90 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
