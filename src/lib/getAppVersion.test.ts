import { getAppVersion } from "./getAppVersion"; // Update with the actual file path

vi.mock("../../package.json", () => ({
  default: { version: "1.2.3" },
}));

describe("getAppVersion", () => {
  it("should return the correct version from package.json", () => {
    expect(getAppVersion()).toBe("1.2.3");
  });
});
