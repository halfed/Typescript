import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";

// namespaces can cause issues where if we miss an import we could get a successful
// compilation in ts but a run time error in browser.
// next lecture will be to remove namespaces and use ES6 Modules
// Just commenting out namespaces so I can have a reference for later

// namespace App {
// Project Type
new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
