export const toSeconds = (time, type) => {
  if (!time || !type) return 0

  const types = {
    seconds: time => time,
    minutes: time => time * 60,
    hours: time => time * 3600
  }

  return types[type](time)
}
