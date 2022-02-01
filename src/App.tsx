import { useState } from "react";
import "./App.css";
import SetupDialog, { SetupOptions } from "./setup-dialog";

const tests = [
  { id: 1, name: "first test" },
  { id: 2, name: "second test" },
  { id: 3, name: "third test" },
];

function App() {
  const [isSetupDialogOpen, setIsSetupDialogOpen] = useState<boolean>(false);

  const runTest = (setupOptions: SetupOptions) => {
    // doing stuff
  };

  return (
    <div>
      <SetupDialog
        isOpen={isSetupDialogOpen}
        tests={tests}
        onSetupSubmit={runTest}
        onClose={() => setIsSetupDialogOpen(false)}
        submitButtonText="Run test"
      />

      {/* rest of app */}
    </div>
  );
}

export default App;

export interface Test {
  id: number;
  name: string;
}
