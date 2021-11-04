import * as React from "react";
import Modal from "../Modal";
import Fade from "../Fade";
import TextField from "../TextField";
import Tabs from "../Tabs";
import ScrollArea from "../ScrollArea";
import Pager from "../Pager";
import Spinner from "../Spinner";
import { useTheme } from "../../themes";
import * as Styled from "./styled";
import { NotResult } from "./internal/NoResult";
import { Empty } from "./internal/Empty";
import { Results } from "./internal/Results";

// TODO: option を増やす
export type SearchProps<T> = {
  inputValue: string;
  isLoading: boolean;
  perPage: number;
  total: number;
  tabData: {
    text: string;
    count?: number;
    value: T;
  }[];
  data: {
    text: string;
    category: T;
  }[];
  isOpen: boolean;
  onChange: (value: string) => void;
  handleToggleOpen?: () => void;
};

const Search = <T,>(
  props: SearchProps<T>,
  ref: React.Ref<HTMLDivElement>,
): React.ReactElement<SearchProps<T>> => {
  const {
    inputValue,
    isLoading,
    perPage,
    total,
    tabData,
    data,
    isOpen,
    onChange,
    handleToggleOpen,
  } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const [tab, setTab] = React.useState<T>(tabData[0].value);
  const [page, setPage] = React.useState(1);
  const [filterdData, setFilterdData] = React.useState(data);
  const [componentState, setComponentState] = React.useState<
    JSX.Element | JSX.Element[]
  >(<Empty />);

  const handleChangeTabs = (value: T) => {
    setTab(value);
  };

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChange(event.target.value);
  };

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  React.useEffect(() => {
    if (typeof tab === "string" && tab === "all") {
      setFilterdData(data);
    } else {
      setFilterdData(data.filter((d) => d.category === tab));
    }
  }, [data, tab]);

  React.useEffect(() => {
    if (inputValue === "") {
      setComponentState(<Empty />);
    } else if (filterdData.length === 0) {
      setComponentState(<NotResult />);
    } else {
      setComponentState(<Results filterdData={filterdData} />);
    }
  }, [filterdData, inputValue]);

  return (
    <Styled.Container ref={ref}>
      <Modal isOpen={isOpen} onClose={handleToggleOpen}>
        <Fade in={true}>
          <Styled.FadeContainer>
            <Styled.FieldContainer>
              <TextField
                inputRef={inputRef}
                icon="search"
                value={inputValue}
                placeholder="検索ワードを入力してください"
                onChange={handleChangeInputValue}
              />
              <Tabs
                data={tabData}
                value={tab}
                withBadge={true}
                onChange={handleChangeTabs}
              />
              <Styled.ScrollContainer>
                <ScrollArea style={{ height: "100%", width: "100%" }}>
                  <div>{isLoading ? <Spinner /> : componentState}</div>
                </ScrollArea>
              </Styled.ScrollContainer>
              <Styled.PagerContainer>
                <Pager
                  per={perPage}
                  total={total}
                  index={page}
                  onClick={handleChangePage}
                />
              </Styled.PagerContainer>
            </Styled.FieldContainer>
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
