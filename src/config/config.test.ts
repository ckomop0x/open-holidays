import { describe, it, expect, vi } from "vitest";

describe("config", () => {
  it("should have a default country and title", async () => {
    const VITE_DEFAULT_COUNTRY = "NL";
    const VITE_APP_TITLE = "Official public holidays";
    // Stub environment variables
    vi.stubEnv("VITE_DEFAULT_COUNTRY", undefined);
    vi.stubEnv("VITE_APP_TITLE", undefined);

    // Clear module cache to force re-import with new env variables
    vi.resetModules();

    // Re-import the config file
    const { config: updatedConfig } = await import("@/config/config");

    // Clear module cache to force re-import with new env variables
    vi.resetModules();

    expect(updatedConfig.defaultCountry).toBe(VITE_DEFAULT_COUNTRY);
    expect(updatedConfig.appTitle).toBe(VITE_APP_TITLE);
  });

  it("should use environment variables when provided", async () => {
    // Stub environment variables
    vi.stubEnv("VITE_DEFAULT_COUNTRY", "UA");
    vi.stubEnv("VITE_APP_TITLE", "Holiday Tracker");

    // Clear module cache to force re-import with new env variables
    vi.resetModules();

    // Re-import the config file
    const { config: updatedConfig } = await import("@/config/config");

    expect(updatedConfig.defaultCountry).toBe("UA");
    expect(updatedConfig.appTitle).toBe("Holiday Tracker");
  });
});
