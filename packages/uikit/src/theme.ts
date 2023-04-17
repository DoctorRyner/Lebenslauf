import { useEffect, useState } from "react"

export type Theme = "dark" | "light"

export function getUserTheme(): Theme {
  const storedTheme =
    localStorage.getItem("theme") ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

  switch (storedTheme) {
    case "dark": {
      return "dark"
    }
    case "light": {
      return "light"
    }
  }

  return "light"
}

type SetThemeOptions = {
  transition?: boolean
  shouldNotRemember?: boolean
}

let themeTransitionTimeout: NodeJS.Timeout

export function setTheme(theme: Theme, options?: SetThemeOptions) {
  options = options ?? {
    transition: true,
  }

  document.documentElement.setAttribute("data-theme", theme)

  if (!options.shouldNotRemember) {
    localStorage.setItem("theme", theme)
  }

  if (options?.transition) {
    document.body.classList.add("themeTransition")
    clearTimeout(themeTransitionTimeout)

    themeTransitionTimeout = setTimeout(() => {
      document.body.classList.remove("themeTransition")
    }, 500)
  }
}

export function runTransition() {
  document.body.classList.add("themeTransition")
  clearTimeout(themeTransitionTimeout)

  themeTransitionTimeout = setTimeout(() => {
    document.body.classList.remove("themeTransition")
  }, 500)
}

export function switchTheme() {
  const theme = getUserTheme()

  setTheme(theme === "dark" ? "light" : "dark")
}

export type DarkMode = {
  isDarkModeOn: boolean
  setIsDarkModeOn: (isDarkModeOn: boolean) => void
}

export function useDarkMode(): DarkMode {
  const [isDarkModeOn, setIsDarkModeOn] = useState<boolean>()
  function setIsDarkModeOnAndSaveIt(isDarkModeOn: boolean) {
    const theme = isDarkModeOn ? "dark" : "light"

    setIsDarkModeOn(isDarkModeOn)
    localStorage.setItem("theme", theme)
  }

  useEffect(() => {
    const storedTheme = getUserTheme()

    setTheme(storedTheme, { transition: false, shouldNotRemember: true })
    setIsDarkModeOn(storedTheme === "dark")
  }, [])

  useEffect(() => {
    if (isDarkModeOn === undefined) return

    setTheme(isDarkModeOn ? "dark" : "light", {
      transition: false,
      shouldNotRemember: true,
    })
  }, [isDarkModeOn])

  return { isDarkModeOn: isDarkModeOn ?? false, setIsDarkModeOn: setIsDarkModeOnAndSaveIt }
}
