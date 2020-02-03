import { INCREMENT, DECREMENT, RESET } from "../types/home";

export function increment() {
  return {
    type: INCREMENT
  };
}

export function decrement() {
  return {
    type: DECREMENT
  };
}

export function reset() {
  return {
    type: RESET
  };
}
