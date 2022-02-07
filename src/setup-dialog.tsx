import React, { useEffect, useState } from "react";
import { Test } from "./App";

export default function SetupDialog(props: {
  entity?: any;
  onSetupSubmit: (options: SetupOptions) => void;
  onClose: () => void;
  formFields: FormField[];
  submitButtonText?: string;
}) {
  const { entity, onSetupSubmit, onClose, formFields, submitButtonText = "Submit" } = props;
  const [setupOptions, setsSetupOptions] = useState<SetupOptions>({});

  useEffect(() => {
    if (!entity) {
      setsSetupOptions({});
    }
  }, [entity]);

  const updateSetupOptions = (options: SetupOptions) => {
    setsSetupOptions({ ...setupOptions, ...options });
  };

  const formFieldsElement = [] as JSX.Element[];
  formFields.forEach((field, i) => {
    formFieldsElement.push(
      <field.module
        key={i}
        dataSet={field.dataSet}
        defaultValue={field.defaultValue}
        setupOptions={setupOptions}
        updateSetupOptions={updateSetupOptions}
      />
    );
  });

  return (
    <div className="dialog" data-is-open={!!entity}>
      <div className="setup-dialog">
        <h2>Config {entity?.name && `for ${entity.name}`}</h2>

        {formFieldsElement}

        <div className="dialog-actions">
          <button className="secondary-btn" onClick={onClose}>
            cancel
          </button>
          <button className="primary-btn" onClick={() => onSetupSubmit(setupOptions)}>
            {submitButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export const UserNumberInput = (props: {
  setupOptions: SetupOptions;
  defaultValue?: number;
  updateSetupOptions: (options: SetupOptions) => void;
}) => {
  const { defaultValue = 5, setupOptions, updateSetupOptions } = props;
  const userNumber = setupOptions.userNumber || defaultValue;
  const setUserNumber = (num: number) => updateSetupOptions({ userNumber: num });
  useEffect(() => {
    if (!setupOptions.userNumber) {
      setUserNumber(userNumber);
    }
  });

  return (
    <>
      <label htmlFor="userNumber">Amount of simulated users</label>
      <input
        id="userNumber"
        className="num-input"
        type="number"
        value={userNumber}
        onChange={(e) => setUserNumber(parseInt(e.target.value))}
      />
    </>
  );
};

export const SelectTestInput = (props: {
  setupOptions: SetupOptions;
  defaultValue?: number;
  dataSet?: Test[];
  updateSetupOptions: (options: SetupOptions) => void;
}) => {
  const { setupOptions, dataSet: tests = [], defaultValue, updateSetupOptions } = props;
  const testId = setupOptions.testId || defaultValue || tests[0]?.id;
  const setTestId = (id: number) => updateSetupOptions({ testId: id });
  useEffect(() => {
    if (!setupOptions.testId && testId) {
      setTestId(testId);
    }
  });

  return (
    <>
      <label htmlFor="testInput">Select test to run</label>
      <select
        id="testInput"
        className="select-input"
        value={testId}
        onChange={(e) => setTestId(parseInt(e.target.value))}
      >
        {tests.map((test) => (
          <option key={test.id} value={test.id}>
            {test.name}
          </option>
        ))}
      </select>
    </>
  );
};

export interface FormField {
  module: (props: FieldModuleProps) => JSX.Element;
  dataSet?: any[];
  defaultValue?: any;
}

interface FieldModuleProps {
  dataSet?: any;
  defaultValue?: any;
  setupOptions: SetupOptions;
  updateSetupOptions: (options: SetupOptions) => void;
}

export interface SetupOptions {
  testId?: number;
  userNumber?: number;
}
