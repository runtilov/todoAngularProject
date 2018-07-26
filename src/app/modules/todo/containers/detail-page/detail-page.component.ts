import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Task} from '../../models/task';
import {ApiTasksService} from '../../services/api-storage/api-tasks.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  task: Task;

  constructor(private taskService: ApiTasksService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.taskService.getTask(params.id).subscribe( task => {
        this.task = task;
      });
    });
  }

  finishTask() {
    this.taskService.finishTask(this.task.id).subscribe(task => { this.task = task; });
  }

  removeTask() {
    this.taskService.removeTask(this.task.id).subscribe(() => { this.router.navigateByUrl('todo'); });
  }

}
