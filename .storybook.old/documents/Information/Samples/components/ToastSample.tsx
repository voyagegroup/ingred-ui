import * as React from "react";
import { Button, Toast } from "../../../../../src/components";

const ToastSample: React.FC = () => {
  const { addToast } = Toast.useToasts();
  const handleClick = () => {
    addToast("The payment is now completed!!", {
      appearance: "success",
      autoDismiss: true,
    });
  };
  return (
    <div>
      <Button inline onClick={handleClick}>
        Show the Toast
      </Button>
    </div>
  );
};

export default ToastSample;
