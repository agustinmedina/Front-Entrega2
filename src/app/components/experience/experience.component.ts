import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  public experiences: Experience[] = [];
  public editExperience: Experience | undefined;
  public deleteExperience: Experience | undefined;

  constructor(
    private experienceService: ExperienceService,
    public autenticacionService: AuthenticationService
  ) {}

  isloged = () => this.autenticacionService.loggedIn();
  ngOnInit(): void {
    this.getExperience();
  }

  public getExperience(): void {
    this.experienceService.getExperience().subscribe({
      next: (response: Experience[]) => {
        this.experiences = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }
  public onOpenModal(mode: string, experience?: Experience): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addExperienceModal');
    } else if (mode === 'delete') {
      this.deleteExperience = experience;
      button.setAttribute('data-target', '#deleteExperienceModal');
    } else if (mode === 'edit') {
      this.editExperience = experience;
      button.setAttribute('data-target', '#editExperienceModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddExperience(addForm: NgForm): void {
    document.getElementById('add-experience-form')?.click();
    this.experienceService.addExperience(addForm.value).subscribe({
      next: (response: Experience) => {
        console.log(response);
        this.getExperience();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

  public onUpdateExperience(experience: Experience): void {
    this.editExperience = experience;
    this.experienceService.updateExperience(experience).subscribe({
      next: (response: Experience) => {
        console.log(response);
        this.getExperience();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onDeleteExperience(idEdu: number): void {
    this.experienceService.deleteExperience(idEdu).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getExperience();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  onDrop(event: CdkDragDrop<Experience[]>) {
    if (this.autenticacionService.loggedIn()) {
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }
}
