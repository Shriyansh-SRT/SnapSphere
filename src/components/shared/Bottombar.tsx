
import { NavLink, useLocation } from 'react-router-dom'
import { bottombarLinks } from '@/constants'
import { INavLink } from '@/types';

const Bottombar = () => {

  const { pathname } = useLocation();
  

  return (
    <section className='z-50 flex justify-between items-center w-full sticky bottom-0 rounded-t-[20px] bg-dark-2 px-5 py-4 md:hidden'>
      {
            bottombarLinks.map((link: INavLink) => {

              const isActive = pathname === link.route;

              return (
                    <NavLink key={link.label} className={`rounded-lg base-medium hover:bg-indigo-700 transition group ${isActive && 'bg-indigo-700'} rounded-[10px] flex flex-col justify-center items-center gap-2 text-center p-3 transition`} to={link.route}>
                      <img 
                        src={link.imgURL} 
                        alt={link.label} 
                        className={`${isActive && 'invert brightness-0 transition'}group-hover:invert group-hover:brightness-200 group-hover:transition`}
                        width={16}
                        height={16}
                        />
                    <p className='text-[10px] font-medium leading-[140%] text-white'>{link.label}</p>
                    </NavLink>
              )
            })
          }

    </section>
  )
}

export default Bottombar