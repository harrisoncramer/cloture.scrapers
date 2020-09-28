import moment from "moment";
import { Model, Document } from "mongoose";
import { Committee } from "../index";

interface obj {
  [key: string]: any;
}

type CommitteeDocument = Committee & {
  committee: string;
};

export const stripWhiteSpace = (data: Committee[]): Committee[] =>
  data.map((x: Committee) => {
    for (let key in x) {
      //@ts-ignore
      if (typeof x[key] === "string") {
        //@ts-ignore
        x[key] = x[key].trim();
      }
    }
    return x;
  });

// This function saves the data to our database.
export const insertData = (
  model: Model<Document, {}>,
  data: CommitteeDocument[]
) =>
  data.map(async (datum) => {
    let doc = await model.findOne({ link: datum.link });
    if (!doc) {
      let newDoc = new model({ ...datum });
      return await newDoc.save();
    } else {
      doc.set({ ...datum });
      return await doc.save();
    }
  });

// Check to see if date and time fields pulled from page
// match the valid values provided in each job (validFormats).
// If not, return null. Otherwise, return value with ISOString().

const validFormats = {
  date: [
    "MMM D, YYYY",
    "MM.DD.YY",
    "MMM D YYYY",
    "MMM D",
    "MMM DD YYYY",
    "MMMM DD, YYYY",
    "MMMM D, YYYY",
    "MM/DD/YYYY",
    "MM/DD/YY",
    "M/DD/YY",
    "M/D/YY",
    "ddd, MM/DD/YYYY",
    "dddd, MMMM DD, YYYY",
    "dddd, MMMM D, YYYY",
  ],
  time: [
    "LT",
    "hh:mm A",
    "h:mm A",
    "hh:mm a",
    "h:mm a",
    "hh:mmA",
    "h:mmA",
    "hh:mma",
    "h:mma",
    "hh:mm",
    "h:mm [p.m.]",
    "h:mm [a.m.]",
    "h:mm [A.M.]",
    "h:mm [P.M.]",
  ],
};

// This function ensures that the date/time data fetched is correct.
// And if not, sets the field to undefined.
export const cleanDateTime = (data: Committee[]) =>
  data.map((doc) => {
    const { date, time } = doc;
    const validTime = validFormats.time.find((format) =>
      moment(time, format, true).isValid()
    );
    const validDate = validFormats.date.find((format) =>
      moment(date, format, true).isValid()
    );

    doc.time = validTime ? moment(time, validTime).toDate() : undefined;
    doc.date = validDate ? moment(date, validDate).toDate() : undefined;
    return doc;
  });
