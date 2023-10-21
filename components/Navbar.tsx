import Image from "next/image";
import Link from "next/link";
import React from "react";

const navIcons = [
 { src: "/assets/icons/search.svg", alt: "Search" },
 { src: "/assets/icons/black-heart.svg", alt: "Heart" },
 { src: "/assets/icons/user.svg", alt: "User" },
];
const Navbar = () => {
 return (
  <header className="w-full">
   <nav className="nav">
    <Link href={"/"} className="flex items-center gap-1">
     <Image src={"/assets/icons/logo.png"} width={200} height={50} alt="logo" />
    </Link>
    <div className="flex items-center gap-5">
     {navIcons.map((icon) => (
      <Image
       key={icon.alt}
       src={icon.src}
       width={30}
       height={30}
       alt={icon.alt}
      />
     ))}
    </div>
   </nav>
  </header>
 );
};

export default Navbar;
