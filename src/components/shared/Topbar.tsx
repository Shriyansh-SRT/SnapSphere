import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react_query/queriesAndMutations'
import { useEffect } from 'react';



const Topbar = () => {

  const {mutateAsync : signOut, isSuccess} = useSignOutAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if(isSuccess){
      navigate(0)
    }
  }, [isSuccess])

  return (
    <section className='sticky top-0 z-50 md:hidden bg-dark-2 w-full;'>
      <div className='flex justify-between items-center py-4 px-5'>

        <Link to='/' className='flex gap-3 items-center'>
          <img
            src='/assets/images/logo.svg'
            alt='logo'
            width={130}
            height={325}
          />
        </Link>

        <div className='flex gap-4'>
          <Button variant='ghost' className='flex gap-4 items-center justify-start hover:bg-transparent hover:text-white !important' onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
        </div>
        
      </div>
    </section>
  )
}

export default Topbar