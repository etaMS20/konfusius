import type { Config } from 'jest';
import presets from 'jest-preset-angular/presets';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  ...presets.createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/src/setup.jest.ts'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
} satisfies Config;
