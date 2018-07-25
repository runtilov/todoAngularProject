import {Component, OnInit} from '@angular/core';
import {TasksService} from '../../tasks.service';
import {ActivatedRoute} from '@angular/router';
import {Task} from '../../models/task';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  task: Task;

  constructor(private taskService: TasksService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.task = this.taskService.getTask(params.id);
    });
  }

  finishTask() {
    this.taskService.finishTask(this.task.id);
  }

}
