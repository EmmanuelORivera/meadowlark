const handlers = require("../handlers");

describe("handlers", () => {
  it("renders a home page", () => {
    const req = {};
    const res = { render: jest.fn() };

    handlers.home(req, res);

    expect(res.render.mock.calls[0][0]).toBe("home");
  });

  it("renders the about page with fortune", () => {
    const req = {};
    const res = { render: jest.fn() };

    handlers.about(req, res);

    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe("about");
    expect(res.render.mock.calls[0][1]).toEqual(
      expect.objectContaining({ fortune: expect.stringMatching(/\W/) })
    );
  });

  it("renders a 404 handler", () => {
    const req = {};
    const res = { render: jest.fn() };

    handlers.notFound(req, res);

    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe("404");
  });

  it("renders a 500 handler", () => {
    const err = new Error("some error");
    const req = {};
    const res = { render: jest.fn() };
    const next = jest.fn();

    handlers.serverError(err, req, res, next);

    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe("500");
  });
});
