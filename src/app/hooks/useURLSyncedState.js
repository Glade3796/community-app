// import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";

// export function useUrlSyncedState(deserialize, serialize) {
//     const params = useSearchParams();
//     const [state, setState] = useState(() => deserialize(params!));

//     useEffect(() => {
//         const params = new URLSearchParams(window.location.search);
//         const oldParamsString = params.toString();
//         serialize(state, params);
//         const str = params.toString();
//         if (str !== oldParamsString) {
//             const newHref = `${location.pathname}${str === "" ? "" : `?${str}`}`;
//             window.history.replaceState(
//                 { ...window.history.state, as: newHref, url: newHref },
//                 "",
//                 newHref
//             );
//         }
//     }, [state, serialize]);

//     return [state, setState];
// }

// // usage:
// const DESERIALIZE_PAGE = (params) =>
//     params?.has("page") ? parseInt(params.get("page")!, 10) - 1 : 0;

// const SERIALIZE_PAGE = (page, params) => {
//     if (page > 0) {
//         params.set("page", String(page + 1));
//     } else {
//         params.delete("page");
//     }
// };

// function MyComponent() {
//     const [page, setPage] = useUrlSyncedState(
//         DESERIALIZE_PAGE,
//         SERIALIZE_PAGE
//     );

//     return <div>current page: {page}</div>;
// }
// export default MyComponent;
