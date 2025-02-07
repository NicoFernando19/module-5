// types/next.d.ts
import 'next';

declare module 'next' {
  interface NextPage {
    layout?: 'Auth' | 'Default';
  }
}