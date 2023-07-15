export function formatDate(dateObject: Date): string {
    const date = new Date(dateObject);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export function getTimeSlots(availableSlots: any[]): string[] {
    const timeSlots: string[] = [];
  
    for (const slot of availableSlots) {
      const startDateTime = new Date(slot.startDateTime);
      const endDateTime = new Date(slot.endDateTime);
  
      const startTime = startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const endTime = endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
      const timeSlot = `${startTime} - ${endTime}`;
      timeSlots.push(timeSlot);
    }
  
    return timeSlots;
  }