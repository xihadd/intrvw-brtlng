import Link from 'next/link'
import { useRouter } from "next/router";

const isActivePath = (path: string, asPath: string) => {
    if (asPath.includes(path)) {
      return "text-yellow-400 hover:text-gray-900";
    }
    return "";
  };
  
const PagesMenu = (props: {routes: string[] | null}) => {
    const { asPath } = useRouter();
    const { routes } = props;

    if (!routes) return null;

    return (
        <nav className="flex flex-col justify-center max-sm:hidden">
        <ul className="flex flex-row">
          {routes.map((r) => (
            <li className="ml-2 p-3" key={r}>
              <Link
                href={`/${r}`}
                className={`uppercase hover:text-yellow-400 transition-all duration-150 ease-in ${isActivePath(
                  r,
                  asPath
                )}`}
              >
                {r}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
}

export default PagesMenu