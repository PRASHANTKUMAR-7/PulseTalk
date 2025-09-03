import { LoaderIcon } from 'lucide-react'
import React from 'react'

const PageLoader = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10 text-primary'/>      
    </div>
  );
};

export default PageLoader

// import React, { useEffect, useState } from "react";

// export default function ConversationLoader() {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     let start = null;
//     const duration = 4000; // ms to reach 100%

//     function animate(timestamp) {
//       if (!start) start = timestamp;
//       const elapsed = timestamp - start;
//       const percentage = Math.min((elapsed / duration) * 100, 100);
//       setProgress(percentage);

//       if (percentage < 100) {
//         requestAnimationFrame(animate);
//       }
//     }

//     requestAnimationFrame(animate);
//   }, []);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
//       <div className="w-[60%] p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
//         {/* Conversation bubbles */}
//         <div className="space-y-4 mb-6">
//           {/* Male bubble (left) */}
//           <div className="flex items-start gap-3">
//             <div className="w-10 h-10 rounded-full bg-blue-400" />
//             <div className="space-y-2">
//               <div className="w-40 h-4 rounded-md bg-gray-300 dark:bg-gray-700"></div>
//               <div className="w-28 h-4 rounded-md bg-gray-300 dark:bg-gray-700"></div>
//             </div>
//           </div>

//           {/* Female bubble (right) */}
//           <div className="flex items-start gap-3 justify-end">
//             <div className="space-y-2">
//               <div className="w-32 h-4 rounded-md bg-gray-300 dark:bg-gray-700"></div>
//               <div className="w-20 h-4 rounded-md bg-gray-300 dark:bg-gray-700"></div>
//             </div>
//             <div className="w-10 h-10 rounded-full bg-pink-400" />
//           </div>

//           {/* Male bubble again */}
//           <div className="flex items-start gap-3">
//             <div className="w-10 h-10 rounded-full bg-blue-400" />
//             <div className="space-y-2">
//               <div className="w-48 h-4 rounded-md bg-gray-300 dark:bg-gray-700"></div>
//               <div className="w-36 h-4 rounded-md bg-gray-300 dark:bg-gray-700"></div>
//             </div>
//           </div>
//         </div>

//         {/* Progress bar */}
//         <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
//           <div
//             className="h-full rounded-full transition-[width] duration-100 ease-linear"
//             style={{
//               width: `${progress}%`,
//               background: `linear-gradient(to right, #374151, #22c55e)`,
//             }}
//           />
//         </div>

//         {/* Status */}
//         <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
//           {progress < 100
//             ? `Loading... ${Math.round(progress)}%`
//             : "✅ Loaded"}
//         </p>
//       </div>
//     </div>
//   );
// }
