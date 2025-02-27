import {useState, useCallback} from 'react'
import { FileWithPath, useDropzone} from 'react-dropzone'
import { Button } from '../ui/button'

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;

}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {

  const [file, setFile] = useState<File[]>([])
  const [ fileUrl, setFileUrl ] = useState<string>(mediaUrl)

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
    fieldChange(acceptedFiles);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg']
    }
  })

  return (
    <div {...getRootProps()} className='flex justify-center items-center w-full bg-neutral-800 text-white rounded-xl border-dashed border-2 border-gray-400 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 cursor-pointer max-h-[400px] mt-4'>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ? (
          <div className='flex flex-col w-full'>
            <div className='flex justify-center items-center flex-1 w-full p-5 lg:p-8'>
              <img 
                src={fileUrl} 
                alt="fileImg" 
                className='h-80 w-full object-cover object-top lg:h-[300px] rounded-xl' 
              />
              
            </div>
            <p className='text-white text-center text-[14px] font-normal leading-[140%] w-full p-4 border-t border-t-zinc-900'>Click or drag photo to replace</p>
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