import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { set } from "zod";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeIcon, setLikeIcon] = useState<string>('/assets/icons/like.svg');
  const [saveIcon, setSaveIcon] = useState<string>('/assets/icons/save.svg');

  const handleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    console.log(isLiked, "isLiked");
  }

  const handleSave = () => {
    setIsSaved((prevIsSaved) => !prevIsSaved)
  }

  useEffect(() => {
    setLikeIcon(isLiked ? '/assets/icons/liked.svg' : '/assets/icons/like.svg')
    setSaveIcon(isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg')
  }, [isLiked, isSaved])

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img 
          src={likeIcon}
          alt="like" 
          height={20}
          width={20}
          className="cursor-pointer"
          onClick={handleLike}
          />

          <p className="text-[14px] font-medium leading-[140%] lg:text-[16px]">0</p>

      </div>

      <div className="flex gap-2">
        <img 
          src={saveIcon}
          alt="like" 
          height={20}
          width={20}
          className="cursor-pointer"
          onClick={handleSave}
          />

      </div>

    </div>
  )
}

export default PostStats