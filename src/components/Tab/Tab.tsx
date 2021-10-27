import * as React from "react";
// import * as Styled from "./styled";

type TabProps = {
  data: {
    text: string;
    count?: number;
  }[];
  value: any;
  isBadge?: boolean;
  onChange: (event: any, value: any) => void;
};

const Tabs = React.forwardRef<HTMLDivElement, TabProps>(
  ({ data, value, isBadge = true, onChange }, ref) => {
    // return isBadge ? <div>badge</div> : <div>no badge</div>;
    return (
      <div>
        <div>
          {data.map((d) => (
            <button key={d.text} onClick={(event) => onChange(event, d.text)}>
              {d.text}
            </button>
          ))}
        </div>
        {value}
      </div>
    );
  },
);

export default Tabs;
