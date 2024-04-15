import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Control, Controller } from 'react-hook-form';
export type TFileUploaderProps = {
  control: Control<any>;
  submit: (event: FormEvent<HTMLFormElement>, file: File | undefined) => void;
};

const FileUploader = ({ control, submit }: TFileUploaderProps) => {
  const [file, setFile] = useState<File>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(event, file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setFile(fileList[0]);
    }
  };

  return (
    <div className="row">
      <form onSubmit={handleSubmit}>
        <Controller
          name="file"
          control={control}
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <input
              onChange={(e) => {
                onChange(e);
                handleFileChange(e);
              }}
              onBlur={onBlur}
              type="file"
              accept="image/*"
              ref={ref}
            />
          )}
        />
      </form>
    </div>
  );
};

export default FileUploader;
