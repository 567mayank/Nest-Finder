export const isLoggedin = () => {
  const local = JSON.parse(localStorage.getItem("email"))
  if(local) return true
  else return false
}

export const backend = "https://nest-finder-nbfq.onrender.com"
