import { Injectable, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  constructor() {
    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(res => res.id == id);
  }

  addReservation(reservation: Reservation): void {
    if(!reservation.id){
      let id : string = Date.now().toString().slice(2);
      reservation.id = id;
    }
    this.reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(res => res.id == id);
    if (index > -1) {
      this.reservations.splice(index, 1);
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === id);
    if (index > -1) {
      this.reservations[index] = updatedReservation;
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
  }
}
