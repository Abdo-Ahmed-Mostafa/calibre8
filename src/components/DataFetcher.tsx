type DataFetcherProps<T> = {
  url: string;
  render: (data: T) => React.ReactNode;
  lang?: string;
};

export default async function DataFetcher<T>({
  url,
  render,
}: DataFetcherProps<T>) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return <div className="text-red-500">فشل تحميل البيانات من السيرفر</div>;
    }

    const data: T = await res.json();
    return <>{render(data)}</>;
  } catch (error: any) {
    return (
      <div className="text-red-500">حدث خطأ غير متوقع {error.meesage}</div>
    );
  }
}
