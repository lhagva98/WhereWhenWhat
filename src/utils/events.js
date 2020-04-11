export const eventKeyExtractor = (event) => event._id.toString();

export const parseeventsArray = (events) =>
  events.map((event) => parseevent(event));

export const filterDuplicateevents = (events) =>
  events.filter(
    (event, index) =>
      index ===
      events.findIndex(
        (m) => eventKeyExtractor(m) === eventKeyExtractor(event),
      ),
  );

// Local functions
const parseevent = (event) => ({
  ...event,
  year: event.release_date.substr(0, 4),
});

const eventRequiredProps = [
  'release_date',
  'title',
  'poster_path',
  'backdrop_path',
  'overview',
];
const isEnoughInfo = (event) => {
  let isCorrect = true;
  eventRequiredProps.forEach((prop) => {
    if (!event[prop]) {
      isCorrect = false;
      return;
    }
  });
  return isCorrect;
};
