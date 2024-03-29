import React from "react";
import styled from "styled-components";

const parseDate = (dateString) => {
  var year = dateString.substring(0, 4);
  var month = dateString.substring(4, 6);
  var day = dateString.substring(6, 8);

  var date = new Date(year, month - 1, day);
  return date;
};

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("");
}

const AddToGoogleCalendar = (props) => {
  let name = props.name;
  let from = props.from;

  let A = props.A || styled.a``;

  let toDate = parseDate(props.to);
  toDate.setDate(toDate.getDate() + 1);
  let to = formatDate(toDate);
  let details = props.details || "";
  let location = props.location || "";
  return (
    <A
      href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${name}&dates=${from}/${to}&details=${details}&location=${location}&sf=true&output=xml`}
    >
      {props.children}
    </A>
  );
};
export default AddToGoogleCalendar;
