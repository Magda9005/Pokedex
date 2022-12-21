import Image from "next/image";
import Link from "next/link";

const Pokeball: React.FC = () => (
  <Link href={"/"}>
    <Image
      src="/pokeball-main-page.svg"
      alt="pokeball-logo"
      priority={true}
      layout="responsive"
      width="328"
      height="32"
    />
  </Link>
);

export default Pokeball;
