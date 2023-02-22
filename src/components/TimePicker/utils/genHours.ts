export const genHours = () => {
    const hours = Array.from({length: 24}, (_, i) => i)
      .map((hour) => String(hour).padStart(2, '0'))

      return ['', ...hours, '']
      
}