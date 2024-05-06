import { FormEvent, useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';

const FileUploader = ({
  control,
  submit,
}: {
  control: Control;
  submit: () => void;
}) => {
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    },
    [submit]
  );

  return (
    <div className="row">
      <form onSubmit={handleSubmit}>
        <Controller
          name="file"
          control={control}
          defaultValue=""
          render={({ field: { onChange, onBlur, ref } }) => (
            <input
              onChange={(e) => {
                if (e.target.files) {
                  onChange(e.target.files[0]); //
                }
              }}
              onBlur={onBlur}
              type="file"
              accept="image/*"
              ref={ref}
            />
          )}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUploader;
