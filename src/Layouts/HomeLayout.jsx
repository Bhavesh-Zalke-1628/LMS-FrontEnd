import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Component/Footer'
import { logout } from '../Redux/Slices/AuthSlice';
import { useEffect, useState } from 'react';
import Preloader from '../Loader/PreLoader';
function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    // for checking if user is logged in 
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)

    // for displaying the options according to role
    const role = useSelector((state) => state?.auth?.role);
    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';
    }
    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';
    }
    async function handleLogout(e) {
        e.preventDefault();
        const res = await dispatch(logout());
        if (res?.payload?.success)
            navigate("/");
    }
    useEffect(() => {
        // Simulate some loading time
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    return (
        <>
            {loading ? <Preloader /> :

                <div className="min-h-[90vh]">


                    <div className="drawer absolute left-0 z-50 w-fit">
                        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer" className="cursor-pointer relative">
                                <FiMenu
                                    onClick={changeWidth}
                                    size={"32px"}
                                    className="font-bold text-white m-4 transition-all ease-in duration-300"
                                />
                            </label>
                        </div>
                        <div className="drawer-side w-0">
                            <label htmlFor="my-drawer" className="drawer-overlay">
                            </label>
                            <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-200  text-base-content relative">
                                <li className="w-fit absolute right-2 z-50">
                                    <button onClick={hideDrawer}>
                                        <AiFillCloseCircle size={24} />
                                    </button>
                                </li>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                {isLoggedIn && role === 'Admin' && (
                                    <>
                                        <li>
                                            <Link to="/admin/dashboard"> Admin DashBoard</Link>
                                        </li>
                                        <li>
                                            <Link to="/course/create">Create New Cource</Link>
                                        </li>
                                    </>

                                )}
                                <li>
                                    <Link to="/cources">All Courses</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contact Us</Link>
                                </li>
                                <li>
                                    <Link to="/about">About Us</Link>
                                </li>
                                {!isLoggedIn && (
                                    <li className='absolute bottom-4 w-[90%]  shadow-[0_0_5px_black]'>
                                        <div className=' w-full flex items-center justify-center gap-2'>
                                            <button className=' px-2 py-2 font-semibold rounded-md w-fulltext-white bg-yellow-500 hover:bg-yellow-600 text-white transition-all ease-in-out duration-300 w-full'>
                                                <Link to='/login'>Login</Link>
                                            </button>
                                            <button className='px-2 py-1.5 font-semibold rounded-md w-full border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black transition-all ease-in-out duration-400'>
                                                <Link to='/signup'>Signup</Link>
                                            </button>
                                        </div>
                                    </li>
                                )}

                                {isLoggedIn && (
                                    // <li className='absolute bottom-4 w-[90%]'>
                                    //     <div className=' w-full flex items-center justify-center'>
                                    //         <button className=' btn-primary px-2 py-1 font-semibold rounded-md w-full'>
                                    //             <Link to='/user/profile'>Profile</Link>
                                    //         </button>
                                    //         <button className=' btn-secondary px-2 py-1 font-semibold rounded-md w-full'>
                                    //             <Link onClick={handleLogout}>Logout</Link>
                                    //         </button>
                                    //     </div>
                                    // </li>
                                    <li className='absolute bottom-4 w-[90%]  shadow-[0_0_5px_black]'>
                                        <div className=' w-full flex items-center justify-center gap-2'>
                                            <button className=' px-2 py-2 font-semibold rounded-md w-fulltext-white bg-yellow-500 hover:bg-yellow-600 text-white transition-all ease-in-out duration-300 w-full'>
                                                <Link to='/user/profile'>Profile</Link>

                                            </button>
                                            <button className='px-2 py-1.5 font-semibold rounded-md w-full border-2 border-yellow-500 hover:bg-red-600 hover:border-none hover:text-white transition-all ease-in-out duration-300'>
                                                <Link onClick={handleLogout}>Logout</Link>
                                            </button>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    {children}
                    <Footer />
                </div>
            }
        </>
    );
}
export default HomeLayout;