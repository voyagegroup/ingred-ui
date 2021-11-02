import * as React from "react";
import Modal from "../Modal";
import Fade from "../Fade";
import TextField from "../TextField";
import Tabs from "../Tabs";
import ScrollArea from "../ScrollArea";
import Pager from "../Pager";
import { useTheme } from "../../themes";
import * as Styled from "./styled";

export type SearchProps<T> = {
  tabData: {
    text: string;
    count?: number;
    value: T;
  }[];
  data: {
    text: string;
    category: string;
  }[];
  isOpen: boolean;
  onChange: (value: string) => void;
  handleToggleOpen?: () => void;
};

const Search = <T,>(
  props: SearchProps<T>,
  ref: React.Ref<HTMLDivElement>,
): React.ReactElement<SearchProps<T>> => {
  const { tabData, data, isOpen, onChange, handleToggleOpen } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const [tab, setTab] = React.useState<T>(tabData[0].value);
  const [page, setPage] = React.useState(1);

  const handleChangeTabs = (value: T) => {
    setTab(value);
  };

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Styled.Container ref={ref}>
      <Modal isOpen={isOpen} onClose={handleToggleOpen}>
        <Fade in={true}>
          <Styled.FadeContainer>
            <TextField
              inputRef={inputRef}
              icon="search"
              placeholder="検索ワードを入力してください"
            />
            <Tabs
              data={tabData}
              value={tab}
              withBadge={true}
              onChange={handleChangeTabs}
            />
            <Styled.ScrollContainer>
              <ScrollArea style={{ height: "100%", width: "100%" }}>
                <>
                  {data.map(({ text }) => (
                    <>
                      <Styled.TextContainer key={text}>
                        {text}
                      </Styled.TextContainer>
                      <Styled.UnderLineContainer />
                    </>
                  ))}
                </>
              </ScrollArea>
            </Styled.ScrollContainer>
            <Styled.PagerContainer>
              <Pager
                per={1}
                total={4}
                index={page}
                onClick={handleChangePage}
              />
            </Styled.PagerContainer>
          </Styled.FadeContainer>
        </Fade>
      </Modal>
    </Styled.Container>
  );
};

export default React.forwardRef(Search) as <T>(
  props: SearchProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => ReturnType<typeof Search>;
