import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

declare module 'next' {
  export type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
  };
}

declare module 'next/app' {
  export type CustomAppProps<P = {}> = AppProps<P> & {
    Component: CustomNextPage<P>;
  };
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      DATABASE_URL: string;
    }
  }
}

// Custom type for PageProps in Next.js 13+ App Router
export type PageProps<TParams = { [key: string]: string | string[] | undefined }, TSearchParams = { [key: string]: string | string[] | undefined }> = {
  params: TParams;
  searchParams: TSearchParams;
};