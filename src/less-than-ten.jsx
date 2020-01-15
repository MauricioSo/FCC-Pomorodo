//function for give a zero to the number at the left and transform to string
function lessThanTen(time, direction) {
  if (direction === "increase") {
    return time < 11 ? "0" + (time + 1).toString() : time + 1;
  } else if (direction === "decrease") {
    return time < 11 ? "0" + (time - 1).toString() : time - 1;
  } else {
    return time < 11 ? "0" + time.toString() : time;
  }
}

export default lessThanTen;
