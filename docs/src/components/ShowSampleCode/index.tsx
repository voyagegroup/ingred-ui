import React, { FC } from 'react'
import styles from './ShowSampleCode.module.css'
import JsxParser from 'react-jsx-parser'
import {
  ActionButton,
  Badge,
  Backdrop,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  ClickAwayListener,
  ConfirmModal,
  ContextMenu,
  CreatableSelect,
  DataTable,
  DatePicker,
  DateRangePicker,
  Divider,
  DropdownButton,
  ErrorText,
  Fade,
  FileUploader,
  FixedPanel,
  Flex,
  FloatingTip,
  Grow,
  Icon,
  Input,
  ItemEmpty,
  LoadingBar,
  LocaleProvider,
  Menu,
  MenuList,
  Modal,
  MultipleFilter,
  NavigationRail,
  NotificationBadge,
  Pager,
  Popover,
  Portal,
  RadioButton,
  ScrollArea,
  Select,
  Slide,
  Snackbar,
  Spacer,
  Spinner,
  SplitAnnotation,
  Switch,
  Table,
  TextField,
  Toast,
  ToggleButton,
  Tooltip,
  Typography,
} from 'ingred-ui'
import { ThemeProvider } from '../ThemeProvider'
import { useFetchSampleCode } from '../../hooks'

type Props = {
  path: string
}

const ShowSampleCode: FC<Props> = (props) => {
  const { path } = props
  const sampleCode = useFetchSampleCode(path)
  if (sampleCode === '') return <></>
  return (
    <ThemeProvider>
      <JsxParser
        className={styles.wrapper}
        components={{
          ActionButton,
          Badge,
          Backdrop,
          Button,
          ButtonGroup,
          Card,
          Checkbox,
          ClickAwayListener,
          ConfirmModal,
          ContextMenu,
          // CreatableSelect,
          // DataTable,
          DatePicker,
          DateRangePicker,
          Divider,
          DropdownButton,
          ErrorText,
          Fade,
          FileUploader,
          FixedPanel,
          Flex,
          FloatingTip,
          Grow,
          Icon,
          Input,
          ItemEmpty,
          LoadingBar,
          LocaleProvider,
          Menu,
          MenuList,
          Modal,
          MultipleFilter,
          NavigationRail,
          NotificationBadge,
          Pager,
          Popover,
          Portal,
          RadioButton,
          ScrollArea,
          // Select,
          Slide,
          Snackbar,
          Spacer,
          Spinner,
          SplitAnnotation,
          Switch,
          Table,
          TextField,
          Toast,
          ToggleButton,
          Tooltip,
          Typography,
        }}
        jsx={sampleCode}
      />
    </ThemeProvider>
  )
}

export default ShowSampleCode
