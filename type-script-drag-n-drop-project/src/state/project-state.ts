// Project State Management
namespace App {
// type Listener = (items: Project[]) => void; NEW BELOW NOW THAT WE HAVE A STATE CLASS
type Listener<T> = (items: T[]) => void;

// THOUGH WE ONLY HAVE ONE STATE CLASS, IN A BIGGER APPLICATION WE COULD HAVE MULTIPLE STATE CLASSES SO WE CAN CENTRALIZE LISTENERS AND ADDLISTENER()
class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

export class ProjectState extends State<Project> {
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
        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if(project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for(const listenrFn of this.listeners) {
            listenrFn(this.projects.slice());
        }
    }
}

export const projectState = ProjectState.getInstance();
}
