/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

type SvgrComponent = {} & React.FC<React.SVGAttributes<SVGElement>>;

declare module "*.png" {
  const value: any;
  export default value;
}
