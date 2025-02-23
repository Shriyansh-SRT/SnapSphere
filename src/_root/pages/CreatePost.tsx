import PostForm from '@/components/forms/PostForm'

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
      <div className='flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar'>
        <div className='max-w-5xl flex justify-start items-center w-full'>
          <img 
            src="/assets/icons/add-post.svg" 
            alt="add"
            height={36}
            width={36}
            />
            <h2 className='ml-2 text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] text-left w-full md:ml-2 '>
              Create a Post
            </h2>
        </div>

        <PostForm />
      </div>

    </div>
  )
}

export default CreatePost