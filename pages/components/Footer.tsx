import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Footer() {
  return (
    <div>
      <div className={styles.footergrid}>
        <div className={styles.pergrid}>
          <Image src="/logo.png" alt="logo" width={100} height={30} />
          <div className={styles.footertext}>
            Social media validation business model canvas graphical user
            interface launch party creative facebook iPad twitter.
          </div>
        </div>
        <div className={styles.grids}>
          <h6 className={styles.footerheading}>Landings</h6>
          <Link href="#" className={styles.footerlinks}>
            Home
          </Link>
          <Link href="#" className={styles.footerlinks}>
            Products
          </Link>
          <Link href="#" className={styles.footerlinks}>
            Services
          </Link>
        </div>
        <div className={styles.grids}>
          <h6 className={styles.footerheading}>Company</h6>
          <Link href="#" className={styles.footerlinks}>
            Home
          </Link>
          <div className="d-flex align-items-center">
            <Link href="#" className={styles.footerlinks}>
              Careers
            </Link>
            <p className={styles.hiring}>Hiring!</p>
          </div>
          <Link href="#" className={styles.footerlinks}>
            Services
          </Link>
        </div>
        <div className={styles.endgrid}>
          <h6 className={styles.footerheading}>Landings</h6>
          <Link href="#" className={styles.footerlinks}>
            Blog
          </Link>
          <Link href="#" className={styles.footerlinks}>
            Products
          </Link>
          <Link href="#" className={styles.footerlinks}>
            Services
          </Link>
        </div>
      </div>
      <div className={styles.copyright}>All rights reserved.</div>
    </div>
  );
}
