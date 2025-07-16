import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

export type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export type CustomAppProps<P = {}> = AppProps<P> & {
  Component: CustomNextPage<P>;
};

// Custom type for PageProps in Next.js 13+ App Router
export type PageProps<TParams = { [key: string]: string | string[] | undefined }, TSearchParams = { [key: string]: string | string[] | undefined }> = {
  params: TParams;
  searchParams: TSearchParams;
};