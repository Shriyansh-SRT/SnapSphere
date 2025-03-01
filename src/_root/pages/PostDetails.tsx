import Loader from "@/components/shared/Loader"
import PostStats from "@/components/shared/PostStats"
import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/AuthContext"
import { useGetPostById } from "@/lib/react_query/queriesAndMutations"
import { formatRelativeTime } from "@/lib/utils"
import { Link, useParams } from "react-router-dom"

const PostDetails = () => {

  const { id } = useParams()
  const { data: post, isPending } = useGetPostById(id || '')
  const { user } = useUserContext()
  const handleDeletePost = () => {}

  return (
    <div className="flex flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar items-center">
      {isPending ? <Loader /> : (
        <div className="bg-zinc-950 w-full max-w-5xl rounded-[30px] flex-col flex xl:flex-row border border-zinc-900 xl:rounded-l-[24px]">
          <img 
            src={post?.imageUrl} 
            alt="post"
            className="h-80 lg:h-[480px] xl:w-[48%] rounded-t-[30px] xl:rounded-l-[24px] xl:rounded-tr-none object-cover p-5 bg-black"
            />

          <div className=" bg-zinc-950 flex flex-col gap-5 lg:gap-7 flex-1 items-start p-8 rounded-[30px]">
            <div className="flex items-center justify-between w-full">

            <Link  
              to={`/profile/${post?.creator.$id}`}
              className="flex items-center gap-3"
              >
              <img 
                src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'} 
                alt="creator"
                className="rounded-full w-8 h-8 lg:h-12 lg:w-12 object-cover"
                />

              <div className="flex flex-col">
                <p className="text-[16px] font-medium leading-[140%] lg:text-[18px] lg:font-bold text-white">
                  {post?.creator.name}
                </p>

                <div className="flex items-center justify-center gap-2 text-slate-500">
                  <p className="text-[12px] font-semibold leading-[140%] lg:ext-[14px] lg:font-normal">
                    {formatRelativeTime(post?.$createdAt || '')}
                  </p>
                  -
                  <p className="text-[12px] font-semibold leading-[140%] lg:ext-[14px] lg:font-normal">
                    {post?.location}
                  </p>
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link 
                to={`/update-post/${post?.$id}`}
                className={`${user.id !== post?.creator?.$id && 'hidden'}`}
                >
                <img 
                  src="/assets/icons/edit.svg" 
                  alt="edit-icon"
                  width={24}
                  height={24}
                  />
              </Link>

              <Button
                onClick={handleDeletePost}
                className={`user.id !== post?.creator?.$id && 'hidden'`}
              >
                <img 
                src="/assets/icons/delete.svg" 
                alt="delete"
                width={24}
                height={24}
                />

              </Button>
            </div>

            </div>

            <hr className="border w-full border-zinc-900" />

              <div className="flex flex-col flex-1 w-full text-[14px] font-medium leading-[140%] lg:text-[16px] lg:font-normal ">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-slate-500 bg-zinc-800 px-2 py-1 rounded-lg text-sm font-medium">
                    #{tag}
                  </li>
                ))}
              </ul>
              </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
            
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails