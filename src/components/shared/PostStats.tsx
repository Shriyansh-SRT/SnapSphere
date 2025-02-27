import { useUserContext } from "@/context/AuthContext";
import { useDeleteSavePost, useLikePost, useSavePost } from "@/lib/react_query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { record, set } from "zod";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {

  const { mutateAsync: likePost }  = useLikePost();
  const { mutateAsync: savePost } = useSavePost();
  const { mutateAsync: deleteSavedPost } = useDeleteSavePost();

  const likesList = post.likes.map((user: Models.Document) => user.$id );

  const [likes, setLikes] = useState(likesList)
  const [isSaved, setIsSaved] = useState(false);

  const { data: currentUser } = useGetCurrentUser();
  

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);

    if(hasLiked){
      newLikes = newLikes.filter((id) => id !== userId)
    }else{
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({postId: post.$id, likesArray: newLikes});
  }

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.$id === post.$id);

    if(savedPostRecord){
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    }else{
      savePost({postId: post.$id, userId})
      setIsSaved(true)
    }
  }

  useEffect(() => {
    setLikeIcon(isLiked ? '/assets/icons/liked.svg' : '/assets/icons/like.svg')
    setSaveIcon(isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg')
  }, [isLiked, isSaved])

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img 
          src={`${checkIsLiked(likes, userId)
            ? '/assets/icons/liked.svg'
            : '/assets/icons/like.svg'
          }`}
          alt="like" 
          height={20}
          width={20}
          className="cursor-pointer"
          onClick={handleLikePost}
          />

          <p className="text-[14px] font-medium leading-[140%] lg:text-[16px]">{likes.length}</p>

      </div>

      <div className="flex gap-2">
        <img 
          src={`${isSaved
            ? '/assets/icons/saved.svg'
            : '/assets/icons/save.svg'
          }`}
          alt="like" 
          height={20}
          width={20}
          className="cursor-pointer"
          onClick={handleSavePost}
          />

      </div>

    </div>
  )
}

export default PostStats