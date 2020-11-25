import * as React from "react";
import * as Styled from "./styled";
import { useDropzone } from "react-dropzone";
import Typography from "../Typography";
import Flex from "../Flex";
import Icon from "../Icon";
import Spacer from "../Spacer";

export type FileUploaderProps = {
  width?: string;
  height?: string;
  description?: string;
  accept?: string[];
  onSelectFile: (files: File) => void;
};

const FileUploader: React.FunctionComponent<FileUploaderProps> = ({
  width,
  height,
  description,
  accept = [],
  onSelectFile,
}) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: accept.join(),
  });

  React.useEffect(() => {
    if (acceptedFiles.length) {
      onSelectFile(acceptedFiles[0]);
    }
  }, [acceptedFiles, onSelectFile]);

  return (
    <Styled.Container
      width={width}
      height={height}
      active={isDragActive}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Styled.TextContainer>
        <Flex display="flex">
          <Icon name="folder_open" size="md" color="active" />
          <Typography weight="bold" color="primary">
            ドラッグ&ドロップするか、クリックしてアップロード
          </Typography>
        </Flex>
        {description && (
          <>
            <Spacer pt={2.5} />
            <Typography
              weight="bold"
              align="center"
              size="sm"
              color="secondary"
            >
              {description}
            </Typography>
          </>
        )}
      </Styled.TextContainer>
    </Styled.Container>
  );
};

export default FileUploader;
