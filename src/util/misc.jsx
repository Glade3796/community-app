import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function categoryTypesArr() {
  return [
    { name: "asset", icon: "🎁" },
    { name: "service", icon: "💪" },
    { name: "request", icon: "🙏" },
    { name: "event", icon: "📅" },
    { name: "news", icon: "📣" },
    { name: "other", icon: "🤷‍♂️" },
  ];
}

export function addTypeIcon(posts) {
  const types = categoryTypesArr();
  return posts?.map((post) => {
    const type = types.find((type) => type.name === post.post_type);
    return {
      ...post,
      type: type ? type.name : null,
      icon: type ? type.icon : null,
    };
  });
}
export function addTypeIconSinglePost(post) {
  const types = categoryTypesArr();
  const type = types.find((type) => type.name === post.post_type);
  return {
    ...post,
    type: type ? type.name : null,
    icon: type ? type.icon : null,
  };
}

export function CategoryLink({ type, icon }) {
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
  return (
    <Link
      className="opacity-50 hover:opacity-100 hover:text-blue-500 hover:outline hover:outline-blue-500"
      href={pathname + "?" + createQueryString("category", type)}
    >
      {icon} - {type}
    </Link>
  );
}

export function postOwnerTest(user, post_userId) {
  if (user.id === post_userId || user.site_admin) {
    return true;
  } else {
    return false;
  }
}
