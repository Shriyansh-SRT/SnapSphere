import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react_query/queriesAndMutations'
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants/index';
import { INavLink } from '@/types';

const LeftSidebar = () => {

  const { pathname } = useLocation();
  const {mutateAsync : signOutAccount, isSuccess} = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext()

  useEffect(() => {
    if(isSuccess){
      navigate(0)
    }
  }, [isSuccess])

  return (
    <nav className='hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-dark-2'>
    <div className="flex flex-col gap-11">
      <Link to='/' className='flex gap-3 items-center'>
          <img
            src='/assets/images/logo.svg'
            alt='logo'
            width={170}
            height={36}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img src={user.imageUrl || "assets/images/profile.png" } alt="profile" className='h-14 w-14 rounded-full' />
            <div className='flex flex-col'>
              <p className=' text-[18px] font-bold leading-[140%]'>
                {user.name}
              </p>
              <p className='text-[14px] font-normal leading-[140%] text-gray-400'>
                @{user.username}
              </p>
            </div>
        </Link>

        <ul className='flex flex-col gap-6'>
          {
            sidebarLinks.map((link: INavLink) => {

              const isActive = pathname === link.route;

              return (
                <li key={link.label} className={`rounded-lg base-medium hover:bg-indigo-700 transition group ${isActive && 'bg-indigo-700'}`}>
                    <NavLink className="flex gap-4 items-center p-4" to={link.route}>
                      <img src={link.imgURL} alt={link.label} className={`${isActive && 'invert brightness-0 transition'}group-hover:invert group-hover:brightness-200 group-hover:transition`} />
                    {link.label}
                    </NavLink>
                </li>
                
              )
            })
          }
        </ul>
    </div>

    <Button 
      variant='ghost' 
      className='flex gap-4 items-center justify-start hover:bg-transparent hover:text-white !important' 
      onClick={() => signOutAccount()}>
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className='text-[14px] font-medium leading-[140%] lg:text-[16px]'>Logout</p>
      </Button>
  </nav>
  )
}

export default LeftSidebar