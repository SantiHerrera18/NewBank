import moment from "moment";

export const validateRegister = (values) => {
  const errors = {};
  if (!values.name) errors.name = "Required";
  else if (values.name.length > 8) {
    errors.name = "Must be 8 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.birthdate) {
    errors.birthdate = "Required";
  } else {
    const today = new Date();
    const newDate = new Date(values.birthdate);
    if (newDate > today) {
      errors.birthdate = "The date cannot be in the future";
    } else {
      const age = today.getFullYear() - newDate.getFullYear();
      const monthDiff = today.getMonth() - newDate.getMonth();
      const dayDiff = today.getDate() - newDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      if (age < 17) {
        errors.birthdate = "You must be at least 18 years old";
      }
    }
  }

  if (!values.nDni) errors.nDni = "Required";
  else if (values.nDni.toString().length > 5) {
    errors.nDni = "Must be 5 characters or less";
  }

  if (!values.username) errors.username = "Required";
  else if (values.username.length > 8) {
    errors.name = "Must be 8 characters or less";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (!/^[a-zA-Z0-9]+$/.test(values.password)) {
    errors.password = "Password must be alphanumeric";
  } else if (values.password.length < 4) {
    errors.password = "Password must be at least 6 characters long";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords don't match";
  }

  return errors;
};

export const validateLogin = (values) => {
  const errors = {};

  if (!values.username) errors.username = "Required";

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

export const validateScheduleAppointment = (values) => {
  const errors = {};

  if (!values.date) errors.date = "Required";
  else {
    const selectedDate = moment(values.date);
    const today = moment().startOf("day");

    if (selectedDate.isBefore(today)) {
      errors.date = "Past times are not allowed";
    }
    const dayOfWeek = selectedDate.day();
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      errors.date = "Cannot schedule appointments on weekends";
    }
  }

  if (!values.time) errors.time = "Required";
  else {
    const [hours, minutes] = values.time.split(":").map(Number);
    const selectedTime = moment().set({ hour: hours, minute: minutes });
    const now = moment();

    const openingTime = moment().set({ hour: 8, minute: 0 });
    const closingTime = moment().set({ hour: 18, minute: 0 });

    if (moment(values.date).isSame(now, "day") && selectedTime.isBefore(now)) {
      errors.time = "Past times are not allowed";
    }

    if (
      selectedTime.isBefore(openingTime) ||
      selectedTime.isAfter(closingTime)
    ) {
      errors.time = "Time must be between 08:00 am and 06:00 pm";
    }
  }

  return errors;
};

export const validateContact = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  }

  if (!values.message) {
    errors.message = "Message is required";
  }

  return errors;
};
