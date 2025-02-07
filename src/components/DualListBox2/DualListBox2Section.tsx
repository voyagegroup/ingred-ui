import React, { useMemo, useCallback, useContext, type ReactNode } from "react";
import Icon from "../Icon";
import * as styled from "./styled";
import { colors } from "../../styles";
import { DualListBox2Context, DualListBox2GroupContext } from "./lib";

type DualListBox2SectionProps = {
  label: string;
  children: ReactNode;
};

export const DualListBox2Section = ({
  label,
  children,
}: DualListBox2SectionProps) => {
  // 開閉機能
  const { activeSection, setActiveSection } = useContext(DualListBox2Context);
  const isOpen = useMemo(() => activeSection === label, [label, activeSection]);
  const isHidden = useMemo(
    () => activeSection !== null && activeSection !== label,
    [label, activeSection],
  );
  const handleButtonClick = useCallback(() => {
    setActiveSection(isOpen ? null : label);
  }, [label, isOpen, setActiveSection]);

  if (isHidden) return null;

  return (
    <DualListBox2GroupContext.Provider value={{ groupName: label }}>
      <styled.SectionButton
        type="button"
        aria-label={`${label}を開く`}
        aria-expanded={isOpen}
        onClick={handleButtonClick}
      >
        <styled.SectionButtonBefore>
          <Icon name="arrow_left" color={colors.basic[900]} />
        </styled.SectionButtonBefore>
        <div>{label}</div>
        <styled.SectionButtonAfter>
          <Icon name="arrow_right" color={colors.basic[900]} />
        </styled.SectionButtonAfter>
      </styled.SectionButton>
      {isOpen && children}
    </DualListBox2GroupContext.Provider>
  );
};
DualListBox2Section.displayName = "DualListBox2Section";
