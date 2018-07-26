import {Component, OnInit} from '@angular/core';
import {TasksService} from '../../tasks.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Task} from '../../models/task';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  task: Task;

  constructor(private taskService: TasksService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.task = this.taskService.getTask(params.id);
    });
  }

  finishTask() {
    this.taskService.finishTask(this.task.id);
  }

  removeTask() {
    this.taskService.removeTask(this.task.id);
    this.router.navigateByUrl('todo');
  }

}
