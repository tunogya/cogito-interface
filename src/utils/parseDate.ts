export const parseDate = (time: any) => {
  const nowTime = new Date()
  const day = nowTime.getDate()
  const hours = nowTime.getHours()
  const minutes = nowTime.getMinutes()
  // 开始分解付入的时间
  const create_at = new Date(time)
  const timeday = create_at.getDate()
  const timehours = create_at.getHours()
  const timeminutes = create_at.getMinutes()
  const d_day = Math.abs(day - timeday)
  const d_hours = hours - timehours
  const d_minutes = Math.abs(minutes - timeminutes)
  if (d_day <= 1) {
    switch (d_day) {
      case 0:
        if (d_hours === 0 && d_minutes > 0) {
          return d_minutes + " minutes ago"
        } else if (d_hours === 0 && d_minutes === 0) {
          return "1 minute ago"
        } else {
          return d_hours + " hours ago"
        }
      case 1:
        if (d_hours < 0) {
          return 24 + d_hours + " hours ago"
        } else {
          return d_day + " days ago"
        }
    }
  } else if (d_day > 1 && d_day < 10) {
    return d_day + " days ago"
  } else {
    return time
  }
}
