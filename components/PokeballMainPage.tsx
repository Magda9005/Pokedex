import Image from "next/image";

const Pokeball: React.FC = () => (
  
    <Image
      src="/pokeball-main-page.svg"
      alt="pokeball-logo"
      priority={true}
      layout="responsive"
      width="328"
      height="32"
    />

);

export default Pokeball;
