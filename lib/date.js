  class Time {
    constructor(date) {
        this.year = date.getFullYear()
        this.month = this.setLength(date.getMonth() + 1)
        this.day = this.setLength(date.getDate())
        this.hour = this.setLength(date.getHours())
        this.minute = this.setLength(date.getMinutes())
    }

    setLength(slot) {
        const str = `${slot}`
        return str.length === 1 ? `0${str}` : str
    }

    getDate() {
        return `${this.year}-${this.month}-${this.day} ${this.hour}:${this.minute}`
    }
  }

module.exports = Time

// 2023-10-06 09:07