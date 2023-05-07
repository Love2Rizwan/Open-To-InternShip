import styles from "../styles/Home.module.css";
import sectionStyles from "./leftSection.module.css";
import { scaleFactor } from "../utils/constants";

// Component for creating space with specified width and height
const Spacer = ({ width = 0, height = 0 }) => <div style={{ width, height }} />;

export default function LeftSection({ collegeDetails }) {
  // Destructure relevant properties from collegeDetails object
  const { fullName, logoLink: collegeLogo } = collegeDetails;

  // Split fullName into collegeFullName and collegeCity
  const [collegeFullName, collegeCity] = fullName?.split(",") || ["", ""];

  return (
    // Main section container with CSS classes
    <section
      className={`${styles.full} ${styles.section} ${sectionStyles.leftSection}`}
    >
      <Spacer height={"2.5rem"} />

      <div>
        <div className={sectionStyles.companyNameContainer}>
          <img
            src={collegeLogo}
            alt="logo"
            width={80 * scaleFactor}
            height={80 * scaleFactor}
          />
          <div style={{ marginLeft: `1rem` }}>
            <h2 className={sectionStyles.collegeName}>
              {collegeFullName.trim()}
            </h2>
            {!!collegeCity && (
              <small className={sectionStyles.collegeCity}>
                {collegeCity.trim()}
              </small>
            )}
          </div>
        </div>

        <Spacer height={"4rem"} />

        <h1 className={sectionStyles.descHeading}>
          Want to be a part <br /> of Company?
        </h1>

        <Spacer height={"1.7rem"} />

        <img
          src={require("../public/svgs/student8.png")}
          width={442 * scaleFactor}
          height={419 * scaleFactor}
        />
      </div>

      <Spacer height={".5rem"} />

      <small
        className={`${sectionStyles.copyrightText} ${sectionStyles.hideCopyRightText}`}
      >
        Powered by ❤️️
        <span style={{ color: "#000000", fontWeight: "bold" }}>
          Mohd Rizwan❤️️
        </span>
      </small>
    </section>
  );
}
