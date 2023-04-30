import Link from "next/link";
import Image from "next/image";

const Logo = () => {
    return (
        <Link
          aria-label="Homepage"
          className="logo w-40 h-16 ml-3 flex flex-col justify-center"
          href="/"
        >
          <Image
            alt="Breitling logo"
            className="max-sm:hidden"
            height="55"
            src="https://www.breitling.com/assets/images/corporate/asset-version-5d9cae3a35/breitling.svg"
            width="120"
          />
          <Image
            alt="Breitling logo"
            className="sm:hidden"
            height="24"
            src="https://www.breitling.com/assets/images/corporate/asset-version-acbd2e2a71/breitling-inline.svg"
            width="130"
          />
        </Link>
    );
  };
  
  export default Logo;
  