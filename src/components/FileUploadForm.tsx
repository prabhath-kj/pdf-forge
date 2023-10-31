"use client"

import React, { useRef, useEffect, ChangeEvent } from 'react';
const FileUploadForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const controllerRef = useRef(new AbortController());

  useEffect(() => {
    return () => {
      // Cleanup: Abort the ongoing request if the component unmounts
      controllerRef.current.abort();
    };
  }, []);

  const handleFileChange = async (e:ChangeEvent<HTMLInputElement>) => {
    // Abort the previous request before starting a new one
    controllerRef.current.abort();

    const selectedFile = e.target.files && e.target.files[0];

    // Perform PDF validation
    if (selectedFile && selectedFile.type === 'application/pdf') {
      const formData = new FormData();
      formData.append('pdf', selectedFile);

      // Create a new AbortController for the current request
      controllerRef.current = new AbortController();

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
          signal: controllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`File upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('File uploaded successfully:', data);
        // Handle success (e.g., display a success message to the user)
      } catch (error:any) {
        if (error.name === 'AbortError') {
          console.log('Request aborted by user');
          // Handle abort (e.g., don't display an error message)
        } else {
            throw new Error(`File upload failed`);
            // Handle other errors (e.g., display an error message to the user)
        }
      }
    } else {
      // Handle invalid file type (not a PDF)
      alert('Please select a valid PDF file.');
    }
  };

  const handleButtonClick = () => {
    // Trigger file input click programmatically
   fileInputRef.current && fileInputRef.current.click();
  };

    return (
        <section className=" bg-gray-100 h-56 mt-20 ">
        <div className="text-center text-2xl sm:text-4xl px-2 py-5">
         <h1 className="font-extrabold text-black">Split PDF</h1>
        </div>
        <div className="flex items-center justify-center">
        <label htmlFor="dropzone-file" className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-gray-100 p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
  
          <p className="mt-2 text-gray-500 tracking-wide">Upload or drag PDF</p>
  
          <input  id="dropzone-file"
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf" />
        </label>
      </div>
        </section>
      
    );
  };
  
  export default FileUploadForm;
  
  
  
  
  
  