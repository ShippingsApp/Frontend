export default class Route {
  constructor(id, dateStart, dateFinish,start,finish,weight,height,length,width,plusTime,comment,status,requests) {
    this.id = id;
    this.dateStart = dateStart;
    this.dateFinish = dateFinish;
    this.start = start;
    this.finish = finish;
    this.weight = weight;
    this.height = height;
    this.length = length;
    this.width = width;
    this.plusTime = plusTime;
    this.comment = comment;
    this.status = status;
    this.requests=requests;
  }
}
