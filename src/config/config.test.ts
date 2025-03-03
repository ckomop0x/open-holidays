import { describe, it, expect, vi } from "vitest";

describe("config", () => {
  it("should have a default country and title", async () => {
    const VITE_DEFAULT_COUNTRY = "NL";
    const VITE_LANGUAGE_ISO_CODE = "EN";
    // Stub environment variables
    vi.stubEnv("VITE_DEFAULT_COUNTRY", undefined);
    vi.stubEnv("VITE_LANGUAGE_ISO_CODE", undefined);

    // Clear module cache to force re-import with new env variables
    vi.resetModules();

    // Re-import the config file
    const { config: updatedConfig } = await import("@/config/config");

    // Clear module cache to force re-import with new env variables
    vi.resetModules();

    expect(updatedConfig.defaultCountry).toBe(VITE_DEFAULT_COUNTRY);
    expect(updatedConfig.languageIsoCode).toBe(VITE_LANGUAGE_ISO_CODE);
  });

  it("should use environment variables when provided", async () => {
    // Stub environment variables
    vi.stubEnv("VITE_DEFAULT_COUNTRY", "UA");
    vi.stubEnv("VITE_LANGUAGE_ISO_CODE", "UA");

    // Clear module cache to force re-import with new env variables
    vi.resetModules();

    // Re-import the config file
    const { config: updatedConfig } = await import("@/config/config");

    expect(updatedConfig.defaultCountry).toBe("UA");
    expect(updatedConfig.languageIsoCode).toBe("UA");
  });
});
