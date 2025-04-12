import React from "react";
import Icon from "../Icon";
import * as styled from "./styled";
import { TagProps } from "./types";

export const Tag = ({
    label,
    size = "medium",
    variant = "light",
    onRemove,
    className,
}: TagProps) => {
    return (
        <styled.Tag $size={size} $variant={variant} className={className}>
            {label}
            {onRemove && (
                <styled.RemoveButton
                    type="button"
                    aria-label="削除"
                    $size={size}
                    $variant={variant}
                    onClick={onRemove}
                >
                    <Icon name="close_circle" type="fill" color="currentColor" />
                </styled.RemoveButton>
            )}
        </styled.Tag>
    );
}; 