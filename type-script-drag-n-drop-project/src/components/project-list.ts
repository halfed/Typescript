/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />
//interesting we don't need to import project-item
// <reference path="project-item.ts" />

namespace App {
    // ProjecctList Class
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> 
    implements DragTarget {

        assignedProjects: Project[];

        constructor(private type: 'active' | 'finished') {
            super('project-list', 'app', false, `${type}-projects`);
            this.assignedProjects = []; 

            this.configure();
            this.renderContent();
        }

        @autobind
        dragOverHandler(event: DragEvent) {
            if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEl = this.element.querySelector('ul')!;
                listEl.classList.add('droppable');
            }
        };

        @autobind
        dropHandler(event: DragEvent) {
            console.log(event.dataTransfer!.getData('text/plain'));
            const prjId = event.dataTransfer!.getData('text/plain');
            projectState.moveProject(
                prjId,this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished 
            );
        }

        @autobind
        dragLeaveHandler(_: DragEvent) {
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.remove('droppable');
        }



        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);
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
    }
}