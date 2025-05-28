"use client";

import { useMemo, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

export const useMainHook = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const isArabic = useMemo(() => locale === "ar", [locale]);

  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number[]>([]);

  const isCurrentPath = (path: string) => pathname === path;
  const isIncludePath = (path: string) => pathname.includes(path);

  const getQueryParam = (key: string) => searchParams.get(key);

  const setQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const removeQueryParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSelectOne = (id: number) => {
    setSelectedId((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isEmpty = (val: any) => {
    if (Array.isArray(val)) return val.length === 0;
    if (typeof val === "object" && val !== null)
      return Object.keys(val).length === 0;
    return !val;
  };

  const today = new Date().toISOString().split("T")[0];

  const splitIsoDateTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
      const day = pad(date.getDate());
      const month = pad(date.getMonth() + 1);
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = pad(date.getMinutes());
      const hours12 = pad(hours % 12 || 12);
      const ampm = hours >= 12 ? "Pm" : "Am";

      return {
        date: `${day}/${month}/${year}`,
        time: `${hours12}:${minutes} ${ampm}`,
      };
    } catch {
      return { date: "", time: "" };
    }
  };

  const truncateText = (text: string, length: number) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  const resetObject = <T extends Record<string, any>>(obj: T): T =>
    Object.fromEntries(Object.keys(obj).map((key) => [key, ""])) as T;

  const formatCurrency = (value: number, currency: string = "EGP") =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value);

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{1,4})(\d{1,4})(\d{1,4})$/);
    if (match) return `+${match[1]} ${match[2]} ${match[3]}`;
    return phone;
  };

  const imgView = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) return URL.createObjectURL(file);
  };

  const calculatePercentage = (total: number, value: number) =>
    (value / total) * 100;

  const filterDuplicates = (array: any[]) => [...new Set(array)];

  const appendToFormData = (
    formData: FormData,
    data: any,
    parentKey: string = ""
  ): FormData => {
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.entries(data).forEach(([key, value]) => {
        const fullKey = parentKey ? `${parentKey}[${key}]` : key;
        if (Array.isArray(value)) {
          value.forEach((arrayItem, index) => {
            appendToFormData(formData, arrayItem, `${fullKey}[${index}]`);
          });
        } else {
          appendToFormData(formData, value, fullKey);
        }
      });
    } else {
      formData.append(parentKey, data);
    }
    return formData;
  };

  const handleMultiLangInput = (
    name: string,
    lang: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any,
    setFn: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const value = e;
    setFn((prev: any) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [lang]: value,
      },
    }));
  };

  return {
    t,
    isArabic,
    router,
    dispatch,
    loading,
    pathname,
    setLoading,
    handleSelectOne,
    selectedId,
    setSelectedId,
    isCurrentPath,
    isIncludePath,
    getQueryParam,
    setQueryParam,
    removeQueryParam,
    isEmpty,
    today,
    splitIsoDateTime,
    truncateText,
    resetObject,
    formatCurrency,
    formatPhoneNumber,
    imgView,
    calculatePercentage,
    filterDuplicates,
    appendToFormData,
    handleMultiLangInput,
    locale,
  };
};
