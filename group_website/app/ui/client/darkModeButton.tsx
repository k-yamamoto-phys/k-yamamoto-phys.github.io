// 'use client'

// import { useAtom } from "jotai"; 
// import { darkModeAtom } from "@/app/lib/atom"
// import { IoSunnySharp, IoMoonSharp } from "react-icons/io5";

// export const DarkModeButton = () => {
//     const [darkMode, setDarkMode] = useAtom(darkModeAtom); 
//     return <label className="hidden min-[350px]:inline-flex items-center cursor-pointer select-none">
//         <input type="checkbox" value="" checked={darkMode} onChange={()=>setDarkMode(!darkMode)} className="sr-only peer"/>
//         <IoSunnySharp className="text-yellow-300"/>&nbsp;
//         <div className="relative w-11 h-6 bg-yellow-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500" />&nbsp;
//         <IoMoonSharp className="text-cyan-500" />
//     </label>
// }

