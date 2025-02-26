import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';
import { useGetRecentPosts } from '@/lib/react_query/queriesAndMutations';
import { Models } from 'appwrite';

const Home = () => {

  const { data: posts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts();

  return (
    <div className='flex flex-1'>
      <div className='flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar'>
        <div className='max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9'>
          <h2 className='text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] text-left w-full '>Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
           <ul className='flex flex-col flex-1 gap-9 w-full'>
              {posts?.documents.map((post: Models.Document) => {
                console.log(post, "Post");
                return <PostCard post={post} key={post.caption} />
            })}
           </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home