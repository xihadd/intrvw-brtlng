import Link from "next/link";

import { useAppDispatch } from "@/store/hooks";
import { toggleMobileMenu } from "@/store/layoutSlice";

const MobileMenu = (props: { routes: string[] | null }) => {
  const dispatch = useAppDispatch();

  const { routes = [] } = props;

  if (!routes) return null;

  return (
    <nav className="flex flex-col justify-center absolute z-100 top-0 left-0 w-screen h-screen bg-black/90">
      <div
        className="absolute right-6 font-bold top-3 text-4xl text-yellow-400"
        onClick={() => dispatch(toggleMobileMenu())}
      >
        X
      </div>
      <ul className="flex flex-col ml-4">
        {routes.map((r) => (
          <li className="p-3 mb-4" key={"mb" + r}>
            <Link href="#" className="uppercase text-yellow-400 text-3xl">
              {r}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default MobileMenu;
