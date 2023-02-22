export const genMinutes = () => {
    const minutes =  Array.from({length: 60}, (_, i) => i)
      .map((hour) => String(hour).padStart(2, '0'))
      
    return ['', ...minutes, '']
  }