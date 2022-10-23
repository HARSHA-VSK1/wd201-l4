let todoList = require("../todo.js");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todolist Test Suite", () => {
  test("Should add new todo", () => {
    add({
      title: "A test item",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(1);
  });

  test("Should mark Todo as complete", () => {
    expect(all.length).toEqual(1);
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  test("Should return overdue items", () => {
    expect(overdue().length).toEqual(0);
    const t = new Date();
    const oD = 60 * 60 * 24 * 1000;
    add({
      title: "An overdue test item",
      completed: false,
      dueDate: new Date(t.getTime() - 2 * oD).toLocaleDateString("en-CA"),
    });
    expect(overdue().length).toBe(1);
  });

  test("Should return due today items", () => {
    expect(dueToday().length).toEqual(1);
    add({
      title: "Complete l4 milestone",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(dueToday().length).toBe(2);
  });

  test("Should return due later items", () => {
    expect(dueLater().length).toEqual(0);
    const t = new Date();
    const oD = 60 * 60 * 24 * 1000;
    add({
      title: "Complete l5 milestone",
      completed: false,
      dueDate: new Date(t.getTime() + 2 * oD).toLocaleDateString("en-CA"),
    });
    expect(dueLater().length).toBe(1);
  });
});
