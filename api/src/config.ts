function assertEnvVarPresent(
  value: string | undefined,
  envName: string
): string {
  if (value == null) {
    throw new Error(
      `Required environment variable missing on init: ${envName}`
    );
  }
  return value.toString();
}

export const DATABASE_URL = assertEnvVarPresent(
  process.env.DATABASE_URL,
  'DATABASE_URL'
);

export const PORT = assertEnvVarPresent(process.env?.PORT ?? '4000', 'PORT');
export const HOST = assertEnvVarPresent(
  process.env?.HOST ?? 'http://localhost',
  'HOST'
);
