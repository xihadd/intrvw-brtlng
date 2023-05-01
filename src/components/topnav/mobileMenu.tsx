import Link from "next/link";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMobileMenu } from "@/store/layoutSlice";

const MobileMenu = (props: { routes: string[] | null }) => {
  const { itemsInCart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const { routes = [] } = props;

  if (!routes) return null;

  return (
    <nav className="flex flex-col justify-center absolute z-100 top-0 left-0 w-screen h-screen bg-black/90">
      <div className="absolute left-4 top-6 text-4xl ">
        <Image src='https://www.breitling.com/assets/images/corporate/asset-version-24d29e0b00/breitling-inline_white.svg'
          alt="Breitling Logo"
          width={130}
          height={24}
        />
      </div>
      <div
        className="absolute top-4 right-8 text-4xl text-yellow-400"
        onClick={() => dispatch(toggleMobileMenu())}
      >
        x
      </div>
      <ul className="flex flex-col ml-4">
        {routes.map((r) => (
          <li className="p-3 mb-4" key={"mb" + r}>
            <Link href={`/${r}`} onClick={() => dispatch(toggleMobileMenu())} className="uppercase text-yellow-400 text-5xl">
              {r}
            </Link>
          </li>
        ))}
        <li className="p-3 mb-4" key={"mb-cart"}>
            <Link href={`/cart`} onClick={() => dispatch(toggleMobileMenu())} className="uppercase text-yellow-400 text-5xl">
              Cart {itemsInCart > 0 ? `(${itemsInCart})` : ""}
            </Link>
          </li>
      </ul>
    </nav>
  );
};
export default MobileMenu;
