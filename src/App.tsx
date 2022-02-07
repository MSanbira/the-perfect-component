import { useState } from "react";
import "./App.css";
import { Suites} from "./constants";
import SetupDialog, { SelectTestInput, SetupOptions, UserNumberInput } from "./setup-dialog";

function App() {
  const runTest = (setupOptions: SetupOptions) => {
    setSelectedSuiteId(null);
    // doing stuff
    console.log('setupOptions: ', setupOptions);
  };
  
  const [selectedSuiteId, setSelectedSuiteId] = useState<number | null>(null);
  const selectedSuite = Suites.find((s) => s.id === selectedSuiteId);

  return (
    <div className="app-container">
      <SetupDialog
        entity={selectedSuite}
        onSetupSubmit={runTest}
        onClose={() => setSelectedSuiteId(null)}
        formFields={[
          {module: SelectTestInput, dataSet: selectedSuite?.tests},
          {module: UserNumberInput}
        ]}
        submitButtonText="Run test"
      />

      <div className="run-suites-btns">
        {Suites.map((suite) => (
          <button
            key={suite.id}
            className="primary-btn"
            onClick={() => setSelectedSuiteId(suite.id)}
          >
            open test setup for {suite.name}
          </button>
        ))}
      </div>

      {/* rest of app */}
    </div>
  );

}

export default App;

export interface Suite {
  id: number;
  name: string;
  tests: Test[];
}
export interface Test {
  id: number;
  name: string;
}
