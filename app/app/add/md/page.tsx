
"use client"
import React from 'react'
import Dropzone from 'react-dropzone'
import { FileUploadForm } from '@/components/file-upload-form'


export default function AddMd() {
    return (
        <div className=' flex w-full mt-[15vw]  justify-center items-center'>
            <FileUploadForm fileType='.md'/>
        </div>

    )
}