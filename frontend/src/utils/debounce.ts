export const debounce = <T extends (...args: any[]) => any>(callback: T, timeout = 700) => {
  let timerId;

  return (...args: Parameters<T>) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      timerId = null;
      callback(...args);
    }, timeout);
  };
};
