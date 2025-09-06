import useAuthUser from '../hooks/useAuthUser'
import { useLocation } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Navbar = () => {
  const {authUser}=useAuthUser();
  const location= useLocation();
  const isChatPage=location.pathname?.startsWith("/chat");

  const queryClient=useQueryClient();

// logout mutation
  const {mutation:logoutMutation}=useMutation({
    mutationFn:logout,
    onSuccess: ()=> queryClient.invalidateQueries({queryKey:["authUser"]})
  });

  return <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-end w-full">
      {/* LOGO - ONLY IN THE CHAT PAGE */}
      {isChatPage && (
        <div className="pl-5">
          <Link to="/" className="flex items-center gap-2.5">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </Link>
        </div>
      )}
    </div>
  </div>
</nav>;
}

export default Navbar
