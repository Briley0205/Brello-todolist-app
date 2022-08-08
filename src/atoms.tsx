import { atom, selector } from "recoil";

// for selector function
export const minuteState = atom({
  key: "minutes",
  default: 0,
});

export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});

// for DragNDrop
export const toDoState = atom({
  key: "toDo",
  default: ["a", "b", "c", "d", "e"],
});
