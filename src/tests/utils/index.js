export default function generateEvent(name, value, option = {}) {
  return {
    target: {
      value,
      name,
      ...option
    }
  };
}
