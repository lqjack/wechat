import { PeoplePage } from './../people/people';
import { FindPage } from './../find/find';
import { PersonPage } from './../person/person';
import { ChatPage } from './../chat/chat';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  chatTab = ChatPage;
  personTab = PersonPage;
  findTab = FindPage;
  peopleTab = PeoplePage;

  constructor() {

  }
}
