//lib
import EventManager from "../lib/EventManager"

export const toastEventManager = new EventManager()

export default function toast({ type, text, duration }) {
  toastEventManager.emit('addtoast', { text, type, duration })
}
