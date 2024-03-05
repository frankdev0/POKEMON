import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div>
      <nav>
        <div className={styles.navcontainer}>
          <Image src="/logo.png" alt="logo" width={100} height={30} />
          <div className={styles.rightnav}>
            <div className={styles.respnav}>
              <Link href="#" className={styles.menuitem}>
                Product{" "}
              </Link>
              <Link href="#" className={styles.menuitem}>
                Services
              </Link>
              <Link href="#" className={styles.menuitem}>
                About
              </Link>

              <button className={styles.navbtn}>Log In</button>
              <div className={styles.clippath}></div>
            </div>
            <div className={styles.btnmedia}>
              <div className={styles.barscontainer} onClick={openMobileMenu}>
                <FaBars className={styles.fabars} />
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className={styles.mobilemenu}>
              <div className={styles.mobileheader}>
                <button className={styles.mobilenavbtn}>Log In</button>
                <div className={styles.close} onClick={closeMobileMenu}>
                  <IoClose className={styles.closeicon} />
                </div>
              </div>

              <div className={styles.mobilelinks}>
                <Link href="/#" className={styles.mobilelink}>
                  Product
                </Link>
                <Link href="/#" className={styles.mobilelink}>
                  Services
                </Link>
                <Link href="/#" className={styles.mobilelink}>
                  About
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
