import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestDataServiceService {
  constructor()
  {

  }

  private currentID = 8;
  private baseTaskID = 0;

  private testTasks = [
    {
      id: 0,
      name: "Build guitar",
      description: "I really want to build a guitar",
      subTasks: [1, 2, 3],
      parentTask: undefined,
      expanded: true,
      complete: false
    },
    {
      id: 1,
      name: "make neck",
      description: "need to make a neck for the guitar",
      subTasks: [],
      parentTask: 0,
      expanded: true,
      complete: false
    },
    {
      id: 2,
      name: "make body",
      description: "need to build the body of the guitar",
      subTasks: [7],
      parentTask: 0,
      expanded: true,
      complete: false
    },
    {
      id: 3,
      name: "get misc parts",
      description: "bunch of misc parts I gotta get",
      subTasks: [4, 5, 6],
      parentTask: 0,
      expanded: true,
      complete: false
    },
    {
      id: 4,
      name: "get pickups",
      description: "dual coils baby",
      subTasks: [],
      parentTask: 3,
      expanded: true,
      complete: false
    },
    {
      id: 5,
      name: "get string",
      description: "lowest guage possible, max bend",
      subTasks: [],
      parentTask: 3,
      expanded: true,
      complete: false
    },
    {
      id: 6,
      name: "get bridge",
      description: "I dunno man just grab one",
      subTasks: [],
      parentTask: 3,
      expanded: true,
      complete: false
    },
    {
      id: 7,
      name: "learn carpentry",
      description: "man i gotta learn carpentry to do this shit",
      subTasks: [],
      parentTask: 2,
      expanded: true,
      complete: false
    }
  ];

  GetCurrentID()
  {
    return this.currentID;
  }

  getTasks() {
    return this.testTasks;
  }

  GetBaseTask()
  {
    return this.baseTaskID;
  }
}
