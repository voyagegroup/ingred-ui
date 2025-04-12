import * as React from "react";
import { IconProps } from "../../Icon";

const OperatorDoesNotMatchIcon: React.FunctionComponent<IconProps> = ({
  fill,
  type,
}) => {
  switch (type) {
    case "line":
      return (
        <svg viewBox="0 0 24 24">
          <path
            fill={fill}
            fillRule="evenodd"
            d="M3.9 19.1V4.9H20.1V19.1H3.9ZM2 4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4ZM18.6376 7.6655C18.9786 7.3845 19.0272 6.8803 18.7462 6.53935C18.4652 6.1984 17.961 6.1498 17.62 6.43081L13.8077 9.57285L13.0332 7.50174H11.0046L8.59756 13.8669L5.1805 16.6832C4.83955 16.9642 4.79095 17.4684 5.07196 17.8093C5.35296 18.1503 5.85716 18.1989 6.19811 17.9179L7.92059 16.4983H9.59335L10.2775 14.5557L10.3514 14.4948H13.6632L14.3436 16.4983H16.3974L14.4004 11.1578L18.6376 7.6655ZM12.3694 10.7582L12.0126 9.71937H11.9874L11.3081 11.6329L12.3694 10.7582ZM12.1401 13.0206L12.9245 12.3741L13.1466 13.0206H12.1401Z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export { OperatorDoesNotMatchIcon };
