declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.svg' {
  import {FC} from 'react';

  const SVG: FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
