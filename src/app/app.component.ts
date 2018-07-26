import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseReference, DatabaseSnapshot } from '../../node_modules/angularfire2/database/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses$: Observable<{}[]>;
  courseswithKeys$: Observable<any[]>;
  courseList: AngularFireList<any>;
  course$;
  author$;
  coursesSnapshot: Observable<AngularFireAction<DatabaseSnapshot<any>>[]>;
  title = 'Firebase demo';

  constructor(private db: AngularFireDatabase) {
    this.courseList = this.db.list('/courses');
    this.courses$ = db.list('/courses').valueChanges();
    this.coursesSnapshot = this.courseList.snapshotChanges();
    this.course$ = db.object('/courses/1').valueChanges();
    this.author$ = db.object('/authors/1').valueChanges();
    this.courseswithKeys$ =  this.coursesSnapshot.pipe(
      map(courses =>
        courses.map(course => ({key: course.payload.key, value: course.payload.val()}))
    ));
    this.courseswithKeys$.subscribe( courses => {
      console.log('courses:');
      console.log(courses);
    });
  }

  add( course: HTMLInputElement) {
    this.courseList.push(course.value);
    console.log('adding course ...', course.value);
  }

  delete(key: string) {
    console.log('deleting ...', key);
    this.courseList.remove(key);
  }
}
