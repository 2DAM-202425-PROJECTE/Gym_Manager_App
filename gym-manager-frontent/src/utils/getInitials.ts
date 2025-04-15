export const getInitials = (name: string) => {
    if (!name) return "EN"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }