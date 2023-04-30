/* eslint-disable @typescript-eslint/naming-convention */
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }

  declare module '*.md' {
    export const metadata: any
    export { SvelteComponent as default } from 'svelte'
  }
}

export {}
