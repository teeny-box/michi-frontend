const phoneNumberFormat = (phoneNumber: string) => {
  let phone = "";

  if (phoneNumber.length < 1) {
    phone = "";
  } else if (phoneNumber.length < 4) {
    return phoneNumber;
  } else if (phoneNumber.length < 7) {
    phone += phoneNumber.slice(0, 3);
    phone += "-";
    phone += phoneNumber.slice(3);
  } else if (phoneNumber.length < 11) {
    phone += phoneNumber.slice(0, 3);
    phone += "-";
    phone += phoneNumber.slice(3, 6);
    phone += "-";
    phone += phoneNumber.slice(6);
  } else {
    phone += phoneNumber.slice(0, 3);
    phone += "-";
    phone += phoneNumber.slice(3, 7);
    phone += "-";
    phone += phoneNumber.slice(7);
  }

  return phone;
};

export default phoneNumberFormat;
