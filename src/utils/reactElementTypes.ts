import React from "react";
import { StyledComponentProps } from "./styledTypes";

/**
 * Utility type for creating more specific element props types
 * This helps with React 19 compatibility by providing proper typing for props spreading
 */

export type DivElementProps = React.ComponentPropsWithoutRef<"div"> &
  StyledComponentProps;

export type ButtonElementProps = React.ComponentPropsWithoutRef<"button"> &
  StyledComponentProps;

export type SpanElementProps = React.ComponentPropsWithoutRef<"span"> &
  StyledComponentProps;

export type HRElementProps = React.ComponentPropsWithoutRef<"hr"> &
  StyledComponentProps;

export type InputElementProps = React.ComponentPropsWithoutRef<"input"> &
  StyledComponentProps;

export type LabelElementProps = React.ComponentPropsWithoutRef<"label"> &
  StyledComponentProps;

export type FormElementProps = React.ComponentPropsWithoutRef<"form"> &
  StyledComponentProps;

export type ULElementProps = React.ComponentPropsWithoutRef<"ul"> &
  StyledComponentProps;

export type LIElementProps = React.ComponentPropsWithoutRef<"li"> &
  StyledComponentProps;

export type TableElementProps = React.ComponentPropsWithoutRef<"table"> &
  StyledComponentProps;

export type TRElementProps = React.ComponentPropsWithoutRef<"tr"> &
  StyledComponentProps;

export type TDElementProps = React.ComponentPropsWithoutRef<"td"> &
  StyledComponentProps;

export type THElementProps = React.ComponentPropsWithoutRef<"th"> &
  StyledComponentProps;

export type THeadElementProps = React.ComponentPropsWithoutRef<"thead"> &
  StyledComponentProps;

export type TBodyElementProps = React.ComponentPropsWithoutRef<"tbody"> &
  StyledComponentProps;

export type TFootElementProps = React.ComponentPropsWithoutRef<"tfoot"> &
  StyledComponentProps;
