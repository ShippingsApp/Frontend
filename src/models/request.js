export default class Request {
  constructor(id, shipId, driverName,driverPhone, start,finish,weight,height,length,width,price,comment) {
    this.id = id;
    this.shipId=shipId;
    this.userFromName = driverName;
    this.userFromPhone = driverPhone;

    this.driverName = driverName;
    this.driverPhone = driverPhone;
    this.start = start;
    this.finish = finish;
    this.weight = weight;
    this.height = height;
    this.length = length;
    this.width = width;
    this.comment = comment;
    this.price = price;
  }
}
