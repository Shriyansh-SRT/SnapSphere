import React, {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from '../ui/button'


const FileUploader = () => {

  const [ fileUrl, setFileUrl ] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='flex justify-center items-center w-full bg-neutral-800 text-white rounded-xl border-dashed border-2 border-gray-400 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ? (
          <div>
            <img src={fileUrl} alt="file" className='h-36 w-full object-cover rounded-xl' />
          </div>
        ) : (
          <div className='flex justify-center items-center flex-col p-7 h-80 lg:h-[612px]'>
            <img 
              src="/assets/icons/file-upload.svg" 
              alt="file-upload logo"
              width={96}
              height={77}
              />

              <h3 className='text-[16px] font-medium leading-[140%] text-zinc-100 mb-2 mt-6'>Drag photo here</h3>

              <p className='text-slate-600 text-[14px] font-normal leading-[140%] mb-6'>SVG, PNG, JPEG</p>

              <Button className='h-12 bg-zinc-900 px-5 text-white flex gap-2 !important'>
                Select a photo
              </Button>
          </div>
        )
      }
    </div>
  )
}

export default FileUploader