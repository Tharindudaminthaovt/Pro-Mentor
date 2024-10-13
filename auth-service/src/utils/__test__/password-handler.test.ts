import { generateTempPassword } from "../password-handler";

it("password should have at least 8 characters", () => {
    const password = generateTempPassword();
    expect(password.length).toBeGreaterThanOrEqual(8);
});

it("password should have at least 1 number", () => {
    const password = generateTempPassword();
    expect(password).toMatch(/[0-9]/);
});

it("password should have at least 1 uppercase letter", () => {
    const password = generateTempPassword();
    expect(password).toMatch(/[A-Z]/);
});

it("password should have at least 1 lowercase letter", () => {
    const password = generateTempPassword();
    expect(password).toMatch(/[a-z]/);
});

it("password should have at least 1 symbol", () => {
    const password = generateTempPassword();
    expect(password).toMatch(/[!@#$%&*=]/);
});
