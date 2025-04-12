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
    disabled = false,
}: TagProps) => {
    const handleRemove = disabled ? undefined : onRemove;

    return (
        <styled.Tag
            $size={size}
            $variant={variant}
            $disabled={disabled}
            className={className}
        >
            <styled.Text
                $size={size}
                $variant={variant}
                $disabled={disabled}
            >
                {label}
            </styled.Text>
            {onRemove && (
                <styled.RemoveButton
                    type="button"
                    aria-label="削除"
                    $size={size}
                    $variant={variant}
                    $disabled={disabled}
                    onClick={handleRemove}
                >
                    <Icon name="close_circle" type="fill" color="currentColor" />
                </styled.RemoveButton>
            )}
        </styled.Tag>
    );
}; 