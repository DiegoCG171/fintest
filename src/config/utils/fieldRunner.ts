import { ReactNode } from "react";
import { TestCaseDetails } from "../interfaces";

export function getFieldValue(
  message: TestCaseDetails["message"],
  key: string
): ReactNode | undefined {
  if (typeof message === "object" && message !== null && key in message) {
    return message[key as keyof typeof message];
  }
  return undefined;
}
