import GridPostList from "@/components/shared/GridPostList";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input"
import { useState } from "react"


const Explore = () => {

  const [searchValue, setSearchValue] = useState('')

  const { data: searchedPosts,  }
  
  // const posts = [];
  // const shouldShowSearchResults = searchValue !== '';
  // const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item.documents.length > 0 )

  return (
    <div className="flex flex-col flex-1 items-center overflow-scroll py-10 px-5 md:p-14 custom-scrollbar">
      <div className="max-w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
        <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] w-full">Search Posts</h2>
        <div className="flex gap-4 w-full px-4 rounded-large bg-zinc-900">
          <img 
            src="/assets/icons/search.svg" 
            alt="search-icon"
            height={24}
            width={24}
            />
            <Input
              type="text"
              placeholder="search"
              className="h-12 bg-zinc-900 border-none placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-0 !important"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
      </div>

      <div className="flex justify-between items-center w-full max-w-5xl mt-16 mb-7">
        <h3 className="text-[18px] font-bold leading-[140%]">Today's Popular</h3>

        <div className="flex items-center justify-center gap-3 bg-zinc-950 rounded-xl px-4 py-2 cursor-pointer">
          <p className="text-[14px] font-medium leading-[140%] md:text-[16px] text-white">All</p>
          <img 
            src="/assets/icons/filter.svg" 
            alt="filter-icon"
            height={20}
            width={20}
            />
        </div>
      </div>

      {/* <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults />
        ) : shouldShowPosts ? (
          <p className="text-slate-600 mt-10 text-center w-full">End of posts</p>
        ) : posts.page.map((item, index) => (
          <GridPostList key={`page-${index}`} posts={item.documents} />
        ))
      }
      </div> */}

    </div>
  )
}

export default Explore