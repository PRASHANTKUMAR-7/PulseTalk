// import useAuthUser from '../hooks/useAuthUser'
// import { useLocation } from 'react-router';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import {MessageSquareHeart,BellIcon,LogOutIcon} from "lucide-react";
// import { Link } from 'react-router';
// import { logout } from '../lib/api';
// import ThemeSelector from './ThemeSelector';
// const Navbar = () => {
//   const {authUser}=useAuthUser();
//   const location= useLocation();
//   const isChatPage=location.pathname?.startsWith("/chat");

//   const queryClient=useQueryClient();

// // logout mutation
//   const {mutate:logoutMutation}=useMutation({
//     mutationFn:logout,
//     onSuccess: ()=> queryClient.invalidateQueries({queryKey:["authUser"]})
//   });

//   return(
//    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
//   <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="flex items-center justify-end w-full">
//       {/* LOGO - ONLY IN THE CHAT PAGE */}
//       {isChatPage && (
//         <div className="pl-5">
//           <Link to="/" className="flex items-center gap-2.5">
//             <MessageSquareHeart className="size-9 text-primary" />
//             <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
//               PulseTalk
//             </span>
//           </Link>
//         </div>
//       )}
//       <div className="flex items-center gap-3 sm:gap-4 ml-auto">
//         <Link to={"/notification"}>
//           <button className="btn btn-ghost btn-circle">
//             <BellIcon className="h-6 w-6 text-base-content opacity-70" />
//           </button>
//         </Link>
//       </div>
//       <ThemeSelector/>
//       <div className="avatar">
//         <div className="w-12 rounded-full">
//           <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer"/>
//         </div>
//         {/* logout */}
//         <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
//           <LogOutIcon className="h-6 w-6 text-base-content opacity-70"/>
//         </button>
//       </div>
//     </div>
//   </div>
// </nav>
// )
// }

// export default Navbar
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BellIcon, LogOutIcon, MessageSquareHeart } from "lucide-react";
import { Link, useLocation } from 'react-router';
import useAuthUser from '../hooks/useAuthUser';
import { useUnreadCount } from '../hooks/useNotifications';
import { logout } from '../lib/api';
import ThemeSelector from './ThemeSelector';

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const queryClient = useQueryClient();

  const { data: unreadData } = useUnreadCount();
  const unreadCount = unreadData?.count || 0;

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <MessageSquareHeart className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  PulseTalk
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to="/notification">
              <button className="btn btn-ghost btn-circle relative">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-content text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
            </Link>
          </div>

          <ThemeSelector />

          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
            </div>
            <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
              <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;