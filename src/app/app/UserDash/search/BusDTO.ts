export class BusDTO {
    busId: number;
    busName: string;
    busNumber: string;
    routeId: number;
    source: string;
    destination: string;
    boarding: string | null;
    departure: string | null;
    duration: string | null;
    arrival: string | null;
  
    constructor(
      busId: number,
      busName: string,
      busNumber: string,
      routeId: number,
      source: string,
      destination: string,
      boarding: string | null,
      departure: string | null,
      duration: string | null,
      arrival: string | null
    ) {
      this.busId = busId;
      this.busName = busName;
      this.busNumber = busNumber;
      this.routeId = routeId;
      this.source = source;
      this.destination = destination;
      this.boarding = boarding;
      this.departure = departure;
      this.duration = duration;
      this.arrival = arrival;
    }
  }