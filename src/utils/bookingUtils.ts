import { Booking } from "src/types";



export const getMostAskedTimes = (
  bookingsData
): { datetime: string; count: number }[] => {
  const timeSlotCounts: { [key: string]: number } = {};
  bookingsData.forEach((booking: Booking) => {
    const startTime = new Date(booking.startTime).toLocaleTimeString();
    const endTime = new Date(booking.endTime).toLocaleTimeString();
    const timeSlotString = `${startTime}-${endTime}`;
    if (timeSlotCounts[timeSlotString]) {
      timeSlotCounts[timeSlotString]++;
    } else {
      timeSlotCounts[timeSlotString] = 1;
    }
  });
  const sortedTimeSlots = Object.entries(timeSlotCounts).sort(
    (a: [string, number], b: [string, number]) => b[1] - a[1]
  );
  return sortedTimeSlots.slice(0, 3).map(([datetime, count]) => ({
    datetime,
    count,
  }));
};

export const getMostActiveUsers = (
  bookingsData
): { user: string; count: number }[] => {
  const userCounts: { [key: string]: number } = {};
  bookingsData.forEach((booking: Booking) => {
    const username = booking.userId;
    if (userCounts[username]) {
      userCounts[username]++;
    } else {
      userCounts[username] = 1;
    }
  });
  const sortedUsers = Object.entries(userCounts).sort(
    (a: [string, number], b: [string, number]) => b[1] - a[1]
  );
  return sortedUsers.slice(0, 3).map(([user, count]) => ({ user, count }));
};

export const getMostUsedResources = (
  bookingsData,
  resources
): {
  resource: string;
  count: number;
  name: string;
}[] => {
  const resourceCounts: { [key: string]: number } = {};
  bookingsData.forEach((booking: Booking) => {
    const resourceName = booking.resource.toString();
    if (resourceCounts[resourceName]) {
      resourceCounts[resourceName]++;
    } else {
      resourceCounts[resourceName] = 1;
    }
  });
  const sortedResources = Object.entries(resourceCounts).sort(
    (a: [string, number], b: [string, number]) => b[1] - a[1]
  );
  return sortedResources.slice(0, 3).map(([resource, count]) => ({
    resource,
    count,
    name: resources?.find((r) => r.id === resource)?.name ?? null,
  }));
};

export const getAverageBookingDuration = (bookingsData): number => {
  if (bookingsData.length === 0) return 0;

  let totalDuration = 0;
  bookingsData.forEach((booking: Booking) => {
    const startDateTime = new Date(
      `${booking.bookedDate} ${booking.startTime}`
    );
    const endDateTime = new Date(`${booking.bookedDate} ${booking.endTime}`);
    const duration = endDateTime.getTime() - startDateTime.getTime();
    totalDuration += duration;
  });

  return totalDuration / bookingsData.length;
};

export const getBookingStatusDistribution = (
  bookingsData
): {
  status: string;
  count: number;
}[] => {
  const statusCounts: { [key: string]: number } = {};
  bookingsData.forEach((booking: Booking) => {
    const status = booking.status;
    if (statusCounts[status]) {
      statusCounts[status]++;
    } else {
      statusCounts[status] = 1;
    }
  });
  return Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));
};

export const getResourceUtilization = (
  bookingsData
): {
  resource: string;
  utilization: number;
}[] => {
  const resourceUtilization: { [key: string]: number } = {};
  bookingsData.forEach((booking: Booking) => {
    const resourceName = booking.resource.toString();
    const startDateTime = new Date(
      `${booking.bookedDate} ${booking.startTime}`
    );
    const endDateTime = new Date(`${booking.bookedDate} ${booking.endTime}`);
    const duration = endDateTime.getTime() - startDateTime.getTime();
    if (resourceUtilization[resourceName]) {
      resourceUtilization[resourceName] += duration;
    } else {
      resourceUtilization[resourceName] = duration;
    }
  });

  const availableTime = 24 * 60 * 60 * 1000;
  return Object.entries(resourceUtilization).map(([resource, utilization]) => ({
    resource,
    utilization: (utilization / availableTime) * 100,
  }));
};

export const getPopularBookingReasons = (
  bookingsData
): {
  reason: string;
  count: number;
}[] => {
  const reasonCounts: { [key: string]: number } = {};
  bookingsData.forEach((booking: Booking) => {
    const reason = booking.reason;
    if (reasonCounts[reason]) {
      reasonCounts[reason]++;
    } else {
      reasonCounts[reason] = 1;
    }
  });
  const sortedReasons = Object.entries(reasonCounts).sort(
    (a: [string, number], b: [string, number]) => b[1] - a[1]
  );
  return sortedReasons
    .slice(0, 3)
    .map(([reason, count]) => ({ reason, count }));
};

export const getPendingBookingsCount = (bookingsData): number => {
  return bookingsData.filter((booking) => booking.status === "PENDING").length;
};

export const getCompletedBookingsCount = (bookingsData: Booking[]): number => {
  if (!bookingsData) return 0;

  return bookingsData.filter((booking) => booking.status === "APPROVED").length;
};

export const getCanceledBookingsCount = (bookingsData: Booking[]): number => {
  if (!bookingsData) return 0;

  return bookingsData.filter((booking) => booking.status === "REJECTED").length;
};

export const getTotalResourceUtilization = (
  resourceUtilization: { resource: string; utilization: number }[]
): number => {
  if (!resourceUtilization) return 0;

  return resourceUtilization.reduce(
    (total, resource) => total + (resource.utilization || 0),
    0
  );
};

export const getAverageResourceUtilization = (
  resourceUtilization: { resource: string; utilization: number }[]
): number => {
  if (!resourceUtilization || resourceUtilization.length === 0) return 0;

  const totalUtilization = getTotalResourceUtilization(resourceUtilization);
  return totalUtilization / resourceUtilization.length;
};
