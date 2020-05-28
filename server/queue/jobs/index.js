export default [
  //{
  //data: {
  //type: "puppeteerv1", // Scraping routine
  //collection: "hfac", // MongoDB collection
  //name: "House Foreign Affairs Committee Hearings", // Stored in Redis, must be unique
  //link: "https://foreignaffairs.house.gov/hearings", // Initial Link
  //selectors: {
  //// Scrapers used in the routine
  //layerOne: {
  //depth: 5, // Max number of rows checked
  //rows: "table tbody tr",
  //dateSelector: "td.recordListDate",
  //dateFormat: "MM/DD/YYYY",
  //},
  //layerTwo: {
  //title: ".title",
  //date: "span.date",
  //time: "span.time",
  //location: "span.location strong",
  //witnesses: "div.witnesses strong",
  //},
  //},
  //},
  //schedule: { type: "every", value: 2000 },
  //},
  //{
  //data: {
  //type: "puppeteerv1",
  //collection: "hfac",
  //name: "House Foreign Affairs Committee Markups",
  //link: "https://foreignaffairs.house.gov/markups",
  //selectors: {
  //layerOne: {
  //depth: 1,
  //rows: "table tbody tr",
  //dateSelector: "td.recordListDate",
  //dateFormat: "MM/DD/YYYY",
  //},
  //layerTwo: {
  //title: ".title",
  //date: "span.date",
  //time: "span.time",
  //location: "span.location strong",
  //witnesses: "div.witnesses strong",
  //},
  //},
  //},
  //schedule: { type: "every", value: 2000 },
  //},
  //{
  //data: {
  //type: "puppeteerv1",
  //collection: "hasc",
  //name: "House Armed Services Committee",
  //link: "https://armedservices.house.gov/hearings",
  //selectors: {
  //layerOne: {
  //depth: 5,
  //rows: "table tbody tr",
  //dateSelector: "td.recordListDate",
  //dateFormat: "MM/DD/YYYY",
  //},
  //layerTwo: {
  //title: ".title",
  //date: "span.date:first-of-type",
  //},
  //},
  //},
  //schedule: { type: "every", value: 2000 },
  //},
  {
    data: {
      type: "puppeteerv2",
      collection: "hvac",
      name: "House Veterans Affairs Committee Hearings",
      link: "https://veterans.house.gov/events/hearings",
      selectors: {
        layerOne: {
          depth: 5,
          rows: "tr.vevent",
          date: "time.dtstart",
          time: "time.dtstart",
          location: "span.location",
          dateFormat: "MMM D",
        },
      },
    },
    schedule: { type: "every", value: 2000 },
  },
];
