import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import SpeechBubble from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");
  return {
    ...original,
    createPortal: (node: any) => node,
  };
});

describe("SpeechBubble component testing", () => {
  afterEach(cleanup);

  test("SpeechBubble", () => {
    const { asFragment } = renderWithThemeProvider(
      <SpeechBubble baseElement={null} open={true} onClose={() => {}}>
        <div>hoge</div>
      </SpeechBubble>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
