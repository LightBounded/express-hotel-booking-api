export default interface Reservation {
  id: number
  firstName: string
  lastName: string
  address: string
  emailAddress: string
  phoneNumber: string
  roomNumber: string
  roomPhoto: Buffer | string
  numberOfBeds: number
  checkInDate: Date | string
  checkOutDate: Date | string
  cost: number
  bookingDate: Date | string
}
