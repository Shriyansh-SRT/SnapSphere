import { useUserContext } from "@/context/AuthContext"
import { formatRelativeTime } from "@/lib/utils"
import { Models } from "appwrite"
import { Link } from "react-router-dom"

type PostCardProps = {
  post: Models.Document
}

const PostCard = ({ post }: PostCardProps) => {

  console.log(post, "Post")

  const { user } = useUserContext();

  if(!post.creator) return null;

  return (
    <div className="bg-zinc-950 rounded-3xl border border-zinc-900 p-5 lg:p-7 w-full max-w-screen-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img 
              src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'} 
              alt="creator"
              className="rounded-full w-12 h-12 lg:h-12"
              />
          </Link>

          <div className="flex flex-col">
            <p className="text-[16px] font-medium leading-[140%] lg:text-[18px] lg:font-bold text-white">
              {post.creator.name}
            </p>
              <div className="flex items-center justify-center gap-2 text-slate-500">
                <p className="text-[12px] font-semibold leading-[140%] lg:ext-[14px] lg:font-normal">
                  {formatRelativeTime(post.$createdAt)}
                </p>
                -
                <p className="text-[12px] font-semibold leading-[140%] lg:ext-[14px] lg:font-normal">
                  {post.location}
                </p>
              </div>
          </div>
        </div>

        <Link to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id ? 'hidden' : 'block'}`}
        >
          <img 
            src="/assets/icons/edit.svg" alt="edit" 
            width={20}
            />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="text-[14px] font-medium leading-[140%] lg:text-[16px] lg:font-medium py-4">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-slate-500 bg-zinc-800 px-2 py-1 rounded-lg text-sm font-medium">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img 
          src={post.imageUrl  || 'assets/icons/profile-placeholder.svg'} 
          alt="post-img" 
          className="bg-zinc-950 rounded-3xl border border-zinc-900 w-full max-w-screen-sm object-cover"
          />
      
      </Link>
    </div>
  )
}

export default PostCard