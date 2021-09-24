import * as React from "react";
import * as Styled from "./styled";
import { Property } from "csstype";
import Typography from "../Typography";
import Flex from "../Flex";
import Icon from "../Icon";
import Spacer from "../Spacer";
import { useLocaleProps } from "../../hooks/useLocaleProps";

export type FileUploaderProps = {
  description?: string;
  title?: string;
  /**
   * Define the type of file the server accepts. (e.g. `image/*`)
   */
  accept?: string;
  width?: Property.Width;
  onSelectFiles: (
    event: React.DragEvent<HTMLElement> | React.ChangeEvent<HTMLElement>,
    files: FileList | null,
  ) => void;
};

const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(
  (inProps, ref) => {
    const props = useLocaleProps({ props: inProps, name: "FileUploader" });
    const {
      accept,
      title = "Click or Drag & Drop file.",
      width,
      description,
      onSelectFiles,
    } = props;
    const fileRef = React.useRef<HTMLInputElement>(null);
    const [filesDraggedOver, setFilesDraggedOver] = React.useState(false);

    const handleDrop = React.useCallback(
      (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setFilesDraggedOver(false);
        onSelectFiles(e, e.dataTransfer.files);
      },
      [setFilesDraggedOver, onSelectFiles],
    );

    const handleDragOver = React.useCallback(
      (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setFilesDraggedOver(true);
      },
      [setFilesDraggedOver],
    );

    const handleDragLeave = React.useCallback(() => {
      setFilesDraggedOver(false);
    }, [setFilesDraggedOver]);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onSelectFiles(e, e.target.files);
      },
      [onSelectFiles],
    );

    const handleClickZone = () => {
      fileRef.current?.click();
    };

    return (
      <Styled.Container
        ref={ref}
        width={width}
        filesDraggedOver={filesDraggedOver}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClickZone}
      >
        <input
          ref={fileRef}
          multiple
          type="file"
          accept={accept}
          onChange={handleChange}
        />
        <Styled.TextContainer>
          <Flex display="flex">
            <Icon name="folder_open" size="md" color="active" />
            <Typography weight="bold" color="primary">
              {title}
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
  },
);

export default FileUploader;
