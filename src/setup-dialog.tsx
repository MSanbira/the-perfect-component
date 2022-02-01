import React, { useState } from "react";
import { Test } from "./App";

export default function SetupDialog(props: {
  isOpen: boolean;
  tests: Test[];
  onSetupSubmit: (options: SetupOptions) => void;
  onClose: () => void;
  submitButtonText?: string;
}) {
  const {
    isOpen = false,
    tests = [],
    onSetupSubmit,
    onClose,
    submitButtonText = "Run test",
  } = props;

  const [testId, setTestId] = useState<number | undefined>(tests[0]?.id);
  const [userNumber, setUserNumber] = useState<number>(5);

  return (
    <div className="dialog" data-is-open={isOpen}>
      <div className="setup-dialog">
        <label htmlFor="testInput">Select test to run</label>
        <select
          id="testInput"
          className="select-input"
          onChange={(e) => setTestId(parseInt(e.target.value))}
        >
          {tests.map((test) => (
            <option key={test.id} value={test.id}>
              {test.name}
            </option>
          ))}
        </select>

        <label htmlFor="userNumber">Amount of simulated users</label>
        <input
          id="userNumber"
          className="num-input"
          type="number"
          value={userNumber}
          onChange={(e) => setUserNumber(parseInt(e.target.value))}
        />

        <div className="dialog-actions">
          <button className="secondary-btn" onClick={onClose}>
            cancel
          </button>
          <button className="primary-btn" onClick={() => onSetupSubmit({ testId, userNumber })}>
            {submitButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export interface SetupOptions {
  testId?: number;
  userNumber: number;
}
