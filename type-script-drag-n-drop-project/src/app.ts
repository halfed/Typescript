// Project Type
enum ProjectStatus {Active, Finished};

class Project {
    constructor(
        public id: string, 
        public title: string,
        public description: string,
        public people: number, 
        public jobDescription: string,
        public status: ProjectStatus 
    ) {}
}

// Project State Management
// type Listener = (items: Project[]) => void; NEW BELOW NOW THAT WE HAVE A STATE CLASS
type Listener<T> = (items: T[]) => void;

// THOUGH WE ONLY HAVE ONE STATE CLASS, IN A BIGGER APPLICATION WE COULD HAVE MULTIPLE STATE CLASSES SO WE CAN CENTRALIZE LISTENERS AND ADDLISTENER()
class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project> {
    // REMOVING FOR REUSABILITY ABOVE IN STATE CLASS
    // private listeners: Listener[] = [];
    private projects: Project[] = [

    ];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if(this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    // REMOVING FOR REUSABILITY ABOVE IN STATE CLASS
    // addListener(listenerFn: Listener) {
    //     this.listeners.push(listenerFn);
    // }

    addProject (title: string, description: string, numOfPeople: number, jobDescription: string) {
        // WITH NEW PROJECT CLASS WE CAN DELETE BELOW AN INSTANTIATE PROJECT CLASS
        // const newProject = {
        //     id: Math.random().toString(),
        //     title: title,
        //     description: description,
        //     people: numOfPeople,
        //     jobDescription: jobDescription
        // };
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            jobDescription,
            ProjectStatus.Active
        )
        this.projects.push(newProject);
        for(const listenrFn of this.listeners) {
            listenrFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();

// Validation
interface Validatable {
    value: string | number;
    required?: Boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true;
    if(validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if(validatableInput.minLength != null && 
        typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length > validatableInput.minLength;
        console.log("what is min length" + validatableInput.minLength);
    }
    if(validatableInput.maxLength != null && 
        typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
    }
    if(validatableInput.min != null &&
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if(validatableInput.max != null &&
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}

// autobind decorator
function autobind(
    _: any, 
    _2: string, 
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

// COMPONENT BASE CLASS
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
        templateId: string, 
        hostElementId: string,
        insertAtStart: boolean,
        newElementId?: string        
    ) {
        this.templateElement = document.getElementById(
            templateId
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        const importedNode = document.importNode(
            this.templateElement.content, 
            true
        );
        this.element = importedNode.firstElementChild as U;
        if(newElementId) {
            this.element.id = newElementId;
        }

        this.attach(insertAtStart);
    }

    private attach(insertAtBegenning: boolean) {
        this.hostElement.insertAdjacentElement(insertAtBegenning ? 'afterbegin' : 'beforeend', this.element);
    }

    abstract configure(): void;
    abstract renderContent():void;
}

// PROJECTITEM CLASS
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
    private project: Project;

    get persons() {
        if(this.project.people === 1) {
            return '1 person';
        } else {
            return `${this.project.people} persons`;
        } 
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    configure() {
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
        this.element.querySelector('p')!.textContent = this.project.jobDescription;
    }
}


// ProjecctList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement> {

    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = []; 

        this.configure();
        this.renderContent();
    }

    renderContent() {
        const listId =  `${this.type}=project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = 
            this.type.toUpperCase() + ' PROJECTS';
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}=project-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for(const prjItem of this.assignedProjects) {
            // NOW THAT WE HAVE A PROJECTITEM CLASS WE DON'T NEED THIS WE CAN CALL PROJECTITEM HERE
            // const listItem = document.createElement('li');
            // listItem.textContent = prjItem.title;
            // listEl?.appendChild(listItem);
            new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
        }
    }

    configure() {
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
}

// PROJECT INPUT CLASS
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');