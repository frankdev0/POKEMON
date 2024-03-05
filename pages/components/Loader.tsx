
import { CgSpinnerTwoAlt } from "react-icons/cg";
import styles from "@/styles/Pokemon.module.css";


export default function Loader() {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}>
            <CgSpinnerTwoAlt className={styles.spin}/>
            </div>
        </div>
    );
};
