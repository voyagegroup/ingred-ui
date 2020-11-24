import * as React from "react";
import * as Styled from "./styled";
import { useDropzone } from "react-dropzone";
import Typography from "../Typography";

export type FileUploaderProps = {
  width?: string;
  height?: string;
};

const FileUploader: React.FunctionComponent<FileUploaderProps> = ({
  width,
  height,
}) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  return (
    <Styled.Container width={width} height={height} {...getRootProps()}>
      <input {...getInputProps()} />
      <Typography weight="bold" color="primary">
        ドラッグ&ドロップするか、クリックしてアップロード
      </Typography>
    </Styled.Container>
  );
};

export default FileUploader;
