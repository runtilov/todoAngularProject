import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Task} from '../../models/task';
import {ApiTasksService} from '../../services/api-storage/api-tasks.service';
import {Subscription} from 'rxjs';
import {LocalStorageTasksService} from '../../services/local-storage/local-storage-tasks.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit, OnDestroy {

  task: Task;
  subscriptions: Array<Subscription> = [];

  constructor(private taskService: LocalStorageTasksService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe((params) => {
      this.subscriptions.push(this.taskService.getTask(params.id).subscribe(task => {
        this.task = task;
      }));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  finishTask() {
    this.subscriptions.push(this.taskService.finishTask(this.task.id).subscribe(task => {
      this.task = task;
    }));
  }

  removeTask() {
    this.subscriptions.push(this.taskService.removeTask(this.task.id).subscribe(() => {
      this.router.navigateByUrl('todo');
    }));
  }

}
