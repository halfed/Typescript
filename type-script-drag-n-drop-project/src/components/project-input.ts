/// <reference path="base-component.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../decorators/autobind.ts" />

namespace App {
    // PROJECT INPUT CLASS
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
        // BEFORE WE HAD DUPLICATE KEY VALUES IN MULTIPLE CLASSES SO THIS WILL BE DELETED AND ALL PUT IN ONE "COMPONENTS" CLASS FOR REUSABLITY
        // templateElement: HTMLTemplateElement;
        // HOST ELEMENT IS GOING TO BE THE DIV WITH ID APP IN HTML
        // hostElement: HTMLDivElement;
        // element: HTMLFormElement;
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;
        jobDescriptionInputElement: HTMLInputElement;

        constructor() {
            super('project-input', 'app', true, 'user-input');
            // const importedNode = document.importNode(this.templateElement.content, true);
            // this.element = importedNode.firstElementChild as HTMLFormElement;
            // this.element.id = 'user-input';
            this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
            this.jobDescriptionInputElement = this.element.querySelector('#jobDescription') as HTMLInputElement;

            this.configure();
        }

        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }

        renderContent() {};

        private gatherUserInput(): [string, string, number, string] | void {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            const enteredJobDescription = this.jobDescriptionInputElement.value;

            const titleValidatable: Validatable = {
                value: enteredTitle,
                required: true
            };
            const descriptionValidatable: Validatable = {
                value: enteredDescription,
                required: true,
                minLength: 5
            };
            const peopleValidatable: Validatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5
            };
            const jobDescriptionValidatable: Validatable = {
                value: enteredJobDescription,
                required: true,
                minLength:5
            };

            //    if(
            //     validate({value: enteredTitle, required: true, minLength: 5}) &&
            //     validate({value: enteredDescription, required: true, minLength: 5}) &&
            //     validate({value: enteredPeople, required: true, minLength: 5})
                
            //    ) {
            if(
                !validate(titleValidatable) ||
                !validate(descriptionValidatable) ||
                !validate(peopleValidatable) || 
                !validate(jobDescriptionValidatable)
                
                ) {
            alert('Invalid input, please try again!');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople, enteredJobDescription];
        }
        }

        private clearInputs() {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
            this.jobDescriptionInputElement.value = '';
        }

        @autobind
        private submitHandler(event: Event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if(Array.isArray(userInput)) {
                const [title, desc, people, jobDescription] = userInput;
                projectState.addProject(title, desc, people, jobDescription)
                console.log(title, desc, people, jobDescription);
                this.clearInputs();
            }
        };
    }
}