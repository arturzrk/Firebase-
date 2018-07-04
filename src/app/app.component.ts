import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: any[];
  constructor(db: AngularFireDatabase) {
    db.list('/courses').valueChanges()
      .subscribe(items => {
        this.items = items;
        console.log(this.items);
    });
  }
}
