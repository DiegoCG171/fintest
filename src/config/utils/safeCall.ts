export async function safeCall<T>(
    fn: (...args: unknown[]) => Promise<T>,
    payload?: null | object
): Promise<T> {
    const shouldPassPayload =
        payload !== null &&
        payload !== undefined &&
        Object.keys(payload).length > 0;

    return shouldPassPayload ? fn(payload) : fn();
}
