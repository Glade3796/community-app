"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function TownDropDown({ cities, selected }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function handleChange(e) {
    // pathname = current url, ?town=city
    if (e.target.value !== "-select city-") {
      router.push(pathname + "?" + createQueryString("town", e.target.value));
    }
  }

  return (
    <div className="text-center pb-10">
      <select onChange={handleChange} value={selected}>
        <option>-select city-</option>
        <option value={"all"}>view all</option>
        {cities.map((city, i) => (
          <option key={i} value={city.toLowerCase()}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}
