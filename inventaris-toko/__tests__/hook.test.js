import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "@/hooks/useDebounce";
import { useLocalStorage } from "@/hooks/useLocalStorage";

describe("useDebounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("baru memperbarui nilai setelah jeda 300ms berlalu", () => {
    const { result, rerender } = renderHook(({ nilai }) => useDebounce(nilai, 300), {
      initialProps: { nilai: "s" },
    });

    rerender({ nilai: "sab" });
    expect(result.current).toBe("s");

    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe("sab");
  });

  it("membatalkan timer lama bila ada ketikan baru sebelum jeda selesai", () => {
    const { result, rerender } = renderHook(({ nilai }) => useDebounce(nilai, 300), {
      initialProps: { nilai: "s" },
    });

    rerender({ nilai: "sa" });
    act(() => vi.advanceTimersByTime(200));
    rerender({ nilai: "sab" });
    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe("s");

    act(() => vi.advanceTimersByTime(100));
    expect(result.current).toBe("sab");
  });
});

describe("useLocalStorage", () => {
  beforeEach(() => window.localStorage.clear());

  it("memakai nilaiAwal saat kosong lalu menyimpan perubahan ke localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("uji:barang", [{ id: 1 }]));
    expect(result.current[0]).toEqual([{ id: 1 }]);

    act(() => result.current[1]([{ id: 1 }, { id: 2 }]));
    expect(JSON.parse(window.localStorage.getItem("uji:barang"))).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("memulihkan data tersimpan dan jatuh ke nilaiAwal jika JSON rusak", () => {
    window.localStorage.setItem("uji:pulih", JSON.stringify({ tema: "gelap" }));
    const { result } = renderHook(() => useLocalStorage("uji:pulih", { tema: "terang" }));
    expect(result.current[0]).toEqual({ tema: "gelap" });

    window.localStorage.setItem("uji:rusak", "{bukan-json");
    const rusak = renderHook(() => useLocalStorage("uji:rusak", "aman"));
    expect(rusak.result.current[0]).toBe("aman");
  });
});
